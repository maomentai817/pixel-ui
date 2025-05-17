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
   * @default 8
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
}
