import type { Ref } from 'vue'

export interface PixelItProps {
  /**
   * @property src
   * @type string
   * @description 待处理图片的 src
   * @default -
   */
  src: string
  /**
   * @property scale
   * @type number
   * @description 缩放比例, n*n 个像素块压缩到 1*1 个像素块
   * @default 4
   */
  scale?: number
  /**
   * @property palette
   * @type {number[][] | null}
   * @description 颜色调色板, 默认为 16 色灰度色板
   * @default null
   */
  palette?: number[][] | null
  /**
   * @property grayscale
   * @type boolean
   * @description 是否灰度化
   * @default false
   */
  grayscale?: boolean
  /**
   * @property width
   * @type {number | string}
   * @description 宽度(px)
   * @default -
   */
  width?: number | string
  /**
   * @property height
   * @type {number | string}
   * @description 高度(px)
   * @default -
   */
  height?: number | string
  /**
   * @property aspectRatio
   * @type {number | string}
   * @description 缩放比例,原图尺寸过大时强烈建议设置
   * @default 1
   */
  aspectRatio?: number | string
}

export interface PixelItInstance {
  /**
   * @property render
   * @description 渲染图片
   */
  render: () => Promise<void>
  /**
   * @property originRef
   * @description 原始图片的引用
   */
  originRef: Ref<HTMLImageElement | undefined>
  /**
   * @property canvasRef
   * @description 渲染图片的引用
   */
  canvasRef: Ref<HTMLCanvasElement | undefined>
  /**
   * @property getSize
   * @description 图片尺寸获取
   */
  getSize: () => { width: number; height: number }
}
export interface PixelItExpose {
  /**
   * @property render
   * @description 渲染图片
   * @type Function - ()=>Promise<void>
   */
  render: () => Promise<void>
  /**
   * @property originRef
   * @description 原始图片的引用
   * @type {Ref<HTMLImageElement | undefined>}
   */
  originRef: Ref<HTMLImageElement | undefined>
  /**
   * @property canvasRef
   * @description 渲染图片的引用
   * @type {Ref<HTMLCanvasElement | undefined>}
   */
  canvasRef: Ref<HTMLCanvasElement | undefined>
  /**
   * @property getSize
   * @description 图片尺寸获取
   * @type Function - ()=>{ width: number; height: number }
   */
  getSize: () => { width: number; height: number }
}
