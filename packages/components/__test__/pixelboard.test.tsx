// __test__/pixelboard.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PixelBoard, registerPixelBoard } from '../worklets/pixelboard.worklet'

describe('PixelBoard Paint Worklet', () => {
  let ctx: PaintRenderingContext2D
  let size: { width: number; height: number }
  let props: Map<string, string | number>

  beforeEach(() => {
    ctx = { fillStyle: vi.fn(), fillRect: vi.fn() } as any
    size = { width: 750, height: 350 }
    props = new Map([
      ['--px-corner-size', '6'],
      ['--px-board-color', '#3A4567'],
      ['--px-shadow-color', '#252D46'],
      ['--px-color-1', '#8F9DB5'],
      ['--px-color-2', '#B4C0D2'],
      ['--px-block-size', '9'],
      ['--px-border-color', '#000000']
    ])
  })

  // props test
  it('should define correct inputProperties', () => {
    expect(PixelBoard.inputProperties).toEqual([
      '--px-corner-size',
      '--px-board-color',
      '--px-shadow-color',
      '--px-color-1',
      '--px-color-2',
      '--px-block-size',
      '--px-border-color'
    ])
  })
  // props default values
  it('should define correct default values', () => {
    props.delete('--px-corner-size')
    props.delete('--px-board-color')
    props.delete('--px-shadow-color')
    props.delete('--px-color-1')
    props.delete('--px-color-2')
    props.delete('--px-block-size')
    props.delete('--px-border-color')

    const paint = new PixelBoard()

    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  // props different type test
  it('should set corrent type for properties', () => {
    props.set('--px-corner-size', '1')

    const paint = new PixelBoard()

    expect(() =>
      paint.paint(ctx, size, {
        get: (name: string) => props.get(name)
      } as any)
    ).not.toThrow()
  })

  // registerPixelBoard()
  it('should register pixelboard when registerPaint is available', () => {
    const mockRegisterPaint = vi.fn()
    ;(globalThis as any).registerPaint = mockRegisterPaint

    registerPixelBoard()

    expect(mockRegisterPaint).toHaveBeenCalledWith('pixelboard', PixelBoard)
  })
})
