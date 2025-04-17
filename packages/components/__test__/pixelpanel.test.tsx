// __test__/pixelpanel.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'

// pixelpanel 类声明
import { PixelPanel, registerPixelPanel } from '../worklets/pixelpanel.worklet'

function createMockProps(
  values: Record<string, string | number>
): StylePropertyMap {
  return {
    get: (key: string) => {
      const val = values[key]
      return val !== undefined ? { toString: () => val.toString() } : null
    }
  } as unknown as StylePropertyMap
}

describe('PixelPanel PaintWorklet', () => {
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
      clearRect: vi.fn()
    }
  })

  it('should define correct inputProperties', () => {
    expect(PixelPanel.inputProperties).toEqual([
      '--px-border',
      '--px-border-color',
      '--px-bg-color',
      '--px-corner-size',
      '--px-bg-shadow-color',
      '--px-border-shadow'
    ])
  })

  it('should fill background and apply border', () => {
    const props = createMockProps({
      '--px-border': 4,
      '--px-border-color': '#123456',
      '--px-bg-color': '#abcdef',
      '--px-corner-size': 6,
      '--px-bg-shadow-color': 'rgba(0,0,0,0.5)',
      '--px-border-shadow': 8
    })

    const panel = new PixelPanel()
    panel.paint(ctx, size, props)

    expect(ctx.fillStyle).toBe('rgba(0,0,0,0.5)')
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 100, 100)
    expect(ctx.strokeStyle).toBe('#123456')
    expect(ctx.stroke).toHaveBeenCalled()
  })

  it('should skip drawing border if border is 0', () => {
    const props = createMockProps({
      '--px-border': 0,
      '--px-bg-color': '#fff'
    })

    const panel = new PixelPanel()
    panel.paint(ctx, size, props)

    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 100, 100)
    expect(ctx.beginPath).not.toHaveBeenCalled()
    expect(ctx.stroke).not.toHaveBeenCalled()
  })

  it('should use default values if props are missing', () => {
    const props = createMockProps({})

    const panel = new PixelPanel()
    panel.paint(ctx, size, props)

    expect(ctx.fillStyle).toBe('#fff')
    expect(ctx.fillRect).toHaveBeenCalled()
  })

  it('should draw shadow rectangles', () => {
    const props = createMockProps({
      '--px-border': 2,
      '--px-border-shadow': 6,
      '--px-corner-size': 4,
      '--px-bg-color': '#000',
      '--px-bg-shadow-color': 'rgba(0,0,0,0.3)'
    })

    const panel = new PixelPanel()
    panel.paint(ctx, size, props)

    expect(ctx.fillStyle).toBe('rgba(0,0,0,0.3)')
    expect(ctx.fillRect).toHaveBeenCalledTimes(3) // background + 2 shadows
  })

  it('should register pixelpanel when registerPaint is available', () => {
    const mockRegisterPaint = vi.fn()
    ;(globalThis as any).registerPaint = mockRegisterPaint

    registerPixelPanel()

    expect(mockRegisterPaint).toHaveBeenCalledWith('pixelpanel', PixelPanel)
  })
})
