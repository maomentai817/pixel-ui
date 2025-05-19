export function usePixelProcessor() {
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  const calculateScaledDimensions = (
    width: number,
    height: number,
    picScale = 1
  ) => {
    const scale = Math.min(1, picScale)
    return {
      width: Math.floor(width * scale),
      height: Math.floor(height * scale)
    }
  }

  const detectBackgroundColor = (imageData: ImageData): number[] => {
    const { data, width, height } = imageData
    // 增加边缘采样点
    const points = [
      0,
      (width - 1) * 4,
      (height - 1) * width * 4,
      (width * height - 1) * 4,
      (Math.floor(height / 2) * width + Math.floor(width / 2)) * 4
    ]
    const colorSum = [0, 0, 0, 0]
    for (const i of points) {
      for (let j = 0; j < 4; j++) colorSum[j] += data[i + j]
    }
    return colorSum.map((v) => Math.round(v / points.length))
  }

  const removeAntiAliasing = (
    imageData: ImageData,
    bg: number[],
    threshold = 40
  ) => {
    const { data } = imageData
    const sqThreshold = threshold * threshold
    for (let i = 0; i < data.length; i += 4) {
      const diff =
        (data[i] - bg[0]) ** 2 +
        (data[i + 1] - bg[1]) ** 2 +
        (data[i + 2] - bg[2]) ** 2

      if (diff < sqThreshold && data[i + 3] < 255) {
        for (let j = 0; j < 4; j++) data[i + j] = bg[j]
      }
    }
  }

  class ColorBox {
    constructor(
      public _pixels: number[][],
      public _level = 0
    ) {
      this.compute()
    }

    splitChannel = 0
    compute() {
      const min = [255, 255, 255, 255]
      const max = [0, 0, 0, 0]
      for (const p of this._pixels) {
        for (let i = 0; i < 4; i++) {
          min[i] = Math.min(min[i], p[i])
          max[i] = Math.max(max[i], p[i])
        }
      }
      const range = max.map((v, i) => v - min[i])
      this.splitChannel = range.indexOf(Math.max(...range))
    }

    split(): ColorBox[] | null {
      if (this._pixels.length < 2) return null
      const ch = this.splitChannel
      const sorted = [...this._pixels].sort((a, b) => a[ch] - b[ch])
      const mid = Math.floor(sorted.length / 2)
      if (mid === 0 || mid === sorted.length) return null
      return [
        new ColorBox(sorted.slice(0, mid), this._level + 1),
        new ColorBox(sorted.slice(mid), this._level + 1)
      ]
    }

    getAverageColor(): number[] {
      const total = [0, 0, 0, 0]
      const count = this._pixels.length
      for (const p of this._pixels) {
        for (let i = 0; i < 4; i++) total[i] += p[i]
      }
      return total.map((v) => Math.round(v / count))
    }
  }

  const medianCutQuantization = (imageData: ImageData, colorCount: number) => {
    const pixels: number[][] = []
    const { data } = imageData
    for (let i = 0; i < data.length; i += 4) {
      pixels.push([data[i], data[i + 1], data[i + 2], data[i + 3]])
    }

    const boxes = [new ColorBox(pixels)]
    const maxIterations = 1000
    let count = 0
    while (boxes.length < colorCount && count++ < maxIterations) {
      boxes.sort((a, b) => b._pixels.length - a._pixels.length)
      const box = boxes.shift()!
      const result = box.split()
      if (!result) {
        boxes.push(box)
        break
      }
      boxes.push(...result)
    }

    const palette = boxes.map((b) => b.getAverageColor())

    for (let i = 0; i < data.length; i += 4) {
      let minDist = Infinity
      let best = palette[0]
      for (const color of palette) {
        const dist = color.reduce(
          (sum, v, idx) => sum + (v - data[i + idx]) ** 2,
          0
        )
        if (dist < minDist) {
          minDist = dist
          best = color
        }
      }
      for (let j = 0; j < 4; j++) data[i + j] = best[j]
    }
  }

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    blockSize: number
  ) => {
    ctx.strokeStyle = 'rgba(0,0,0,0.2)'
    ctx.lineWidth = 1
    for (let y = 0; y < height; y += blockSize) {
      for (let x = 0; x < width; x += blockSize) {
        ctx.strokeRect(x + 0.5, y + 0.5, blockSize, blockSize)
      }
    }
  }

  const getMostFrequentColor = (
    imageData: ImageData,
    x: number,
    y: number,
    width: number,
    height: number,
    blockSize: number
  ) => {
    const { data } = imageData
    const colorMap = new Map<string, { count: number; rgba: number[] }>()

    const endY = Math.min(y + blockSize, height)
    const endX = Math.min(x + blockSize, width)

    for (let py = y; py < endY; py++) {
      for (let px = x; px < endX; px++) {
        const idx = (py * width + px) * 4
        const rgba = [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]]
        const colorKey = rgba.join(',')

        if (colorMap.has(colorKey)) {
          colorMap.get(colorKey)!.count++
        } else {
          colorMap.set(colorKey, { count: 1, rgba })
        }
      }
    }

    let maxCount = 0
    let mostFrequentColor = [0, 0, 0, 0]

    colorMap.forEach(({ count, rgba }) => {
      if (count > maxCount) {
        maxCount = count
        mostFrequentColor = rgba
      }
    })

    return mostFrequentColor
  }

  const processImage = (
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    options: {
      blockSize: number
      colorCount: number
      showGrid: boolean
      cwidth: number
      cheight: number
      scale: number
    }
  ) => {
    const { blockSize, colorCount, showGrid, cwidth, cheight, scale } = options
    const ctx = canvas.getContext('2d')!
    const { width, height } = calculateScaledDimensions(
      cwidth || image.width,
      cheight || image.height,
      scale
    )
    canvas.width = width
    canvas.height = height
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(image, 0, 0, width, height)

    const imageData = ctx.getImageData(0, 0, width, height)
    const bg = detectBackgroundColor(imageData)

    // Pixelation
    for (let y = 0; y < height; y += blockSize) {
      for (let x = 0; x < width; x += blockSize) {
        const mostFrequentColor = getMostFrequentColor(
          imageData,
          x,
          y,
          width,
          height,
          blockSize
        )

        for (let by = 0; by < blockSize && y + by < height; by++) {
          for (let bx = 0; bx < blockSize && x + bx < width; bx++) {
            const idx = ((y + by) * width + (x + bx)) * 4
            imageData.data[idx] = mostFrequentColor[0]
            imageData.data[idx + 1] = mostFrequentColor[1]
            imageData.data[idx + 2] = mostFrequentColor[2]
            imageData.data[idx + 3] = mostFrequentColor[3]
          }
        }
      }
    }

    removeAntiAliasing(imageData, bg)
    medianCutQuantization(imageData, colorCount)
    ctx.putImageData(imageData, 0, 0)
    if (showGrid) drawGrid(ctx, width, height, blockSize)
  }

  return {
    loadImage,
    processImage,
    calculateScaledDimensions
  }
}
