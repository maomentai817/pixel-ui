import type { Ref } from 'vue'

export type CollapseItemName = string | number

export interface CollapseProps {
  /**
   * @property modelValue
   * @type CollapseItemName[]
   * @description 当前激活面板的 name
   */
  modelValue: CollapseItemName[]
  /**
   * @property accordion
   * @type boolean
   * @description 是否开启手风琴效果
   */
  accordion?: boolean
}

export interface CollapseItemProps {
  /**
   * @property name
   * @type CollapseItemName
   * @description 唯一标识符
   */
  name: CollapseItemName
  /**
   * @property title
   * @type string
   * @description 标题
   */
  title?: string
  /**
   * @property icon
   * @type string
   * @description 图标
   */
  icon?: string
  /**
   * @property disabled
   * @type boolean
   * @description 是否禁用
   */
  disabled?: boolean
}

export interface CollapseEmits {
  (_e: 'update:modelValue', _val: CollapseItemName[]): void
  (_e: 'change', _val: CollapseItemName[]): void
}

export interface CollapseContext {
  activeNames: Ref<CollapseItemName[]>
  handleItemClick(_name: CollapseItemName): void
}
