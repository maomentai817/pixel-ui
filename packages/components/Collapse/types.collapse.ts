import type { Ref } from 'vue'

export type CollapseItemName = string | number

export interface CollapseProps {
  /**
   * @property modelValue
   * @type {string[] | number[]}
   * @description 当前激活面板列表
   * @default []
   */
  modelValue: CollapseItemName[]
  /**
   * @property accordion
   * @type boolean
   * @description 是否开启手风琴效果
   * @default false
   */
  accordion?: boolean
}

export interface CollapseEmits {
  /**
   * @property update:modelValue
   * @description 双向绑定值更新时触发
   */
  (_e: 'update:modelValue', _val: CollapseItemName[]): void
  /**
   * @property change
   * @description 面板切换完成后触发的值变更事件
   */
  (_e: 'change', _val: CollapseItemName[]): void
}
export interface CollapseEvents {
  /**
   * @property update:modelValue
   * @description 双向绑定值更新时触发
   * @type Function - (val: CollapseItemName[])=>void
   */
  (_e: 'update:modelValue', _val: CollapseItemName[]): void
  /**
   * @property change
   * @description 面板切换完成后触发的值变更事件
   * @type Function - (val: CollapseItemName[])=>void
   */
  (_e: 'change', _val: CollapseItemName[]): void
}

export interface CollapseContext {
  activeNames: Ref<CollapseItemName[]>
  handleItemClick(_name: CollapseItemName): void
}

export interface CollapseSlots {
  /**
   * @property default
   * @description 默认插槽 `SubComponent: PxCollapseItem`
   */
  default: () => string
}
