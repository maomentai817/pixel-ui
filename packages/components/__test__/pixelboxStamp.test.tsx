// __test__/pixelboxStamp.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  PixelBoxStamp,
  registerPixelBoxStamp
} from '../worklets/pixelboxStamp.worklet'

describe('PixelBoxStamp Paint Worklet', () => {
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
      ['--px-corner-size', '4'],
      ['--px-main-color', '#209cee'],
      ['--px-block-size', '4'],
      ['--px-shadow-color', '#006bb3'],
      ['--px-content-color', '#e5f0f1'],
      ['--px-gap-block', '1']
    ])
  })

  // props test
  it('should define correct inputProperties', () => {
    expect(PixelBoxStamp.inputProperties).toEqual([
      '--px-corner-size',
      '--px-main-color',
      '--px-block-size',
      '--px-shadow-color',
      '--px-content-color',
      '--px-gap-block'
    ])
  })
  // props default values
  it('should define correct default values', () => {
    props.delete('--px-corner-size')
    props.delete('--px-main-color')
    props.delete('--px-block-size')
    props.delete('--px-shadow-color')
    props.delete('--px-content-color')
    props.delete('--px-gap-block')

    const paint = new PixelBoxStamp()

    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  // props different type test
  it('should set corrent type for properties', () => {
    props.set('--px-corner-size', '1')

    const paint = new PixelBoxStamp()

    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  // registerPixelBoxStamp()
  it('should register pixelboxStamp when registerPaint is available', () => {
    const mockRegisterPaint = vi.fn()
    ;(globalThis as any).registerPaint = mockRegisterPaint

    registerPixelBoxStamp()

    expect(mockRegisterPaint).toHaveBeenCalledWith(
      'pixelboxStamp',
      PixelBoxStamp
    )
  })
})
