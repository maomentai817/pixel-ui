import type { VNode } from 'vue'

export type DropdownCommand = string | number

export interface DropdownItemProps {
  /**
   * @property command
   * @type  {string | number}
   * @description 菜单项指令
   * @default -
   */
  command?: DropdownCommand
  /**
   * @property label
   * @type  {string | VNode}
   * @description 菜单项内容
   * @default -
   */
  label?: string | VNode
  /**
   * @property disabled
   * @type  {boolean}
   * @description 菜单项是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * @property divided
   * @type  {boolean}
   * @description 菜单项是否分割
   * @default false
   */
  divided?: boolean
}

export interface DropdownItemSlots {
  /**
   * @property default
   * @description 默认插槽,优先级高于`props.label`
   */
  default: () => string
}
