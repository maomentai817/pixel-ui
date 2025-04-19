export type ProgressType = 'primary' | 'success' | 'warning' | 'danger'

export interface ProgressProps {
  /**
   * @property {number} percentage
   * @default 0
   * @description 进度百分比
   */
  percentage: number
  /**
   * @property {number} strokeWidth
   * @default 6
   * @description 进度条宽度
   */
  strokeWidth?: number
  /**
   * @property {boolean} textInside
   * @default false
   * @description 进度条文字在内
   */
  textInside?: boolean
  /**
   * @property {ProgressType} status
   * @description 进度条状态
   */
  status?: ProgressType
  /**
   * @property {boolean} indeterminate
   * @default false
   * @description 是否展示动画
   */
  indeterminate?: boolean
  /**
   * @property {number} duration
   * @default 3
   * @description 动画持续时间/条纹进度条流速
   */
  duration?: number
  /**
   * @property {string} color
   * @description 进度条颜色
   */
  color?: string
  /**
   * @property {boolean} showText
   * @default true
   * @description 是否展示进度条文字
   */
  showText?: boolean
  /**
   * @property {(percentage: number) => string} format
   * @description 指定进度条文字内容
   */
  format?: (percentage: number) => string
  /**
   * @property {boolean} striped
   * @default false
   * @description 是否展示条纹
   */
  striped?: boolean
  /**
   * @property {boolean} stripedFlow
   * @default false
   * @description 是否展示条纹流速
   */
  stripedFlow?: boolean
}