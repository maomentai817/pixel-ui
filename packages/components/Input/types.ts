import type { Ref } from 'vue'

export const inputSizes = ['small', 'default', 'large'] as const
export type InputSize = (typeof inputSizes)[number]

export interface InputProps {
  /**
   * @property id
   * @type string
   * @description 输入框唯一标识
   * @default -
   */
  id?: string
  /**
   * @property modelValue
   * @type string
   * @description 输入框绑定值
   * @default -
   */
  modelValue: string
  /**
   * @property type
   * @type string
   * @description 输入框类型
   * @default text
   */
  type?: string
  /**
   * @property size
   * @type enum - small | default | large
   * @description 输入框尺寸
   * @default default
   */
  size?: InputSize
  /**
   * @property disabled
   * @type boolean
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * @property clearable
   * @type boolean
   * @description 是否显示清除按钮
   * @default false
   */
  clearable?: boolean
  /**
   * @property showPassword
   * @type boolean
   * @description 是否显示切换密码图标
   * @default false
   */
  showPassword?: boolean
  /**
   * @property placeholder
   * @type string
   * @description 输入框占位符
   * @default -
   */
  placeholder?: string
  /**
   * @property readonly
   * @type boolean
   * @description 原生`readonly`属性, 是否只读
   * @default false
   */
  readonly?: boolean
  /**
   * @property autocomplete
   * @type string
   * @description 原生`autocomplete`属性
   * @default off
   */
  autocomplete?: string
  /**
   * @property autofocus
   * @type boolean
   * @description 原生`autofocus`属性, 是否自动获取焦点
   * @default false
   */
  autofocus?: boolean
  /**
   * @property form
   * @type string
   * @description 原生`form`属性, 指定输入框所属的表单
   * @default -
   */
  form?: string
}

export interface InputEmits {
  /**
   * @property update:modelValue
   * @description 输入框值改变时触发
   */
  (_e: 'update:modelValue', _value: string): void
  /**
   * @property input
   * @description 在 Input 值改变时触发
   */
  (_e: 'input', _value: string): void
  /**
   * @property change
   * @description 仅当 modelValue 改变时, 当输入框失去焦点或用户按 Enter 时触发
   */
  (_e: 'change', _value: string): void
  /**
   * @property focus
   * @description 输入框获得焦点时触发
   */
  (_e: 'focus', _value: FocusEvent): void
  /**
   * @property blur
   * @description 输入框失去焦点时触发
   */
  (_e: 'blur', _value: FocusEvent): void
  /**
   * @property clear
   * @description 点击清除按钮时触发
   */
  (_e: 'clear'): void
}

export interface InputEvents {
  /**
   * @property update:modelValue
   * @description 输入框值改变时触发
   * @type Function - (value: string)=>void
   */
  (_e: 'update:modelValue', _value: string): void
  /**
   * @property input
   * @description 在 Input 值改变时触发
   * @type Function - (value: string)=>void
   */
  (_e: 'input', _value: string): void
  /**
   * @property change
   * @description 仅当 modelValue 改变时, 当输入框失去焦点或用户按 Enter 时触发
   * @type Function - (value: string)=>void
   */
  (_e: 'change', _value: string): void
  /**
   * @property focus
   * @description 输入框获得焦点时触发
   * @type Function - (event: FocusEvent)=>void
   */
  (_e: 'focus', _value: FocusEvent): void
  /**
   * @property blur
   * @description 输入框失去焦点时触发
   * @type Function - (event: FocusEvent)=>void
   */
  (_e: 'blur', _value: FocusEvent): void
  /**
   * @property clear
   * @description 点击清除按钮时触发
   * @type Function - ()=>void
   */
  (_e: 'clear'): void
}

export interface InputInstance {
  /**
   * @property ref
   * @description 获取原生输入框元素
   */
  ref: Ref<HTMLInputElement | HTMLTextAreaElement | void>
  /**
   * @property focus
   * @description 获取焦点
   */
  focus(): Promise<void>
  /**
   * @property blur
   * @description 失去焦点
   */
  blur(): void
  /**
   * @property select
   * @description 选中输入框内容
   */
  select(): void
  /**
   * @property clear
   * @description 清空输入框内容
   */
  clear(): void
}

export interface InputExpose {
  /**
   * @property ref
   * @type object - Ref<HTMLInputElement | HTMLTextAreaElement | void>
   * @description 获取原生输入框元素
   */
  ref: Ref<HTMLInputElement | HTMLTextAreaElement | void>
  /**
   * @property focus
   * @type Function - ()=>Promise<void>
   * @description 获取焦点
   */
  focus(): Promise<void>
  /**
   * @property blur
   * @type Function - ()=>void
   * @description 失去焦点
   */
  blur(): void
  /**
   * @property select
   * @type Function - ()=>void
   * @description 选中输入框内容
   */
  select(): void
  /**
   * @property clear
   * @type Function - ()=>void
   * @description 清空输入框内容
   */
  clear(): void
}

export interface InputSlots {
  /**
   * @property prefix
   * @description 输入框头部内容
   */
  prefix: () => string
  /**
   * @property suffix
   * @description 输入框尾部内容
   */
  suffix: () => string
  /**
   * @property prepend
   * @description 输入框前置内容
   */
  prepend: () => string
  /**
   * @property append
   * @description 输入框后置内容
   */
  append: () => string
}
