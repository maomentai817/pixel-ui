const getFloat = (
  props: StylePropertyMap,
  name: string,
  fallback = 0
): number => {
  return parseFloat(props.get(name)?.toString() ?? `${fallback}`)
}

const getStr = (
  props: StylePropertyMap,
  name: string,
  fallback = ''
): string => {
  return props.get(name)?.toString().trim() ?? fallback
}

const PIXEL_STRIPE_PROPS = [
  '--px-stripe-size',
  '--px-stripe-offset',
  '--px-stripe-color-1',
  '--px-stripe-color-2',
  '--px-stripe-ratio',
  '--px-stripe-mode' // 新增：模式选择 checker | stripe
]

export class PixelStripe implements PaintWorklet {
  static get inputProperties(): string[] {
    return PIXEL_STRIPE_PROPS
  }

  paint(
    ctx: PaintRenderingContext2D,
    size: { width: number; height: number },
    props: StylePropertyMap
  ): void {
    const color1 = getStr(props, '--px-stripe-color-1', '#ffffff')
    const color2 = getStr(props, '--px-stripe-color-2', '#000000')
    const offset = getFloat(props, '--px-stripe-offset')
    const ratio = getFloat(props, '--px-stripe-ratio', 0.5)
    const mode = getStr(props, '--px-stripe-mode', 'stripe')
    const unitSizeRaw = getStr(props, '--px-stripe-size', '4')
    const unitSize = parseInt(unitSizeRaw, 10) || 4

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
          const diag =
            (((px - py + offset) % stripePeriod) + stripePeriod) % stripePeriod
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
