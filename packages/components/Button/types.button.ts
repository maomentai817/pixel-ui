// types.button.ts
import type { Component, Ref, ComputedRef } from 'vue'

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'base'
export type NativeType = 'button' | 'submit' | 'reset'
export type ButtonSize = 'large' | 'default' | 'small'

export interface ButtonProps {
  /**
   * @property size
   * @type enum - large | default | small
   * @description 按钮尺寸
   * @default default
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
   * @type {string | Component}
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

export interface ButtonEmits {
  /**
   * @property click
   * @description 按钮点击事件
   * @type {(event: MouseEvent)=>void}
   */
  (_e: 'click', _val: MouseEvent): void
}
export interface ButtonEvents {
  /**
   * @property click
   * @description 按钮点击事件
   * @type Function - (event: MouseEvent)=>void
   */
  (_e: 'click', _val: MouseEvent): void
}

export interface ButtonSlots {
  /**
   * @property default
   * @description 默认插槽,按钮内容
   */
  default: () => string
  /**
   * @property loading
   * @description 自定义加载图标
   */
  loading: () => string
}

export interface ButtonInstance {
  /**
   * @property ref
   * @type Ref<HTMLButtonElement>
   * @description 获取原生按钮元素
   */
  ref: Ref<HTMLButtonElement | void>
  /**
   * @property size
   * @type ComputedRef<ButtonSize>
   * @description 获取按钮尺寸
   */
  size: ComputedRef<ButtonSize | ''>
  /**
   * @property type
   * @type ComputedRef<ButtonType>
   * @description 获取按钮类型
   */
  type: ComputedRef<ButtonType | ''>
  /**
   * @property disabled
   * @type ComputedRef<boolean>
   * @description 获取按钮是否禁用
   */
  disabled: ComputedRef<boolean>
}

export interface ButtonExpose {
  /**
   * @property ref
   * @type object - Ref<HTMLButtonElement>
   * @description 获取原生按钮元素
   */
  ref: Ref<HTMLButtonElement | void>
  /**
   * @property size
   * @type object - ComputedRef<ButtonSize>
   * @description 获取按钮尺寸
   */
  size: ComputedRef<ButtonSize | ''>
  /**
   * @property type
   * @type object - ComputedRef<ButtonType>
   * @description 获取按钮类型
   */
  type: ComputedRef<ButtonType | ''>
  /**
   * @property disabled
   * @type object - ComputedRef<boolean>
   * @description 获取按钮是否禁用
   */
  disabled: ComputedRef<boolean>
}
