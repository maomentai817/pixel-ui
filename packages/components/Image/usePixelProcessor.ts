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
    maxWidth = 800,
    maxHeight = 600
  ) => {
    let scale = 1
    if (width > maxWidth || height > maxHeight) {
      scale = Math.min(maxWidth / width, maxHeight / height)
    }
    return {
      width: Math.floor(width * scale),
      height: Math.floor(height * scale)
    }
  }

  const detectBackgroundColor = (imageData: ImageData): number[] => {
    const { data, width, height } = imageData
    const corners = [
      0,
      (height - 1) * width * 4,
      (width - 1) * 4,
      (width * height - 1) * 4
    ]
    let r = 0,
      g = 0,
      b = 0,
      a = 0
    for (const idx of corners) {
      r += data[idx]
      g += data[idx + 1]
      b += data[idx + 2]
      a += data[idx + 3]
    }
    return [r / 4, g / 4, b / 4, a / 4].map(Math.round)
  }

  const removeAntiAliasing = (
    imageData: ImageData,
    bgColor: number[],
    threshold = 30
  ) => {
    const { data } = imageData
    for (let i = 0; i < data.length; i += 4) {
      const d = Math.sqrt(
        (data[i] - bgColor[0]) ** 2 +
          (data[i + 1] - bgColor[1]) ** 2 +
          (data[i + 2] - bgColor[2]) ** 2 +
          (data[i + 3] - bgColor[3]) ** 2
      )
      if (d < threshold) {
        data[i] = bgColor[0]
        data[i + 1] = bgColor[1]
        data[i + 2] = bgColor[2]
        data[i + 3] = bgColor[3]
      }
    }
  }

  class ColorBox {
    pixels: number[][]
    level: number
    splitChannel = 0
    largestRange = 0

    constructor(pixels: number[][], level = 0) {
      this.pixels = pixels
      this.level = level
      this.computeMinMax()
    }

    computeMinMax() {
      const min = [255, 255, 255, 255]
      const max = [0, 0, 0, 0]

      for (const [r, g, b, a] of this.pixels) {
        min[0] = Math.min(min[0], r)
        min[1] = Math.min(min[1], g)
        min[2] = Math.min(min[2], b)
        min[3] = Math.min(min[3], a)

        max[0] = Math.max(max[0], r)
        max[1] = Math.max(max[1], g)
        max[2] = Math.max(max[2], b)
        max[3] = Math.max(max[3], a)
      }

      const ranges = max.map((v, i) => v - min[i])
      const maxRange = Math.max(...ranges)

      this.largestRange = maxRange
      this.splitChannel = ranges.indexOf(maxRange)
    }

    split(): ColorBox[] | null {
      if (this.pixels.length < 2) return null

      // 添加分割安全校验
      const ch = this.splitChannel
      this.pixels.sort((a, b) => a[ch] - b[ch])

      // 检查是否所有元素相同
      const firstVal = this.pixels[0][ch]
      const allSame = this.pixels.every((p) => p[ch] === firstVal)
      if (allSame) return null

      const mid = Math.floor(this.pixels.length / 2)
      return [
        new ColorBox(this.pixels.slice(0, mid), this.level + 1),
        new ColorBox(this.pixels.slice(mid), this.level + 1)
      ]
    }

    getAverageColor(): number[] {
      const sum = [0, 0, 0, 0]
      for (const p of this.pixels) {
        p.forEach((v, i) => (sum[i] += v))
      }
      return sum.map((v) => Math.round(v / this.pixels.length))
    }
  }

  const medianCutQuantization = (imageData: ImageData, colorCount: number) => {
    const pixels: number[][] = []
    const { data } = imageData

    for (let i = 0; i < data.length; i += 4) {
      pixels.push([data[i], data[i + 1], data[i + 2], data[i + 3]])
    }

    let boxes: ColorBox[] = [new ColorBox(pixels)]
    let safeCounter = 0
    const MAX_ITERATIONS = 1000
    while (boxes.length < colorCount && safeCounter++ < MAX_ITERATIONS) {
      const boxToSplit = boxes.reduce((a, b) =>
        a.largestRange > b.largestRange ? a : b
      )

      boxes = boxes.filter((b) => b !== boxToSplit)
      const newBoxes = boxToSplit.split()
      if (!newBoxes || newBoxes.length === 0) break
      boxes.push(...newBoxes)
    }

    const palette = boxes.map((box) => box.getAverageColor())
    for (let i = 0; i < data.length; i += 4) {
      const pixel = [data[i], data[i + 1], data[i + 2], data[i + 3]]
      let closest = palette[0]
      let minDist = Infinity
      for (const color of palette) {
        const d = color.reduce((sum, v, i) => sum + (v - pixel[i]) ** 2, 0)
        if (d < minDist) {
          minDist = d
          closest = color
        }
      }
      data[i] = closest[0]
      data[i + 1] = closest[1]
      data[i + 2] = closest[2]
      data[i + 3] = closest[3]
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
        ctx.strokeRect(x, y, blockSize, blockSize)
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
    }
  ) => {
    const { blockSize, colorCount, showGrid, cwidth, cheight } = options
    const ctx = canvas.getContext('2d')!
    const { width, height } = calculateScaledDimensions(
      cwidth || image.width,
      cheight || image.height
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
    processImage
  }
}
