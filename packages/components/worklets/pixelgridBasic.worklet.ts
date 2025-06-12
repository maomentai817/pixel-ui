const getInt = (
  props: StylePropertyMap,
  name: string,
  fallback = 0
): number => {
  return parseInt(props.get(name)?.toString() || `${fallback}`, 10)
}

const getStr = (
  props: StylePropertyMap,
  name: string,
  fallback = ''
): string => {
  return props.get(name)?.toString().trim() || fallback
}

const PIXEL_GRID_BASIC_PROPS = [
  '--px-grid-size',
  '--px-grid-color-1',
  '--px-grid-color-2'
]

export class PixelGridBasic implements PaintWorklet {
  static get inputProperties(): string[] {
    return PIXEL_GRID_BASIC_PROPS
  }

  paint(
    ctx: PaintRenderingContext2D,
    size: { width: number; height: number },
    props: StylePropertyMap
  ): void {
    const { width, height } = size

    const gridSize = getInt(props, '--px-grid-size', 48)
    const gridColor1 = getStr(props, '--px-grid-color-1', '#0000002f')
    const gridColor2 = getStr(props, '--px-grid-color-2', '#ffffff2f')

    // 清空画布
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = gridColor1
    ctx.fillRect(0, 0, width, height)

    // 画格子背景
    ctx.fillStyle = gridColor2
    for (let y = 0; y < height; y += gridSize) {
      for (let x = 0; x < width; x += gridSize) {
        const isEven = (x / gridSize + y / gridSize) % 2 === 0
        ctx.fillStyle = isEven ? gridColor1 : gridColor2
        ctx.fillRect(x, y, gridSize, gridSize)
      }
    }
  }
}

export function registerPixelGridBasic() {
  if (typeof registerPaint !== 'undefined') {
    registerPaint('pixelgridBasic', PixelGridBasic)
  }
}

registerPixelGridBasic()
