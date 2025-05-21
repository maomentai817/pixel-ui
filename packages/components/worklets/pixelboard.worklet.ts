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

const PIXEL_BOARD_PROPS = [
  '--px-corner-size',
  '--px-board-color',
  '--px-shadow-color',
  '--px-color-1',
  '--px-color-2',
  '--px-block-size',
  '--px-border-color'
]

export class PixelBoard implements PaintWorklet {
  static get inputProperties(): string[] {
    return PIXEL_BOARD_PROPS
  }

  paint(
    ctx: PaintRenderingContext2D,
    size: { width: number; height: number },
    props: StylePropertyMap
  ): void {
    const cornerSize = getInt(props, '--px-corner-size', 6)
    const boardColor = getStr(props, '--px-board-color', '#3A4567')
    const shadowColor = getStr(props, '--px-shadow-color', '#252D46')
    const color1 = getStr(props, '--px-color-1', '#8F9DB5')
    const color2 = getStr(props, '--px-color-2', '#B4C0D2')
    const blockSize = getInt(props, '--px-block-size', 9)
    const borderColor = getStr(props, '--px-border-color', '#000000')
    const { width, height } = size

    // board 内部色
    ctx.fillStyle = boardColor
    ctx.fillRect(
      4 * blockSize,
      4 * blockSize,
      width - 8 * blockSize,
      height - 8 * blockSize
    )
    // 四角绘制
    const cornerInner = cornerSize - 1
    // 左上
    ctx.fillStyle = borderColor
    ctx.fillRect(0, 0, cornerSize * blockSize, blockSize)
    ctx.fillRect(0, 0, blockSize, cornerSize * blockSize)
    ctx.fillRect(
      blockSize,
      cornerSize * blockSize,
      cornerSize * blockSize,
      blockSize
    )
    ctx.fillRect(
      cornerSize * blockSize,
      blockSize,
      blockSize,
      cornerSize * blockSize
    )
    // 内角绘制
    ctx.fillStyle = color2
    ctx.fillRect(
      blockSize,
      blockSize,
      cornerInner * blockSize,
      cornerInner * blockSize
    )
    ctx.fillStyle = boardColor
    for (let i = 1; i <= cornerInner; i++) {
      ctx.fillRect(i * blockSize, i * blockSize, blockSize, blockSize)
    }
    ctx.fillRect(cornerInner * blockSize, blockSize, blockSize, blockSize)
    ctx.fillStyle = color1
    for (let i = 1; i <= cornerInner - 1; i++) {
      ctx.fillRect(i * blockSize, (i + 1) * blockSize, blockSize, blockSize)
      ctx.fillRect((i + 1) * blockSize, i * blockSize, blockSize, blockSize)
    }
    ctx.fillRect(blockSize, cornerInner * blockSize, blockSize, blockSize)
    // 右上
    ctx.fillStyle = borderColor
    ctx.fillRect(
      width - cornerSize * blockSize,
      0,
      cornerSize * blockSize,
      blockSize
    )
    ctx.fillRect(width - blockSize, 0, blockSize, cornerSize * blockSize)
    ctx.fillRect(
      width - cornerSize * blockSize - blockSize,
      cornerSize * blockSize,
      cornerSize * blockSize,
      blockSize
    )
    ctx.fillRect(
      width - cornerSize * blockSize - blockSize,
      blockSize,
      blockSize,
      cornerSize * blockSize
    )
    // 内角绘制
    ctx.fillStyle = color2
    ctx.fillRect(
      width - cornerSize * blockSize,
      blockSize,
      cornerInner * blockSize,
      cornerInner * blockSize
    )
    ctx.fillStyle = boardColor
    for (let i = 1; i <= cornerInner; i++) {
      ctx.fillRect(
        width - (i + 1) * blockSize,
        i * blockSize,
        blockSize,
        blockSize
      )
    }
    ctx.fillRect(
      width - cornerSize * blockSize,
      blockSize,
      blockSize,
      blockSize
    )
    ctx.fillStyle = color1
    for (let i = 1; i <= cornerInner - 1; i++) {
      ctx.fillRect(
        width - (i + 2) * blockSize,
        i * blockSize,
        blockSize,
        blockSize
      )
      ctx.fillRect(
        width - (i + 1) * blockSize,
        (i + 1) * blockSize,
        blockSize,
        blockSize
      )
    }
    ctx.fillRect(
      width - 2 * blockSize,
      cornerInner * blockSize,
      blockSize,
      blockSize
    )
    // 左下
    ctx.fillStyle = borderColor
    ctx.fillRect(0, height - blockSize, cornerSize * blockSize, blockSize)
    ctx.fillRect(
      0,
      height - cornerSize * blockSize,
      blockSize,
      cornerSize * blockSize
    )
    ctx.fillRect(
      blockSize,
      height - cornerSize * blockSize - blockSize,
      cornerSize * blockSize,
      blockSize
    )
    ctx.fillRect(
      cornerSize * blockSize,
      height - cornerSize * blockSize - blockSize,
      blockSize,
      cornerSize * blockSize
    )
    // 内角绘制
    ctx.fillStyle = color2
    ctx.fillRect(
      blockSize,
      height - cornerSize * blockSize,
      cornerInner * blockSize,
      cornerInner * blockSize
    )
    ctx.fillStyle = boardColor
    for (let i = 1; i <= cornerInner; i++) {
      ctx.fillRect(
        i * blockSize,
        height - (i + 1) * blockSize,
        blockSize,
        blockSize
      )
    }
    ctx.fillRect(
      cornerInner * blockSize,
      height - 2 * blockSize,
      blockSize,
      blockSize
    )
    ctx.fillStyle = color1
    for (let i = 1; i <= cornerInner - 1; i++) {
      ctx.fillRect(
        i * blockSize,
        height - (i + 2) * blockSize,
        blockSize,
        blockSize
      )
      ctx.fillRect(
        (i + 1) * blockSize,
        height - (i + 1) * blockSize,
        blockSize,
        blockSize
      )
    }
    ctx.fillRect(
      blockSize,
      height - cornerSize * blockSize,
      blockSize,
      blockSize
    )
    // 右下
    ctx.fillStyle = borderColor
    ctx.fillRect(
      width - cornerSize * blockSize,
      height - blockSize,
      cornerSize * blockSize,
      blockSize
    )
    ctx.fillRect(
      width - blockSize,
      height - cornerSize * blockSize,
      blockSize,
      cornerSize * blockSize
    )
    ctx.fillRect(
      width - cornerSize * blockSize - blockSize,
      height - cornerSize * blockSize - blockSize,
      cornerSize * blockSize,
      blockSize
    )
    ctx.fillRect(
      width - cornerSize * blockSize - blockSize,
      height - cornerSize * blockSize - blockSize,
      blockSize,
      cornerSize * blockSize
    )
    // 内角绘制
    ctx.fillStyle = color2
    ctx.fillRect(
      width - cornerSize * blockSize,
      height - cornerSize * blockSize,
      cornerInner * blockSize,
      cornerInner * blockSize
    )
    ctx.fillStyle = boardColor
    for (let i = 1; i <= cornerInner; i++) {
      ctx.fillRect(
        width - (i + 1) * blockSize,
        height - (i + 1) * blockSize,
        blockSize,
        blockSize
      )
    }
    ctx.fillRect(
      width - cornerSize * blockSize,
      height - 2 * blockSize,
      blockSize,
      blockSize
    )
    ctx.fillStyle = color1
    for (let i = 1; i <= cornerInner - 1; i++) {
      ctx.fillRect(
        width - (i + 2) * blockSize,
        height - (i + 1) * blockSize,
        blockSize,
        blockSize
      )
      ctx.fillRect(
        width - (i + 1) * blockSize,
        height - (i + 2) * blockSize,
        blockSize,
        blockSize
      )
    }
    ctx.fillRect(
      width - 2 * blockSize,
      height - cornerSize * blockSize,
      blockSize,
      blockSize
    )

    // 边框绘制
    // 上边框
    ctx.fillStyle = borderColor
    ctx.fillRect(
      cornerSize * blockSize,
      blockSize,
      width - 2 * cornerSize * blockSize,
      blockSize
    )
    ctx.fillRect(
      cornerSize * blockSize,
      3 * blockSize,
      width - 2 * cornerSize * blockSize,
      blockSize
    )
    ctx.fillStyle = color1
    ctx.fillRect(
      (cornerSize + 1) * blockSize,
      2 * blockSize,
      width - 2 * (cornerSize + 1) * blockSize,
      blockSize
    )
    const gapSize = 3 * blockSize
    ctx.fillStyle = color2
    for (
      let x = (cornerSize + 1) * blockSize;
      x < width - (cornerSize + 1) * blockSize;
      x += gapSize * 2
    ) {
      ctx.fillRect(x, 2 * blockSize, gapSize, blockSize)
    }
    ctx.fillStyle = borderColor
    ctx.fillRect(
      width - cornerSize * blockSize - blockSize,
      blockSize,
      blockSize,
      cornerSize * blockSize
    )

    // 下边框
    ctx.fillStyle = borderColor
    ctx.fillRect(
      cornerSize * blockSize,
      height - 2 * blockSize,
      width - 2 * cornerSize * blockSize,
      blockSize
    )
    ctx.fillRect(
      cornerSize * blockSize,
      height - 4 * blockSize,
      width - 2 * cornerSize * blockSize,
      blockSize
    )
    ctx.fillStyle = color1
    ctx.fillRect(
      (cornerSize + 1) * blockSize,
      height - 3 * blockSize,
      width - 2 * (cornerSize + 1) * blockSize,
      blockSize
    )
    ctx.fillStyle = color2
    for (
      let x = (cornerSize + 1) * blockSize;
      x < width - (cornerSize + 1) * blockSize;
      x += gapSize * 2
    ) {
      ctx.fillRect(x, height - 3 * blockSize, gapSize, blockSize)
    }
    ctx.fillStyle = borderColor
    ctx.fillRect(
      width - cornerSize * blockSize - blockSize,
      height - cornerSize * blockSize - blockSize,
      blockSize,
      cornerSize * blockSize
    )

    // 左边框
    const sideborderLen = height - 2 * (cornerSize + 1) * blockSize
    const shortPart = Math.max(3 * blockSize, Math.floor(sideborderLen / 7))
    const longPart = sideborderLen - 2 * shortPart
    ctx.fillStyle = borderColor
    ctx.fillRect(
      0,
      (cornerSize + 1) * blockSize + shortPart,
      blockSize,
      longPart
    )
    ctx.fillRect(
      2 * blockSize,
      (cornerSize + 1) * blockSize + shortPart,
      blockSize,
      longPart
    )
    ctx.fillRect(blockSize, (cornerSize + 1) * blockSize, blockSize, shortPart)
    ctx.fillRect(
      3 * blockSize,
      (cornerSize + 1) * blockSize,
      blockSize,
      shortPart
    )
    ctx.fillRect(
      blockSize,
      height - (cornerSize + 1) * blockSize - shortPart,
      blockSize,
      shortPart
    )
    ctx.fillRect(
      3 * blockSize,
      height - (cornerSize + 1) * blockSize - shortPart,
      blockSize,
      shortPart
    )
    ctx.fillStyle = color1
    ctx.fillRect(
      2 * blockSize,
      (cornerSize + 1) * blockSize,
      blockSize,
      shortPart
    )
    ctx.fillRect(
      2 * blockSize,
      height - (cornerSize + 1) * blockSize - shortPart,
      blockSize,
      shortPart
    )
    ctx.fillStyle = color2
    ctx.fillRect(
      blockSize,
      (cornerSize + 1) * blockSize + shortPart,
      blockSize,
      longPart
    )
    ctx.fillStyle = color1
    let yStart = (cornerSize + 1) * blockSize + shortPart
    for (let y = yStart; y < yStart + longPart; y += gapSize * 2) {
      ctx.fillRect(blockSize, y, blockSize, gapSize)
    }
    ctx.fillStyle = borderColor
    ctx.fillRect(
      blockSize,
      height - (cornerSize + 1) * blockSize - shortPart,
      blockSize,
      shortPart
    )

    // 右边框
    ctx.fillStyle = borderColor
    ctx.fillRect(
      width - blockSize,
      (cornerSize + 1) * blockSize + shortPart,
      blockSize,
      longPart
    )
    ctx.fillRect(
      width - 3 * blockSize,
      (cornerSize + 1) * blockSize + shortPart,
      blockSize,
      longPart
    )
    ctx.fillRect(
      width - 2 * blockSize,
      (cornerSize + 1) * blockSize,
      blockSize,
      shortPart
    )
    ctx.fillRect(
      width - 4 * blockSize,
      (cornerSize + 1) * blockSize,
      blockSize,
      shortPart
    )
    ctx.fillRect(
      width - 2 * blockSize,
      height - (cornerSize + 1) * blockSize - shortPart,
      blockSize,
      shortPart
    )
    ctx.fillRect(
      width - 4 * blockSize,
      height - (cornerSize + 1) * blockSize - shortPart,
      blockSize,
      shortPart
    )
    ctx.fillStyle = color1
    ctx.fillRect(
      width - 3 * blockSize,
      (cornerSize + 1) * blockSize,
      blockSize,
      shortPart
    )
    ctx.fillRect(
      width - 3 * blockSize,
      height - (cornerSize + 1) * blockSize - shortPart,
      blockSize,
      shortPart
    )
    ctx.fillStyle = color2
    ctx.fillRect(
      width - 2 * blockSize,
      (cornerSize + 1) * blockSize + shortPart,
      blockSize,
      longPart
    )
    ctx.fillStyle = color1
    yStart = (cornerSize + 1) * blockSize + shortPart
    for (let y = yStart; y < yStart + longPart; y += gapSize * 2) {
      ctx.fillRect(width - 2 * blockSize, y, blockSize, gapSize)
    }
    ctx.fillStyle = borderColor
    ctx.fillRect(
      width - 2 * blockSize,
      height - (cornerSize + 1) * blockSize - shortPart,
      blockSize,
      shortPart
    )

    // 阴影绘制
    ctx.fillStyle = shadowColor
    // 上侧
    ctx.fillRect(
      (cornerSize + 1) * blockSize,
      4 * blockSize,
      width - 2 * (cornerSize + 1) * blockSize,
      blockSize
    )
    // 下侧
    ctx.fillRect(
      (cornerSize + 1) * blockSize,
      height - 5 * blockSize,
      width - 2 * (cornerSize + 1) * blockSize,
      blockSize
    )
    // 左侧
    ctx.fillRect(
      4 * blockSize,
      (cornerSize + 1) * blockSize,
      blockSize,
      shortPart
    )
    ctx.fillRect(
      4 * blockSize,
      height - (cornerSize + 1) * blockSize - shortPart,
      blockSize,
      shortPart
    )
    ctx.fillRect(
      3 * blockSize,
      (cornerSize + 1) * blockSize + shortPart,
      blockSize,
      longPart
    )

    // 右侧
    ctx.fillRect(
      width - 5 * blockSize,
      (cornerSize + 1) * blockSize,
      blockSize,
      shortPart
    )
    ctx.fillRect(
      width - 5 * blockSize,
      height - (cornerSize + 1) * blockSize - shortPart,
      blockSize,
      shortPart
    )
    ctx.fillRect(
      width - 4 * blockSize,
      (cornerSize + 1) * blockSize + shortPart,
      blockSize,
      longPart
    )
    // 边角阴影处理
    ctx.fillRect(
      4 * blockSize,
      (cornerSize + 1) * blockSize,
      (cornerSize - 2) * blockSize,
      blockSize
    )
    ctx.fillRect(
      4 * blockSize,
      height - (cornerSize + 2) * blockSize,
      (cornerSize - 2) * blockSize,
      blockSize
    )
    ctx.fillRect(
      (cornerSize + 1) * blockSize,
      4 * blockSize,
      blockSize,
      (cornerSize - 2) * blockSize
    )
    ctx.fillRect(
      (cornerSize + 1) * blockSize,
      height - (cornerSize + 2) * blockSize,
      blockSize,
      (cornerSize - 2) * blockSize
    )
    ctx.fillRect(
      width - (cornerSize + 2) * blockSize,
      4 * blockSize,
      blockSize,
      (cornerSize - 2) * blockSize
    )
    ctx.fillRect(
      width - (cornerSize + 2) * blockSize,
      height - (cornerSize + 2) * blockSize,
      blockSize,
      (cornerSize - 2) * blockSize
    )
    ctx.fillRect(
      width - (cornerSize + 2) * blockSize,
      (cornerSize + 1) * blockSize,
      (cornerSize - 2) * blockSize,
      blockSize
    )
    ctx.fillRect(
      width - (cornerSize + 2) * blockSize,
      height - (cornerSize + 2) * blockSize,
      (cornerSize - 2) * blockSize,
      blockSize
    )
  }
}

export function registerPixelBoard() {
  if (typeof registerPaint !== 'undefined') {
    registerPaint('pixelboard', PixelBoard)
  }
}

registerPixelBoard()
