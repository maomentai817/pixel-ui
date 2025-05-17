export interface ImageProps {
  /**
   * @property width
   * @type number
   * @description 宽度(px)
   * @default -
   */
  width?: number
  /**
   * @property height
   * @type number
   * @description 高度(px)
   * @default -
   */
  height?: number
  /**
   * @property src
   * @type string
   * @description 待转换图片url
   * @default -
   */
  src: string
  /**
   * @property blockSize
   * @type number
   * @description 块大小
   * @default 2
   */
  blockSize?: number
  /**
   * @property colorCount
   * @type number
   * @description 颜色数量
   * @default 32
   */
  colorCount?: number
  /**
   * @property showGrid
   * @type boolean
   * @description 是否显示网格
   * @default false
   */
  showGrid?: boolean
}
