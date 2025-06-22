import type { ComputedRef } from 'vue'

export type SwitchValueType = boolean | string | number

const switchSizes = ['small', 'default', 'large'] as const
export type SwitchSize = (typeof switchSizes)[number]

export interface SwitchProps {
  /**
   * @property modelValue
   * @type {boolean | string | number}
   * @description 绑定值, 必须等于 `active-value` 或 `inactive-value`, 默认为 `Boolean` 类型
   * @default false
   */
  modelValue: SwitchValueType
  /**
   * @property disabled
   * @type boolean
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * @property loading
   * @type boolean
   * @description 是否显示加载中
   * @default false
   */
  loading?: boolean
  /**
   * @property size
   * @type enum - small | default | large
   * @description Switch 尺寸
   * @default -
   */
  size?: SwitchSize
  /**
   * @property inlinePrompt
   * @type boolean
   * @description 无论图标或文本是否显示在点内, 只会呈现文本的第一个字符
   * @default false
   */
  inlinePrompt?: boolean
  /**
   * @property activeIcon
   * @type string
   * @description 开启状态的图标, 覆盖 `activeText`
   * @default -
   */
  activeIcon?: string
  /**
   * @property inactiveIcon
   * @type string
   * @description 关闭状态的图标, 覆盖 `inactiveText`
   * @default -
   */
  inactiveIcon?: string
  /**
   * @property activeActionIcon
   * @type string
   * @description 开启状态内部图标
   * @default -
   */
  activeActionIcon?: string
  /**
   * @property inactiveActionIcon
   * @type string
   * @description 关闭状态内部图标
   * @default -
   */
  inactiveActionIcon?: string
  /**
   * @property activeText
   * @type string
   * @description 开启状态的文字
   * @default -
   */
  activeText?: string
  /**
   * @property inactiveText
   * @type string
   * @description 关闭状态的文字
   * @default -
   */
  inactiveText?: string
  /**
   * @property activeValue
   * @type {string | number | boolean}
   * @description Switch 状态为 `on` 时的值
   * @default true
   */
  activeValue?: SwitchValueType
  /**
   * @property inactiveValue
   * @type {string | number | boolean}
   * @description Switch 状态为 `off` 时的值
   * @default false
   */
  inactiveValue?: SwitchValueType
  /**
   * @property name
   * @type string
   * @description Switch 对应的 name 属性
   */
  name?: string
  /**
   * @property id
   * @type string
   * @description Switch 对应的 id 属性
   * @default -
   */
  id?: string
}

export interface SwitchEmits {
  /**
   * @property update:modelValue
   * @description 绑定值发生改变时触发
   */
  (_e: 'update:modelValue', _value: SwitchValueType): void
  /**
   * @property change
   * @description 绑定值发生改变时触发
   */
  (_e: 'change', _value: SwitchValueType): void
}
export interface SwitchEvents {
  /**
   * @property update:modelValue
   * @description 绑定值发生改变时触发
   * @type Function - (value: SwitchValueType) => void
   */
  (_e: 'update:modelValue', _value: SwitchValueType): void
  /**
   * @property change
   * @description 绑定值发生改变时触发
   * @type Function - (value: SwitchValueType) => void
   */
  (_e: 'change', _value: SwitchValueType): void
}

export interface SwitchInstance {
  /**
   * @property focus
   * @description 获取焦点
   */
  focus(): void
  /**
   * @property checked
   * @description 获取当前是否选中
   */
  checked: ComputedRef<boolean>
}
export interface SwitchExpose {
  /**
   * @property focus
   * @description 获取焦点
   * @type Function - ()=>void
   */
  focus(): void
  /**
   * @property checked
   * @description 获取当前是否选中
   * @type ComputedRef<boolean>
   */
  checked: ComputedRef<boolean>
}
