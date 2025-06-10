export const badgeTypes = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
  'sakura'
] as const
export type BadgeType = (typeof badgeTypes)[number]

export interface BadgeProps {
  /**
   * @property value
   * @type  {string | number}
   * @description 徽章显示内容/值
   * @default -
   */
  value?: string | number
  /**
   * @property max
   * @type number
   * @description 超过最大值显示max+,仅当 value 为 number 时有效
   * @default 99
   */
  max?: number
  /**
   * @property isDot
   * @type boolean
   * @description 是否启用圆点模式
   * @default false
   */
  isDot?: boolean
  /**
   * @property hidden
   * @type boolean
   * @description 是否启用隐藏
   * @default false
   */
  hidden?: boolean
  /**
   * @property type
   * @type enum - primary | success | warning | danger | info | sakura
   * @description 徽章类型
   * @default danger
   */
  type?: BadgeType
  /**
   * @property showZero
   * @type boolean
   * @description 值为零时是否展示徽章
   * @default true
   */
  showZero?: boolean
  /**
   * @property color
   * @type string
   * @description 自定义颜色
   * @default -
   */
  color?: string
  /**
   * @property offset
   * @type {[number, number]}
   * @description 偏移量
   * @default -
   */
  offset?: [number, number]
}

export interface BadgeSlots {
  /**
   * @property default
   * @description 自定义默认内容
   */
  default: () => string
  /**
   * @property content
   * @description 自定义显示内容
   */
  content: () => string
}
