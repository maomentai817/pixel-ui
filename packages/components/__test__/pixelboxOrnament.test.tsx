// __test__/pixelboard.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  PixelBoxOrnament,
  registerPixelBoxOrnament
} from '../worklets/pixelboxOrnament.worklet'

describe('PixelBoxOrnament Paint Worklet', () => {
  let ctx: PaintRenderingContext2D
  let size: { width: number; height: number }
  let props: Map<string, string | number>

  beforeEach(() => {
    ctx = {
      fillStyle: vi.fn(),
      fillRect: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      scale: vi.fn(),
      clearRect: vi.fn()
    } as any
    size = { width: 750, height: 350 }
    props = new Map([
      ['--px-corner-size', '3'],
      ['--px-main-color', '#209cee'],
      ['--px-block-size', '5']
    ])
  })

  // props test
  it('should define correct inputProperties', () => {
    expect(PixelBoxOrnament.inputProperties).toEqual([
      '--px-corner-size',
      '--px-main-color',
      '--px-block-size'
    ])
  })
  // props default values
  it('should define correct default values', () => {
    props.delete('--px-corner-size')
    props.delete('--px-main-color')
    props.delete('--px-block-size')

    const paint = new PixelBoxOrnament()

    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  // props different type test
  it('should set corrent type for properties', () => {
    props.set('--px-corner-size', '1')

    const paint = new PixelBoxOrnament()

    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  // registerPixelBoxOrnament()
  it('should register pixelboxOrnament when registerPaint is available', () => {
    const mockRegisterPaint = vi.fn()
    ;(globalThis as any).registerPaint = mockRegisterPaint

    registerPixelBoxOrnament()

    expect(mockRegisterPaint).toHaveBeenCalledWith(
      'pixelboxOrnament',
      PixelBoxOrnament
    )
  })
})
