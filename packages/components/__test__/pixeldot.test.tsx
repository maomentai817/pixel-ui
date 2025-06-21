// __test__/pixeldot.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PixelDot, registerPixelDot } from '../worklets/pixeldot.worklet'

describe('PixelDot Paint Worklet', () => {
  let ctx: PaintRenderingContext2D
  let size: { width: number; height: number }
  let props: Map<string, string | number>

  beforeEach(() => {
    ctx = {
      fillStyle: vi.fn(),
      fillRect: vi.fn(),
      clearRect: vi.fn()
    } as any
    size = { width: 750, height: 350 }
    props = new Map([
      ['--px-dot-color', '#ffffff'],
      ['--px-block-size', '2']
    ])
  })

  // props test
  it('should define correct inputProperties', () => {
    expect(PixelDot.inputProperties).toEqual([
      '--px-dot-color',
      '--px-block-size'
    ])
  })
  // props default values
  it('should define correct default values', () => {
    props.delete('--px-dot-color')
    props.delete('--px-block-size')

    const paint = new PixelDot()

    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  // props different type test
  it('should set corrent type for properties', () => {
    props.set('--px-block-size', '32')

    const paint = new PixelDot()

    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  // registerPixelDot()
  it('should register pixeldot when registerPaint is available', () => {
    const mockRegisterPaint = vi.fn()
    ;(globalThis as any).registerPaint = mockRegisterPaint

    registerPixelDot()

    expect(mockRegisterPaint).toHaveBeenCalledWith('pixeldot', PixelDot)
  })
})
