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
      const ranges = [0, 1, 2, 3].map((i) => {
        const values = this.pixels.map((p) => p[i])
        return Math.max(...values) - Math.min(...values)
      })
      this.largestRange = Math.max(...ranges)
      this.splitChannel = ranges.indexOf(this.largestRange)
    }

    split(): ColorBox[] | null {
      if (this.pixels.length < 2) return null
      const ch = this.splitChannel
      this.pixels.sort((a, b) => a[ch] - b[ch])
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
    while (boxes.length < colorCount) {
      const boxToSplit = boxes.reduce((a, b) =>
        a.largestRange > b.largestRange ? a : b
      )
      boxes = boxes.filter((b) => b !== boxToSplit)
      const newBoxes = boxToSplit.split()
      if (!newBoxes) break
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
        let r = 0,
          g = 0,
          b = 0,
          a = 0,
          count = 0
        for (let by = 0; by < blockSize && y + by < height; by++) {
          for (let bx = 0; bx < blockSize && x + bx < width; bx++) {
            const idx = ((y + by) * width + (x + bx)) * 4
            r += imageData.data[idx]
            g += imageData.data[idx + 1]
            b += imageData.data[idx + 2]
            a += imageData.data[idx + 3]
            count++
          }
        }
        const avg = [r, g, b, a].map((v) => Math.round(v / count))
        for (let by = 0; by < blockSize && y + by < height; by++) {
          for (let bx = 0; bx < blockSize && x + bx < width; bx++) {
            const idx = ((y + by) * width + (x + bx)) * 4
            imageData.data[idx] = avg[0]
            imageData.data[idx + 1] = avg[1]
            imageData.data[idx + 2] = avg[2]
            imageData.data[idx + 3] = avg[3]
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
