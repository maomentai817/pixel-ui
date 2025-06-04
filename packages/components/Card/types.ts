export interface CardProps {
  /**
   * @property hoverable
   * @type boolean
   * @description 是否启用Hover效果
   * @default false
   */
  hoverable?: boolean
  /**
   * @property round
   * @type boolean
   * @description 是否启用圆角效果
   * @default false
   */
  round?: boolean
  /**
   * @property circle
   * @type boolean
   * @description 是否启用圆形效果
   * @default false
   */
  circle?: boolean
  /**
   * @property stamp
   * @type boolean
   * @description 是否启用标签效果
   * @default false
   */
  stamp?: boolean
}

export interface CardSlots {
  /**
   * @property default
   * @description 默认插槽,卡片内容
   */
  default: () => string
  /**
   * @property header
   * @description 卡片标题内容
   */
  header: () => string
  /**
   * @property footer
   * @description 卡片底部内容
   */
  footer: () => string
  /**
   * @property prepend
   * @description 卡片前置内容
   */
  prepend: () => string
  /**
   * @property append
   * @description 卡片后置内容
   */
  append: () => string
}
