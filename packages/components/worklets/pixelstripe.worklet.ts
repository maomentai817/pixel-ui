export class PixelStripe implements PaintWorklet {
  static get inputProperties(): string[] {
    return [
      '--px-stripe-size',
      '--px-stripe-offset',
      '--px-stripe-color-1',
      '--px-stripe-color-2',
      '--px-stripe-ratio',
      '--px-stripe-mode', // 新增：模式选择 checker | stripe
    ]
  }

  paint(
    ctx: PaintRenderingContext2D,
    size: { width: number; height: number },
    props: StylePropertyMap
  ): void {
    const color1 = props.get('--px-stripe-color-1')?.toString().trim() || '#ffffff'
    const color2 = props.get('--px-stripe-color-2')?.toString().trim() || '#000000'
    const unitSizeRaw = props.get('--px-stripe-size')?.toString().trim() || '4'
    const unitSize = parseInt(unitSizeRaw, 10) || 4
    const offset = parseFloat(props.get('--px-stripe-offset')?.toString() || '0')
    const ratio = parseFloat(props.get('--px-stripe-ratio')?.toString() || '0.5')
    const mode = props.get('--px-stripe-mode')?.toString().trim() || 'stripe'

    ctx.imageSmoothingEnabled = false

    const cols = Math.ceil(size.width / unitSize)
    const rows = Math.ceil(size.height / unitSize)

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = x * unitSize
        const py = y * unitSize

        let isStripe = true

        if (mode === 'checker') {
          const shiftedX = x + Math.floor(offset / unitSize)
          isStripe = (shiftedX + y) % 2 === 0
        } else if (mode === 'stripe') {
          const stripePeriod = unitSize * 4
          const stripeWidth = stripePeriod * ratio
          // const diag = (px - py + offset) % stripePeriod
          const diag = ((px - py + offset) % stripePeriod + stripePeriod) % stripePeriod
          isStripe = diag < stripeWidth
        }

        ctx.fillStyle = isStripe ? color1 : color2
        ctx.fillRect(px, py, unitSize, unitSize)
      }
    }
  }
}

export function registerPixelStripe() {
  if (typeof registerPaint !== 'undefined') {
    registerPaint('pixelstripe', PixelStripe)
  }
}

registerPixelStripe()
