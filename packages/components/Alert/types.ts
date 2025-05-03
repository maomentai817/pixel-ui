export type AlertType = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps {
  /**
   * @property title
   * @type string
   * @description Alert 标题
   * @default -
   */
  title?: string
  /**
   * @property type
   * @type enum - info | success | warning | danger
   * @description Alert 类型
   * @default info
   */
  type?: AlertType
  /**
   * @property description
   * @type string
   * @description 描述性文本
   * @default -
   */
  description?: string
  /**
   * @property effect
   * @type enum - light | dark
   * @description 主题效果
   * @default light
   */
  effect?: 'light' | 'dark'
  /**
   * @property closable
   * @type boolean
   * @description 是否可以关闭
   * @default true
   */
  closable?: boolean
  /**
   * @property center
   * @type boolean
   * @description 文字是否居中
   * @default false
   */
  center?: boolean
  /**
   * @property showIcon
   * @type boolean
   * @description 是否显示图标
   * @default false
   */
  showIcon?: boolean
}

export interface AlertEmits {
  /**
   * @property close
   * @description 关闭事件
   * @type {()=>void}
   */
  (_e: 'close'): void
}

export interface AlertInstance {
  /**
   * @property open
   * @description 打开 Alert
   * @type {()=>void}
   */
  open: () => void
  /**
   * @property close
   * @description 关闭 Alert
   * @type {()=>void}
   */
  close: () => void
}

export interface AlertSlots {
  /**
   * @property default
   * @description 默认插槽,用于设置 Alert 的内容描述
   */
  default: () => string
  /**
   * @property title
   * @description 标题的内容
   */
  title: () => string
}
