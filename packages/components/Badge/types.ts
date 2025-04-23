export type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps {
  /**
   * @property {string | number} value
   * @default ''
   * @description 显示值
   */
  value?: string | number
  /**
   * @property {number} max
   * @default 99
   * @description 超过最大值显示 {max}+, 仅当 value 为 number 时有效
   */
  max?: number
  /**
   * @property {boolean} isDot
   * @default false
   * @description 是否为圆点
   */
  isDot?: boolean
  /**
   * @property {boolean} hidden
   * @default false
   * @description 是否隐藏
   */
  hidden?: boolean
  /**
   * @property {BadgeType} type
   * @default 'danger'
   * @description Badge 类型
   */
  type?: BadgeType
  /**
   * @property {boolean} showZero
   * @default true
   * @description 当数值为 0 时，是否展示 Badge
   */
  showZero?: boolean
  /**
   * @property {string} color
   * @description 自定义颜色
   */
  color?: string
  /**
   * @property {[number, number]} offset
   * @description 偏移量
   */
  offset?: [number, number]
}
