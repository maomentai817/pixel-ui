// types/worklets.d.ts
declare module '*.js?url' {
  const src: string
  export default src
}

declare module '*.ts?url' {
  const src: string
  export default src
}

// todo: worklet/ 类型声明
interface CSSStyleValue {
  toString(): string
}

interface StylePropertyMap {
  get(_property: string): CSSStyleValue | null
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
