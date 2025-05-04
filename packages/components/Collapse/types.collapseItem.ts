import type { CollapseItemName } from './types.collapse'

export interface CollapseItemProps {
  /**
   * @property name
   * @type {string | number}
   * @description 唯一标识符
   * @default -
   */
  name: CollapseItemName
  /**
   * @property title
   * @type string
   * @description 折叠面板标题
   */
  title?: string
  /**
   * @property icon
   * @type string
   * @description 自定义展开图标
   * @default angle-right
   */
  icon?: string
  /**
   * @property disabled
   * @type boolean
   * @description 是否禁用
   */
  disabled?: boolean
}

export interface CollapseItemSlots {
  /**
   * @property default
   * @description CollapseItem 内容
   */
  default: () => string
  /**
   * @property title
   * @description CollapseItem 标题
   */
  title: () => string
}
