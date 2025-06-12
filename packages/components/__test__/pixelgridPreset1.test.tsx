// __test__/pixelgridPreset1.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  PixelGridPreset1,
  registerPixelGridPreset1
} from '../worklets/pixelgridPreset1.worklet'

describe('PixelGridPreset1 Paint Worklet', () => {
  let ctx: PaintRenderingContext2D
  let size: { width: number; height: number }
  let props: Map<string, string | number>

  beforeEach(() => {
    ctx = {
      fillStyle: vi.fn(),
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      save: vi.fn(),
      scale: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn()
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
    expect(PixelGridPreset1.inputProperties).toEqual([
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

    const paint = new PixelGridPreset1()

    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  // props different type test
  it('should set corrent type for properties', () => {
    props.set('--px-grid-size', '32')

    const paint = new PixelGridPreset1()

    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  // registerPixelGridPreset1()
  it('should register pixelgridPreset1 when registerPaint is available', () => {
    const mockRegisterPaint = vi.fn()
    ;(globalThis as any).registerPaint = mockRegisterPaint

    registerPixelGridPreset1()

    expect(mockRegisterPaint).toHaveBeenCalledWith(
      'pixelgridPreset1',
      PixelGridPreset1
    )
  })
})
