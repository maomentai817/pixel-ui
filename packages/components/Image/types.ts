export interface ImageProps {
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
   * @property src
   * @type string
   * @description 待转换图片url
   * @default -
   */
  src: string
  /**
   * @property blockSize
   * @type {number | string}
   * @description 块大小
   * @default 2
   */
  blockSize?: number | string
  /**
   * @property colorCount
   * @type {number | string}
   * @description 颜色数量
   * @default 32
   */
  colorCount?: number | string
  /**
   * @property showGrid
   * @type boolean
   * @description 是否显示网格
   * @default false
   */
  showGrid?: boolean
}

export interface ImageInstance {
  /**
   * @property getSize
   * @description 获取处理后 canvas 尺寸
   */
  getSize: () => { width: number; height: number }
}

export interface ImageExpose {
  /**
   * @property getSize
   * @description 获取处理后 canvas 尺寸
   * @type Function - ()=>{ width: number; height: number }
   */
  getSize: () => { width: number; height: number }
}

export interface ImageEmits {
  /**
   * @property ready
   * @description 图片处理完成
   */
  (_e: 'ready', _size: { width: number; height: number }): void
}

export interface ImageEvents {
  /**
   * @property ready
   * @description 图片处理完成
   * @type Function - (val: { width: number; height: number })=>void
   */
  (_e: 'ready', _size: { width: number; height: number }): void
}
