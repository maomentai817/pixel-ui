export interface PixelitOptions {
  from: HTMLImageElement
  to: HTMLCanvasElement
  scale?: number
  palette?: number[][] | null
  width?: number
  height?: number
  aspectRatio: number
}

export default class Pixelit {
  from: HTMLImageElement
  to: HTMLCanvasElement
  scale: number
  palette: number[][] | null
  ctx: CanvasRenderingContext2D
  width: number
  height: number

  constructor(options: PixelitOptions) {
    this.from = options.from
    this.to = options.to
    this.scale = options.scale ?? 8
    this.palette = options.palette ?? null
    this.ctx = this.to.getContext('2d')!
    this.width =
      Math.floor(options.width || this.from.naturalWidth) * options.aspectRatio
    this.height =
      Math.floor(options.height || this.from.naturalHeight) *
      options.aspectRatio
  }

  draw(): this {
    this.to.width = this.width
    this.to.height = this.height
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.drawImage(this.from, 0, 0, this.width, this.height)
    return this
  }

  pixelate(): this {
    const scaledW = Math.ceil(this.width / this.scale)
    const scaledH = Math.ceil(this.height / this.scale)

    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = scaledW
    tempCanvas.height = scaledH

    const tempCtx = tempCanvas.getContext('2d')!
    tempCtx.drawImage(this.to, 0, 0, scaledW, scaledH)

    this.ctx.imageSmoothingEnabled = false
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.drawImage(
      tempCanvas,
      0,
      0,
      scaledW,
      scaledH,
      0,
      0,
      this.width,
      this.height
    )

    return this
  }

  convertGrayscale(): this {
    const imgData = this.ctx.getImageData(0, 0, this.width, this.height)
    const data = imgData.data

    for (let i = 0; i < data.length; i += 4) {
      const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      data[i] = data[i + 1] = data[i + 2] = avg
    }

    this.ctx.putImageData(imgData, 0, 0)
    return this
  }

  convertPalette(): this {
    if (!this.palette) return this

    const imgData = this.ctx.getImageData(0, 0, this.width, this.height)
    const data = imgData.data

    for (let i = 0; i < data.length; i += 4) {
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
      const nearest = this._findNearestColor([r, g, b])
      data[i] = nearest[0]
      data[i + 1] = nearest[1]
      data[i + 2] = nearest[2]
    }

    this.ctx.putImageData(imgData, 0, 0)
    return this
  }

  getSize(): { width: number; height: number } {
    return { width: this.width, height: this.height }
  }

  private _findNearestColor(color: number[]): number[] {
    let minDist = Infinity
    let nearest: number[] = color

    for (const p of this.palette!) {
      const dist = this._colorDistance(color, p)
      if (dist < minDist) {
        minDist = dist
        nearest = p
      }
    }

    return nearest
  }

  private _colorDistance(a: number[], b: number[]): number {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  }
}
