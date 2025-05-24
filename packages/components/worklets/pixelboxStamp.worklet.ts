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

const PIXEL_BOX_STAMP_PROPS = [
  '--px-corner-size',
  '--px-main-color',
  '--px-block-size',
  '--px-shadow-color',
  '--px-content-color',
  '--px-gap-block'
]

export class PixelBoxStamp implements PaintWorklet {
  static get inputProperties(): string[] {
    return PIXEL_BOX_STAMP_PROPS
  }

  paint(
    ctx: PaintRenderingContext2D,
    size: { width: number; height: number },
    props: StylePropertyMap
  ): void {
    const { width, height } = size
    const cornerSize = getInt(props, '--px-corner-size', 4)
    const mainColor = getStr(props, '--px-main-color', '#209cee')
    const blockSize = getInt(props, '--px-block-size', 4)
    const gapBlock = getInt(props, '--px-gap-block', 1)
    const shadowColor = getStr(props, '--px-shadow-color', '#006bb3')
    const contentColor = getStr(props, '--px-content-color', '#e5f0f1')
    // 边框数计算
    const stampSize = 2 * blockSize
    const vStampCount = Math.floor((height - 2 * stampSize) / blockSize)
    const hStampCount = Math.floor((width - 2 * stampSize) / blockSize)
    // 内容区域
    ctx.fillStyle = mainColor
    ctx.fillRect(
      2 * blockSize,
      2 * blockSize,
      width - 5 * blockSize,
      height - 4 * blockSize
    )
    // 水平方向绘制
    const drawHStamp = (
      ctx: PaintRenderingContext2D,
      dx: number,
      dy: number,
      flipY: boolean
    ) => {
      ctx.save()
      ctx.translate(dx, dy)
      ctx.scale(1, flipY ? -1 : 1)
      ctx.fillStyle = mainColor
      for (let i = 0; i < hStampCount; i++) {
        const offset = (cornerSize + 1) * blockSize * i
        // 主体色块
        ctx.fillStyle = mainColor
        ctx.fillRect(offset, 0, cornerSize * blockSize, 2 * blockSize)
        // 清除两端角落（中间部分镂空）
        ctx.clearRect(offset, 0, blockSize, blockSize)
        ctx.clearRect(
          (cornerSize - 1) * blockSize + offset,
          0,
          blockSize,
          blockSize
        )
        // 阴影块
        ctx.fillStyle = shadowColor
        ctx.fillRect(
          (cornerSize - 1) * blockSize + offset,
          0,
          blockSize,
          blockSize
        )
        ctx.fillRect(
          cornerSize * blockSize + offset,
          blockSize,
          blockSize,
          blockSize
        )
      }
      ctx.restore()
    }
    drawHStamp(ctx, 2 * blockSize, 0, false)
    drawHStamp(ctx, 2 * blockSize, height, true)
    // 左边框绘制
    const drawLeftStamp = (
      ctx: PaintRenderingContext2D,
      dx: number,
      dy: number
    ) => {
      ctx.save()
      ctx.translate(dx, dy)
      ctx.fillStyle = mainColor
      for (let i = 0; i < vStampCount; i++) {
        const offset = (cornerSize + 1) * blockSize * i
        // 主体色块
        ctx.fillRect(0, offset, 2 * blockSize, cornerSize * blockSize)
        // 镂空中间小块
        ctx.clearRect(0, offset, blockSize, blockSize)
        ctx.clearRect(
          0,
          (cornerSize - 1) * blockSize + offset,
          blockSize,
          blockSize
        )
      }
      ctx.restore()
    }
    drawLeftStamp(ctx, 0, 2 * blockSize)

    // 右边框绘制
    const drawRightStamp = (
      ctx: PaintRenderingContext2D,
      dx: number,
      dy: number
    ) => {
      ctx.save()
      ctx.translate(dx - blockSize, dy)
      ctx.scale(-1, 1)
      for (let i = 0; i < vStampCount; i++) {
        const offset = (cornerSize + 1) * blockSize * i
        // 主体色块（靠右绘制）
        ctx.fillStyle = mainColor
        ctx.fillRect(
          -2 * blockSize,
          offset,
          2 * blockSize,
          cornerSize * blockSize
        )
        // 镂空中间小块
        ctx.clearRect(-2 * blockSize, offset, blockSize, blockSize)
        ctx.clearRect(
          -2 * blockSize,
          (cornerSize - 1) * blockSize + offset,
          blockSize,
          blockSize
        )
        // 阴影块
        ctx.fillStyle = shadowColor
        ctx.fillRect(-blockSize, offset - blockSize, blockSize, blockSize)
        ctx.fillRect(-2 * blockSize, offset, blockSize, blockSize)
        ctx.fillRect(
          -2 * blockSize,
          (cornerSize - 1) * blockSize + offset,
          blockSize,
          blockSize
        )
        ctx.fillRect(
          -3 * blockSize,
          offset + blockSize,
          blockSize,
          (cornerSize - 2) * blockSize
        )
      }
      ctx.restore()
    }
    drawRightStamp(ctx, width - 2 * blockSize, 2 * blockSize)
    // 非整除个数边角处理
    const clearSize = 2 * blockSize
    ctx.clearRect(0, 0, clearSize, clearSize)
    ctx.clearRect(
      width - clearSize - blockSize,
      0,
      clearSize + blockSize,
      clearSize
    )
    ctx.clearRect(
      0,
      height - clearSize - blockSize,
      clearSize,
      clearSize + blockSize
    )
    ctx.clearRect(
      width - clearSize - blockSize,
      height - clearSize - blockSize,
      clearSize + blockSize,
      clearSize + blockSize
    )

    // 内容区域
    ctx.fillStyle = contentColor
    ctx.fillRect(
      stampSize + gapBlock * blockSize,
      stampSize + gapBlock * blockSize,
      width - blockSize - 2 * (stampSize + gapBlock * blockSize),
      height - 2 * (stampSize + gapBlock * blockSize)
    )
    // 抠细节
    ctx.fillStyle = shadowColor
    ctx.fillRect(blockSize, blockSize, blockSize, blockSize)
  }
}
export function registerPixelBoxStamp() {
  if (typeof registerPaint !== 'undefined') {
    registerPaint('pixelboxStamp', PixelBoxStamp)
  }
}

registerPixelBoxStamp()
