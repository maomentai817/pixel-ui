// __test__/pixelgridBasic.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  PixelGridBasic,
  registerPixelGridBasic
} from '../worklets/pixelgridBasic.worklet'

describe('PixelGridBasic Paint Worklet', () => {
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
      ['--px-grid-size', '48'],
      ['--px-grid-color-1', '#0000002f'],
      ['--px-grid-color-2', '#ffffff2f']
    ])
  })

  // props test
  it('should define correct inputProperties', () => {
    expect(PixelGridBasic.inputProperties).toEqual([
      '--px-grid-size',
      '--px-grid-color-1',
      '--px-grid-color-2'
    ])
  })
  // props default values
  it('should define correct default values', () => {
    props.delete('--px-grid-size')
    props.delete('--px-grid-color-1')
    props.delete('--px-grid-color-2')

    const paint = new PixelGridBasic()

    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  // props different type test
  it('should set corrent type for properties', () => {
    props.set('--px-grid-size', '32')

    const paint = new PixelGridBasic()

    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  // registerPixelGridBasic()
  it('should register pixelgridBasic when registerPaint is available', () => {
    const mockRegisterPaint = vi.fn()
    ;(globalThis as any).registerPaint = mockRegisterPaint

    registerPixelGridBasic()

    expect(mockRegisterPaint).toHaveBeenCalledWith(
      'pixelgridBasic',
      PixelGridBasic
    )
  })
})
