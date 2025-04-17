// __test__/pixelcontent.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PixelContent, registerPixelContent } from '../worklets/pixelcontent.worklet'

function createMockProps(values: Record<string, string | number>): StylePropertyMap {
  return {
    get: (key: string) => {
      const val = values[key]
      return val !== undefined
        ? { toString: () => val.toString() }
        : null
    },
  } as unknown as StylePropertyMap
}

describe('PixelContent PaintWorklet', () => {
  let ctx: any
  const size = { width: 100, height: 100 }

  beforeEach(() => {
    ctx = {
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0,
      lineCap: '',
      fillRect: vi.fn(),
      stroke: vi.fn(),
      beginPath: vi.fn(),
      closePath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      clearRect: vi.fn(),
    }
  })

  it('should define correct inputProperties', () => {
    expect(PixelContent.inputProperties).toEqual([
      '--px-border',
      '--px-border-color',
      '--px-bg-color',
      '--px-corner-size',
      '--px-bg-shadow-color',
      '--px-border-shadow'
    ])
  })

  it('should fill background and skip drawing if border is 0', () => {
    const props = createMockProps({
      '--px-border': 0,
      '--px-bg-color': '#fff',
    })

    const content = new PixelContent()
    content.paint(ctx, size, props)

    expect(ctx.fillStyle).toBe('transparent')
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 100, 100)
    expect(ctx.beginPath).not.toHaveBeenCalled()
    expect(ctx.stroke).not.toHaveBeenCalled()
  })

  it('should draw borders and shadows correctly', () => {
    const props = createMockProps({
      '--px-border': 2,
      '--px-border-color': '#123456',
      '--px-bg-color': '#abcdef',
      '--px-corner-size': 6,
      '--px-bg-shadow-color': 'rgba(0,0,0,0.5)',
      '--px-border-shadow': 4,
    })

    const content = new PixelContent()
    content.paint(ctx, size, props)

    expect(ctx.beginPath).toHaveBeenCalled()
    expect(ctx.strokeStyle).toBe('#123456')
    expect(ctx.lineWidth).toBe(2)
    expect(ctx.stroke).toHaveBeenCalled()
    expect(ctx.fillStyle).toBe('#abcdef') // 最终 content 区域填充色
    expect(ctx.fillRect).toHaveBeenCalled() // 应该至少被调用多次（背景、阴影、content）
    expect(ctx.closePath).toHaveBeenCalled()
  })

  it('should use fallback/default values when properties are missing', () => {
    const props = createMockProps({})

    const content = new PixelContent()
    content.paint(ctx, size, props)

    expect(ctx.fillStyle).toBe('transparent')
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 100, 100)
  })

  it('should register pixelcontent when registerPaint is available', () => {
    const mockRegisterPaint = vi.fn()
      ; (globalThis as any).registerPaint = mockRegisterPaint

    registerPixelContent()

    expect(mockRegisterPaint).toHaveBeenCalledWith('pixelcontent', PixelContent)
  })
})
