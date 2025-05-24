const getInt = (
  props: StylePropertyMap,
  name: string,
  fallback = 0
): number => {
  return parseInt(props.get(name)?.toString() || `${fallback}`)
}

const getStr = (
  props: StylePropertyMap,
  name: string,
  fallback = ''
): string => {
  return props.get(name)?.toString().trim() || fallback
}

const PIXEL_BOX_ORNAMENT_PROPS = [
  '--px-corner-size',
  '--px-main-color',
  '--px-block-size'
]

export class PixelBoxOrnament implements PaintWorklet {
  static get inputProperties(): string[] {
    return PIXEL_BOX_ORNAMENT_PROPS
  }

  paint(
    ctx: PaintRenderingContext2D,
    size: { width: number; height: number },
    props: StylePropertyMap
  ): void {
    const { width, height } = size
    const cornerSize = getInt(props, '--px-corner-size', 3)
    const mainColor = getStr(props, '--px-main-color', '#209cee')
    const blockSize = getInt(props, '--px-block-size', 5)

    // 主区域
    ctx.fillStyle = mainColor
    ctx.fillRect(
      cornerSize * blockSize,
      cornerSize * blockSize,
      width - 2 * cornerSize * blockSize,
      height - 2 * cornerSize * blockSize
    )
    // 边框绘制
    const drawBorder = (
      ctx: PaintRenderingContext2D,
      dx: number,
      dy: number,
      flipX: boolean,
      flipY: boolean
    ): void => {
      ctx.save()
      ctx.translate(dx, dy)
      ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1)
      ctx.fillStyle = mainColor

      // 上边框
      ctx.fillRect(0, 0, width, blockSize)
      // 左边框
      ctx.fillRect(0, 0, blockSize, height)

      ctx.restore()
    }

    drawBorder(ctx, 0, 0, false, false)
    drawBorder(ctx, width, height, true, true)

    // 四角清理
    const clearSize = (cornerSize + 1) * blockSize
    const clearCorner = (
      ctx: PaintRenderingContext2D,
      dx: number,
      dy: number,
      size: number
    ) => {
      ctx.clearRect(dx, dy, size, size)
    }
    clearCorner(ctx, 0, 0, clearSize)
    clearCorner(ctx, width - clearSize, 0, clearSize)
    clearCorner(ctx, 0, height - clearSize, clearSize)
    clearCorner(ctx, width - clearSize, height - clearSize, clearSize)

    // 实际角落绘制大小
    const drawCorner = (
      ctx: PaintRenderingContext2D,
      dx: number,
      dy: number,
      flipX: boolean,
      flipY: boolean
    ): void => {
      ctx.save()
      ctx.translate(dx, dy)
      ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1)
      ctx.fillStyle = mainColor

      for (let i = 0; i < cornerSize; i++) {
        for (let j = 0; j < cornerSize; j++) {
          const isDiagonal = i === j
          const isAntiDiagonal = i + j === cornerSize - 1
          if (isDiagonal || isAntiDiagonal) {
            ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize)
          }
        }
      }

      ctx.restore()
    }

    drawCorner(ctx, 0, 0, false, false)
    drawCorner(ctx, width, height, true, true)
    drawCorner(ctx, 0, height, false, true)
    drawCorner(ctx, width, 0, true, false)
  }
}

export function registerPixelBoxOrnament() {
  if (typeof registerPaint !== 'undefined') {
    registerPaint('pixelboxOrnament', PixelBoxOrnament)
  }
}

registerPixelBoxOrnament()
