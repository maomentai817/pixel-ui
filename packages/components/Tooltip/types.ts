import type { Placement, Options } from '@popperjs/core'

export type TriggerType = 'hover' | 'click' | 'contextmenu'

export type EffectType = 'dark' | 'light' | 'customized'

export interface TooltipProps {
  /**
   * @property {string} content
   * @default ''
   * @description 提示内容
   */
  content?: string
  /**
   * @property {TriggerType} trigger
   * @default 'hover'
   * @description 触发方式
   */
  trigger?: TriggerType
  /**
   * @property {Placement} placement
   * @default 'bottom'
   * @description 提示位置
   */
  placement?: Placement
  /**
   * @property {boolean} manual
   * @default false
   * @description 手动控制
   */
  manual?: boolean
  /**
   * @property {boolean} disabled
   * @default false
   * @description 是否禁用
   */
  disabled?: boolean
  /**
   * @property {Partial<Options>} popperOptions
   * @default {}
   * @description popperjs 配置
   */
  popperOptions?: Partial<Options>
  /**
   * @property {string} transition
   * @default 'fade'
   * @description 过渡动画
   */
  transition?: string
  /**
   * @property {number} showTimeout
   * @default 0
   * @description 显示延时
   */
  showTimeout?: number
  /**
   * @property {number} hideTimeout
   * @default 200
   * @description 隐藏延时
   */
  hideTimeout?: number
  /**
   * @property {EffectType} effect
   * @default 'light'
   * @description 提示样式
   */
  effect?: EffectType
}

export interface TooltipEmits {
  (_e: 'visible-change', _value: boolean): void
  (_e: 'click-outside'): void
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}
