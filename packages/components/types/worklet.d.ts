// types/worklets.d.ts
declare module '*.worklet.ts' {
  const content: string
  export default content
}

declare module '*.worklet.ts?worklet' {
  const workletUrl: string
  export default workletUrl
}

// Add support for JavaScript worklets
declare module '*.worklet.js?url' {
  const content: string
  export default content
}

declare module '*.worklet.js?worklet' {
  const workletUrl: string
  export default workletUrl
}

// todo: worklet/ 类型声明
interface CSSStyleValue {
  toString(): string
}

interface StylePropertyMap {
  get(_property: string): CSSStyleValue | undefined
  getAll(_property: string): CSSStyleValue[]
  has(_property: string): boolean
}

interface PaintSize {
  width: number
  height: number
}

interface PaintWorklet {
  paint(
    _ctx: PaintRenderingContext2D,
    _size: PaintSize,
    _props: StylePropertyMap
  ): void
}

declare let registerPaint: (
  _name: string,
  _ctor: new () => PaintWorklet
) => void

// PaintRenderingContext2D 实际上就是 CanvasRenderingContext2D
type PaintRenderingContext2D = CanvasRenderingContext2D
