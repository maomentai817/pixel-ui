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
  '--px-block-size'
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
    const cornerSize = getInt(props, '--px-corner-size', 5)
    const boardColor = getStr(props, '--px-board-color', '#3A4567')
    const shadowColor = getStr(props, '--px-shadow-color', '#252D46')
    const color1 = getStr(props, '--px-color-1', '#8F9DB5')
    const color2 = getStr(props, '--px-color-2', '#B4C0D2')
    const blockSize = getInt(props, '--px-block-size', 2)

    const { width, height } = size
  }
}

export function registerPixelBoard() {
  if (typeof registerPaint !== 'undefined') {
    registerPaint('pixelboard', PixelBoard)
  }
}

registerPixelBoard()
