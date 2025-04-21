// __tests__/pixelstripe.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PixelStripe, registerPixelStripe } from '../worklets/pixelstripe.worklet'

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

describe('PixelStripe PaintWorklet', () => {
  let ctx: any
  const size = { width: 100, height: 100 }

  beforeEach(() => {
    ctx = {
      fillStyle: '',
      fillRect: vi.fn(),
      imageSmoothingEnabled: false
    }
  })

  it('should define correct inputProperties', () => {
    expect(PixelStripe.inputProperties).toEqual([
      '--px-stripe-size',
      '--px-stripe-offset',
      '--px-stripe-color-1',
      '--px-stripe-color-2',
      '--px-stripe-ratio',
      '--px-stripe-mode'
    ])
  })

  it('should fill stripes in "stripe" mode correctly', () => {
    const props = createMockProps({
      '--px-stripe-size': 8,
      '--px-stripe-offset': 4,
      '--px-stripe-color-1': '#ff0000',
      '--px-stripe-color-2': '#00ff00',
      '--px-stripe-ratio': 0.5,
      '--px-stripe-mode': 'stripe'
    })

    const stripe = new PixelStripe()
    stripe.paint(ctx, size, props)

    expect(ctx.fillRect).toHaveBeenCalled()
    expect(ctx.fillStyle).toMatch(/^#(?:ff0000|00ff00)$/) // 两种颜色之一
  })

  it('should fill checkerboard in "checker" mode correctly', () => {
    const props = createMockProps({
      '--px-stripe-size': 10,
      '--px-stripe-offset': 0,
      '--px-stripe-color-1': '#000000',
      '--px-stripe-color-2': '#ffffff',
      '--px-stripe-mode': 'checker'
    })

    const stripe = new PixelStripe()
    stripe.paint(ctx, size, props)

    expect(ctx.fillRect).toHaveBeenCalled()
    expect(ctx.fillStyle).toMatch(/^#(?:000000|ffffff)$/)
  })

  it('should fallback to default values when props missing', () => {
    const props = createMockProps({})

    const stripe = new PixelStripe()
    stripe.paint(ctx, size, props)

    expect(ctx.fillRect).toHaveBeenCalled()
    expect(ctx.fillStyle).toBe('#ffffff') // default color1
  })

  it('should fallback to default unitSize (4) if stripe size is invalid', () => {
    const props = createMockProps({
      '--px-stripe-size': 'invalid',
      '--px-stripe-offset': 0,
      '--px-stripe-color-1': '#111',
      '--px-stripe-color-2': '#222',
      '--px-stripe-mode': 'stripe'
    })

    const stripe = new PixelStripe()
    stripe.paint(ctx, size, props)

    // stripe size 默认 4，宽度 100，应有约 25 列调用 fillRect
    const expectedCols = Math.ceil(100 / 4)
    expect(ctx.fillRect.mock.calls.length).toBeGreaterThanOrEqual(expectedCols)
  })


  it('should register pixelstripe when registerPaint is available', () => {
    const mockRegisterPaint = vi.fn()
      ; (globalThis as any).registerPaint = mockRegisterPaint

    registerPixelStripe()

    expect(mockRegisterPaint).toHaveBeenCalledWith('pixelstripe', PixelStripe)
  })
})
