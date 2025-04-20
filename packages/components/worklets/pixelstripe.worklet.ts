// pixelstripe.worklet.ts

export class PixelStripe implements PaintWorklet { 
  static get inputProperties(): string[] { 
    return [
      '--px-stripe-size',
      '--px-stripe-offset',
      '--px-stripe-color-1',
      '--px-stripe-color-2',
    ]
  }

  paint(
    ctx: PaintRenderingContext2D,
    size: { width: number, height: number },
    props: StylePropertyMap
  ): void { 
    const color1 = props.get('--px-stripe-color-1')?.toString().trim() || '#ffffff'
    const color2 = props.get('--px-stripe-color-2')?.toString().trim() || '#000000'
    const unitSizeRaw = props.get('--px-stripe-size')?.toString().trim() || '4'
    const unitSize = parseInt(unitSizeRaw, 10) || 4
    const offset = parseFloat(props.get('--px-stripe-offset')?.toString() || '0')

    ctx.imageSmoothingEnabled = false

    const cols = Math.ceil(size.width / unitSize)
    const rows = Math.ceil(size.height / unitSize)

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // 斜向排列的像素条纹: 通过 x+y 是否为偶数来决定颜色
        const shiftedX = x + Math.floor(offset / unitSize)
        const isStripe = (shiftedX + y) % 2 === 0
        ctx.fillStyle = isStripe ? color1 : color2
        ctx.fillRect(x * unitSize, y * unitSize, unitSize, unitSize)
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
