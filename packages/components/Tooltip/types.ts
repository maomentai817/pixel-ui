import type { Placement, Options } from '@popperjs/core'

export type TriggerType = 'hover' | 'click' | 'contextmenu'

export type EffectType = 'dark' | 'light' | 'customized'

export interface TooltipProps {
  /**
   * @property content
   * @type string
   * @description 提示内容, 可被\`slot#content\`覆盖
   * @default -
   */
  content?: string
  /**
   * @property trigger
   * @type enum - hover | click | contextmenu
   * @description 触发方式
   * @default hover
   */
  trigger?: TriggerType
  /**
   * @property placement
   * @type Placement
   * @description 提示出现位置
   * @default bottom
   */
  placement?: Placement
  /**
   * @property manual
   * @type boolean
   * @description 是否启用手动控制
   * @default false
   */
  manual?: boolean
  /**
   * @property disabled
   * @type boolean
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * @property popperOptions
   * @type {Partial<Options>}
   * @description popperjs 配置
   * @default {}
   */
  popperOptions?: Partial<Options>
  /**
   * @property effect
   * @type enum - dark | light | customized
   * @description 主题样式
   * @default light
   */
  effect?: EffectType
  /**
   * @property transition
   * @type string
   * @description 过渡动画
   * @default fade
   */
  transition?: string
  /**
   * @property showTimeout
   * @type number
   * @description 显示延时
   * @default 0
   */
  showTimeout?: number
  /**
   * @property hideTimeout
   * @type number
   * @description 隐藏延时
   * @default 200
   */
  hideTimeout?: number
}

export interface TooltipEmits {
  /**
   * @property visible-change
   * @description popover 可见性改变时触发
   * @type {(val: boolean)=>void}
   */
  (_e: 'visible-change', _value: boolean): void
  /**
   * @property click-outside
   * @description 点击区域外时触发
   * @type {()=>void}
   */
  (_e: 'click-outside'): void
}

export interface TooltipInstance {
  /**
   * @property show
   * @description 显示 popover
   * @type {()=>void}
   */
  show: () => void
  /**
   * @property hide
   * @description 隐藏 popover
   * @type {()=>void}
   */
  hide: () => void
}

export interface TooltipSlots {
  /**
   * @property default
   * @description Tooltip 触发 & 引用的元素
   */
  default: () => string
  /**
   * @property content
   * @description 自定义内容
   */
  content: () => string
}
