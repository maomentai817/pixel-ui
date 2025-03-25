import type { Component, Ref } from 'vue'

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'base'
export type NativeType = 'button' | 'submit' | 'reset'
export type ButtonSize = 'large' | 'default' | 'small'

export interface ButtonProps { 
  label?: string
  /**
   * @property tag
   * @type string | Component
   * @description 自定义元素标签
   * @default 'button'
   */
  tag?: string | Component
  /**
   * @property type
   * @type ButtonType
   * @description 按钮类型
   * @default 'base'
   */
  type?: ButtonType
  /**
   * @property size
   * @type ButtonSize
   * @description 按钮尺寸
   * @default '-'
   */
  size?: ButtonSize
  /**
   * @property nativeType
   * @type 'button' | 'submit' | 'reset'
   * @description 原生 type 属性
   * @default 'button'
   */
  nativeType?: NativeType
  /**
   * @property disabled
   * @type boolean
   * @description 是否禁用按钮
   * @default false
   */
  disabled?: boolean
  /**
   * @property loading
   * @type boolean
   * @description 是否加载中
   * @default false
   */
  loading?: boolean
  /**
   * @description 图标
   * @default '-'
   */
  icon?: string
  /**
   * @property circle
   * @type boolean
   * @description 是否为圆形按钮
   * @default false
   */
  circle?: boolean
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
   * @property loadingIcon
   * @type string
   * @description 自定义加载中状态图标组件
   * @default '-'
   */
  loadingIcon?: string
  /**
   * @description 自动聚焦(原生`autofocus`属性)
   */
  autofocus?: boolean
  /**
   * @description 是否开启节流
   * @default false
   */
  useThrottle?: boolean
  /**
   * @description 节流时间间隔(ms)
   * @default 500
   */
  throttleDuration?: number
  /**
   * @description 自定义颜色
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
  (e: 'click', val: MouseEvent): void
}

export interface ButtonInstance { 
  ref: Ref<HTMLButtonElement | void>
}