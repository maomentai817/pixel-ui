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

const PIXEL_GRID_PRESET1_PROPS = [
  '--px-grid-size',
  '--px-grid-color-1',
  '--px-grid-color-2'
]

export class PixelGridPreset1 implements PaintWorklet {
  static get inputProperties(): string[] {
    return PIXEL_GRID_PRESET1_PROPS
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
    // 装饰性
    const drawGridPattern = (
      ctx: PaintRenderingContext2D,
      dx: number,
      dy: number,
      size: number,
      color: string
    ): void => {
      const blockSize = gridSize / 16
      ctx.save()
      ctx.translate(dx, dy)

      // 1/4 区域绘制逻辑
      const drawQuarter = (flipX: boolean, flipY: boolean) => {
        ctx.save()
        ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1)
        ctx.fillStyle = color
        // 只绘制正向 quarter
        ctx.fillRect(0, 0, blockSize, 8 * blockSize)
        ctx.fillRect(0, 0, 8 * blockSize, blockSize)
        ctx.fillRect(2 * blockSize, 2 * blockSize, blockSize, 5 * blockSize)
        ctx.fillRect(2 * blockSize, 2 * blockSize, 5 * blockSize, blockSize)
        ctx.fillRect(3 * blockSize, 5 * blockSize, 2 * blockSize, blockSize)
        ctx.fillRect(5 * blockSize, 3 * blockSize, blockSize, 2 * blockSize)
        ctx.fillRect(3 * blockSize, 7 * blockSize, 2 * blockSize, blockSize)
        ctx.fillRect(7 * blockSize, 3 * blockSize, blockSize, 2 * blockSize)
        ctx.fillRect(6 * blockSize, 7 * blockSize, blockSize, blockSize)
        ctx.fillRect(7 * blockSize, 6 * blockSize, blockSize, blockSize)
        ctx.fillRect(5 * blockSize, 5 * blockSize, 2 * blockSize, 2 * blockSize)
        ctx.restore()
      }

      // 四象限绘制
      drawQuarter(false, false) // 左上
      ctx.translate(size, 0)
      drawQuarter(true, false) // 右上
      ctx.translate(-size, size)
      drawQuarter(false, true) // 左下
      ctx.translate(size, 0)
      drawQuarter(true, true) // 右下

      ctx.restore()
    }

    for (let y = 0; y < height; y += gridSize) {
      for (let x = 0; x < width; x += gridSize) {
        const isEven = (x / gridSize + y / gridSize) % 2 === 0
        if (isEven) {
          // 花纹格子预设-1绘制
          drawGridPattern(ctx, x, y, gridSize, gridColor2)
        }
      }
    }
  }
}

export function registerPixelGridPreset1() {
  if (typeof registerPaint !== 'undefined') {
    registerPaint('pixelgridPreset1', PixelGridPreset1)
  }
}

registerPixelGridPreset1()
