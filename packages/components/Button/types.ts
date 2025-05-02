import type { Component, Ref, ComputedRef } from 'vue'

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'base'
export type NativeType = 'button' | 'submit' | 'reset'
export type ButtonSize = 'large' | 'default' | 'small'

export interface ButtonProps {
  /**
   * @property size
   * @type enum - large | default | small
   * @description 按钮尺寸
   * @default -
   */
  size?: ButtonSize
  /**
   * @property type
   * @type enum - primary | success | warning | danger | base
   * @description 按钮类型
   * @default base
   */
  type?: ButtonType
  /**
   * @property plain
   * @type boolean
   * @description 是否为朴素按钮
   * @default false
   */
  plain?: boolean
  /**
   * @property round
   * @type boolean
   * @description 是否为圆角按钮
   * @default false
   */
  round?: boolean
  /**
   * @property circle
   * @type boolean
   * @description 是否为圆形按钮
   * @default false
   */
  circle?: boolean
  /**
   * @property loading
   * @type boolean
   * @description 是否为加载中状态
   * @default false
   */
  loading?: boolean
  /**
   * @property loadingIcon
   * @type string
   * @description 自定义加载中状态图标组件
   * @default -
   */
  loadingIcon?: string
  /**
   * @property disabled
   * @type boolean
   * @description 是否禁用按钮
   * @default false
   */
  disabled?: boolean
  /**
   * @property icon
   * @type string
   * @description 按钮图标
   * @default -
   */
  icon?: string
  /**
   * @property autofocus
   * @type boolean
   * @description 自动聚焦(原生`autofocus`属性)
   * @default false
   */
  autofocus?: boolean
  /**
   * @property nativeType
   * @type enum - button | submit | reset
   * @description 原生 type 属性
   * @default button
   */
  nativeType?: NativeType
  /**
   * @property label
   * @type string
   * @description 按钮文字(优先级低于插槽)
   */
  label?: string
  /**
   * @property tag
   * @type string | Component
   * @description 自定义元素标签
   * @default button
   */
  tag?: string | Component
  /**
   * @property useThrottle
   * @type boolean
   * @description 是否开启节流
   * @default false
   */
  useThrottle?: boolean
  /**
   * @property throttleDuration
   * @type number
   * @description 节流时间间隔(ms)
   * @default 500
   */
  throttleDuration?: number
  /**
   * @property color
   * @type string
   * @description 自定义颜色
   * @default -
   */
  color?: string
}

export interface ButtonGroupProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  round?: boolean
  circle?: boolean
  color?: string
}

// 上下文依赖注入
export interface ButtonGroupContext {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  round?: boolean
  circle?: boolean
  color?: string
}

export interface ButtonEmits {
  (_e: 'click', _val: MouseEvent): void
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>
  disabled: ComputedRef<boolean>
  size: ComputedRef<ButtonSize | ''>
  type: ComputedRef<ButtonType | ''>
}
