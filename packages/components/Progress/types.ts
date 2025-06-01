export type ProgressType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'sakura'

export interface ProgressProps {
  /**
   * @property type
   * @type enum - line | circle
   * @description 进度条类型
   * @default line
   */
  type?: 'line' | 'circle'
  /**
   * @property percentage
   * @type number
   * @description 进度条百分比
   * @default 0
   */
  percentage: number
  /**
   * @property status
   * @type enum - primary | success | warning | danger | sakura
   * @description 进度条类型
   * @default primary
   */
  status?: ProgressType
  /**
   * @property strokeWidth
   * @type number
   * @description 进度条宽度
   * @default 16
   */
  strokeWidth?: number
  /**
   * @property textInside
   * @type boolean
   * @description 是否启用文字显示在进度条内
   * @default false
   */
  textInside?: boolean
  /**
   * @property indeterminate
   * @type boolean
   * @description 是否启用进度条动画
   * @default false
   */
  indeterminate?: boolean
  /**
   * @property duration
   * @type number
   * @description 动画/条纹进度条流速
   * @default 4
   */
  duration?: number
  /**
   * @property color
   * @type string
   * @description 自定义颜色
   * @default -
   */
  color?: string
  /**
   * @property showText
   * @type boolean
   * @description 是否展示进度条文字
   * @default true
   */
  showText?: boolean
  /**
   * @property striped
   * @type boolean
   * @description 是否为条纹进度条
   * @default false
   */
  striped?: boolean
  /**
   * @property stripedFlow
   * @type boolean
   * @description 是否为流动条纹进度条
   * @default false
   */
  stripedFlow?: boolean
  /**
   * @property checker
   * @type boolean
   * @description 是否为棋盘进度条
   * @default false
   */
  checker?: boolean
  /**
   * @property blockSize
   * @type number
   * @description 像素块大小, 仅在开启条纹或棋盘时生效
   * @default 4
   */
  blockSize?: number
  /**
   * @property format
   * @type Function - (percentage: number) => string
   * @description 进度条文本回调
   * @default ()=>{}
   */
  format?: (_percentage: number) => string
  /**
   * @property width
   * @type number
   * @description 环形进度条画布宽度
   * @default 126
   */
  width?: number
}

export interface ProgressSlots {
  /**
   * @property default
   * @description 默认插槽，用于设置 Progress 的内容描述
   */
  default: () => string
}
