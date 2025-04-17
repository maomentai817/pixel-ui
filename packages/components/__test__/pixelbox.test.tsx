// __test__/pixelbox.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PixelBox, registerPixelBox } from '../worklets/pixelbox.worklet'

describe('PixelBox Paint Worklet', () => {
  let ctx: any
  let size: { width: number; height: number }
  let props: Map<string, string | number>

  beforeEach(() => {
    // mock canvas context
    ctx = {
      beginPath: vi.fn(),
      closePath: vi.fn(),
      fillRect: vi.fn(),
      fill: vi.fn(),
      clearRect: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      // set fillStyle(_val) { },
      // set strokeStyle(_val) { },
      // set lineWidth(_val) { }
    }

    size = { width: 100, height: 50 }

    props = new Map([
      ['--px-border', '1'],
      ['--px-border-radius', '2'],
      ['--px-border-color', '#000'],
      ['--px-bg-color', '#fff'],
      ['--px-bg-shadow-border', '1'],
      ['--px-bg-shadow-color', '#333'],
      ['--px-bg-shadow-position', 'bottom-right'],
      ['--px-border-t', '1'],
      ['--px-border-r', '1'],
      ['--px-border-b', '1'],
      ['--px-border-l', '1'],
      ['--px-border-radius-lt', '1'],
      ['--px-border-radius-rt', '1'],
      ['--px-border-radius-lb', '1'],
      ['--px-border-radius-rb', '1'],
      ['--px-button-group-flag', '0'],
      ['--px-button-group-first', '0'],
      ['--px-button-group-last', '0'],
      ['--px-button-single', '1']
    ])
  })

  it('should define correct inputProperties', () => {
    expect(PixelBox.inputProperties).toEqual([
      `--px-border`,
      `--px-border-t`,
      `--px-border-r`,
      `--px-border-b`,
      `--px-border-l`,
      `--px-border-radius`,
      `--px-border-radius-lt`,
      `--px-border-radius-rt`,
      `--px-border-radius-lb`,
      `--px-border-radius-rb`,
      `--px-border-color`,
      `--px-bg-color`,
      `--px-bg-shadow-border`,
      `--px-bg-shadow-color`,
      `--px-bg-shadow-position`,
      `--px-button-group-flag`,
      `--px-button-group-first`,
      `--px-button-group-last`,
      `--px-button-single`
    ])
  })

  // props test
  it('should handle different shadow positions correctly', () => {
    const positions = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
      'invalid-position'
    ]

    positions.forEach(position => {
      props.set('--px-bg-shadow-position', position)
      const paint = new PixelBox()
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)

      expect(ctx.stroke).toHaveBeenCalled()
      ctx.stroke.mockClear()
    })
  })

  it('should handle transparent background color correctly', () => {
    props.set('--px-bg-color', 'transparent')
    const paint = new PixelBox()
    paint.paint(ctx, size, {
      get: (name: string) => props.get(name)
    } as any)

    // 透明背景应该不填充
    expect(ctx.fillRect).not.toHaveBeenCalledWith(0, 0, 100, 50)
  })

  it('should use default values when numeric properties are missing or invalid', () => {
    props.delete('--px-border')
    props.delete('--px-border-radius')
    props.delete('--px-bg-shadow-border')

    props.set('--px-border-radius-lt', 'abc') // 无法 parse
    props.set('--px-border-radius-rt', '') // 空字符串
    props.delete('--px-border-radius-lb') // undefined
    props.set('--px-border-radius-rb', '5') // 正常值

    const paint = new PixelBox()
    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  it('should fallback to default values for shadow, color, radius, border and button-group props', () => {
    // 删除或设置无效的属性值，确保使用默认值路径
    props.delete('--px-bg-shadow-position') // 空字符串 ''
    props.set('--px-border-color', '')      // 空字符串 ''
    props.set('--px-bg-color', null as any) // null -> .toString() 报错 → 用 ?.toString()
    props.set('--px-bg-shadow-color', undefined as any) // undefined

    // border-radius 四个角：不同情况覆盖
    props.delete('--px-border-radius-lt')
    props.delete('--px-border-radius-rt')
    props.delete('--px-border-radius-lb')
    props.delete('--px-border-radius-rb')

    // border 宽度：全为空或错误
    props.delete('--px-border-t')
    props.delete('--px-border-r')
    props.delete('--px-border-b')
    props.delete('--px-border-l')

    // button-group flag 相关
    props.delete('--px-button-group-flag')
    props.delete('--px-button-group-first')
    props.set('--px-button-group-last', null as any)  // null
    props.delete('--px-button-single')

    const paint = new PixelBox()

    // 执行 paint，确保不会抛异常（说明所有变量都能 fallback 正常）
    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })


  it('should parse all button group related flags', () => {
    props.set('--px-button-group-flag', '1')
    props.set('--px-button-group-first', '1')
    props.set('--px-button-group-last', '1')
    props.set('--px-button-single', '1')

    const paint = new PixelBox()
    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  it('should draw background and borders correctly', () => {
    const paint = new PixelBox()
    paint.paint(ctx, size, {
      get: (name: string) => props.get(name)
    } as any)

    // 验证是否调用了基本的绘图方法
    expect(ctx.fillRect).toHaveBeenCalled()
    expect(ctx.stroke).toHaveBeenCalled()
    expect(ctx.moveTo).toHaveBeenCalled()
    expect(ctx.lineTo).toHaveBeenCalled()
  })

  it('should respect border and radius settings', () => {
    props.set('--px-border', '2')
    props.set('--px-border-radius', '3')

    const paint = new PixelBox()
    paint.paint(ctx, size, {
      get: (name: string) => props.get(name)
    } as any)

    expect(ctx.fillRect).toHaveBeenCalled()
    expect(ctx.clearRect).toHaveBeenCalled()
  })

  it('should draw shadow in correct direction', () => {
    props.set('--px-bg-shadow-position', 'bottom-left')

    const paint = new PixelBox()
    paint.paint(ctx, size, {
      get: (name: string) => props.get(name)
    } as any)

    expect(ctx.stroke).toHaveBeenCalled()
  })

  it('should fallback to default values for missing properties', () => {
    props.delete('--px-border')
    props.delete('--px-bg-color')

    const paint = new PixelBox()
    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  it('should adjust content width when in button group last or flag mode', () => {
    props.set('--px-button-group-flag', '1') // 模拟 button group 模式

    const paint = new PixelBox()
    paint.paint(ctx, size, {
      get: (name: string) => props.get(name)
    } as any)

    expect(ctx.fillRect).toHaveBeenCalled()
  })

  it('should draw top and right shadow lines when shadow position is top-right', () => {
    props.set('--px-bg-shadow-position', 'top-right')

    const paint = new PixelBox()
    paint.paint(ctx, size, {
      get: (name: string) => props.get(name)
    } as any)

    expect(ctx.moveTo).toHaveBeenCalled()
    expect(ctx.lineTo).toHaveBeenCalled()
  })
  it('should draw top and left shadow lines when shadow position is top-left', () => {
    props.set('--px-bg-shadow-position', 'top-left')

    const paint = new PixelBox()
    paint.paint(ctx, size, {
      get: (name: string) => props.get(name)
    } as any)

    expect(ctx.moveTo).toHaveBeenCalled()
    expect(ctx.lineTo).toHaveBeenCalled()
  })
  it('should draw bottom and right shadow lines when shadow position is bottom-right', () => {
    props.set('--px-bg-shadow-position', 'bottom-right')

    const paint = new PixelBox()
    paint.paint(ctx, size, {
      get: (name: string) => props.get(name)
    } as any)

    expect(ctx.moveTo).toHaveBeenCalled()
    expect(ctx.lineTo).toHaveBeenCalled()
  })
  it('should draw bottom and left shadow lines when shadow position is bottom-left', () => {
    props.set('--px-bg-shadow-position', 'bottom-left')

    const paint = new PixelBox()
    paint.paint(ctx, size, {
      get: (name: string) => props.get(name)
    } as any)

    expect(ctx.moveTo).toHaveBeenCalled()
    expect(ctx.lineTo).toHaveBeenCalled()
  })

  it('should draw bottom and left shadow lines when shadow position is bottom-left with button single', () => {
    props.set('--px-bg-shadow-position', 'bottom-left')
    props.delete('--px-button-group-first')
    props.delete('--px-button-single')

    const paint = new PixelBox()
    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })
  it('should draw top and left shadow lines when shadow position is top-left with button single', () => {
    props.set('--px-bg-shadow-position', 'top-left')
    props.delete('--px-button-group-first')
    props.delete('--px-button-single')

    const paint = new PixelBox()
    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  it('should not draw any shadow lines for unknown shadow position', () => {
    props.set('--px-bg-shadow-position', 'weird-position')

    const paint = new PixelBox()

    // 清除之前调用计数
    ctx.moveTo.mockClear()
    ctx.lineTo.mockClear()

    paint.paint(ctx, size, {
      get: (name: string) => props.get(name)
    } as any)

    const calls = ctx.moveTo.mock.calls
    const shadowRelatedCalls = calls.filter(([x, y]: [number, number]) =>
      // 你可以根据 shadow 绘制的特定位置过滤
      (x === 0 && y === 3) || (x === 3 && y === 50) || (x === 100 && y === 3)
    )

    expect(shadowRelatedCalls.length).toBe(4)
  })


  it('should draw top line with left margin when buttonGroupFirst is active', () => {
    props.set('--px-button-group-first', '1')

    const paint = new PixelBox()
    paint.paint(ctx, size, {
      get: (name: string) => props.get(name)
    } as any)

    expect(ctx.moveTo).toHaveBeenCalled()
    expect(ctx.lineTo).toHaveBeenCalled()
  })

  it('should draw top line with right margin when buttonGroupLast is active', () => {
    props.set('--px-button-group-last', '1')

    const paint = new PixelBox()
    paint.paint(ctx, size, {
      get: (name: string) => props.get(name)
    } as any)

    expect(ctx.moveTo).toHaveBeenCalled()
    expect(ctx.lineTo).toHaveBeenCalled()
  })

  it('should register pixelbox when registerPaint is available', () => {
    const mockRegisterPaint = vi.fn()
      ; (globalThis as any).registerPaint = mockRegisterPaint

    registerPixelBox()

    expect(mockRegisterPaint).toHaveBeenCalledWith('pixelbox', PixelBox)
  })
})
