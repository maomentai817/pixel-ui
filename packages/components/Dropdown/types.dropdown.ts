import type { ComputedRef } from 'vue'
import type { ButtonType, ButtonSize } from '../Button'
import type { DropdownCommand, DropdownItemProps } from './types.dropdownItem'
import type { Placement, Options } from '@popperjs/core'

type TriggerType = 'hover' | 'click' | 'contextmenu'
type EffectType = 'dark' | 'light' | 'customized'

export interface DropdownProps {
  /**
   * @property type
   * @type enum - primary | success | warning | danger | base
   * @description 菜单按钮类型
   * @default base
   */
  type?: ButtonType
  /**
   * @property size
   * @type enum - large | default | small | mini
   * @description 菜单按钮尺寸
   * @default default
   */
  size?: ButtonSize
  /**
   * @property items
   * @type {DropdownItemProps[]}
   * @description 菜单项
   * @default []
   */
  items?: DropdownItemProps[]
  /**
   * @property disabled
   * @type {boolean}
   * @description 菜单是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * @property trigger
   * @type enum  - hover | click | contextmenu
   * @description 触发方式
   * @default hover
   */
  trigger?: TriggerType
  /**
   * @property placement
   * @type enum  - top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
   * @description 弹出位置
   * @default bottom
   */
  placement?: Placement
  /**
   * @property hideOnClick
   * @type {boolean}
   * @description 点击菜单项时是否隐藏下拉菜单
   * @default true
   */
  hideOnClick?: boolean
  /**
   * @property splitButton
   * @type {boolean}
   * @description panel触发元素是否为按钮
   * @default false
   */
  splitButton?: boolean
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
   * @default 150
   */
  showTimeout?: number
  /**
   * @property hideTimeout
   * @type number
   * @description 隐藏延时
   * @default 150
   */
  hideTimeout?: number
}

export interface DropdownEmits {
  /**
   * @property visible-change
   * @description 显示隐藏事件
   */
  (_e: 'visible-change', _value: boolean): void
  /**
   * @property command
   * @description 命令事件,点击菜单项时触发
   */
  (_e: 'command', _value: DropdownCommand): void
  /**
   * @property click
   * @description splitButton为true时,点击按钮触发
   */
  (_e: 'click', _value: MouseEvent): void
}

export interface DropdownEvents {
  /**
   * @property visible-change
   * @description 显示隐藏事件
   * @type Function - (visible: boolean) => void
   */
  (_e: 'visible-change', _value: boolean): void
  /**
   * @property command
   * @description 命令事件,点击菜单项时触发
   * @type Function - (command: string | number) => void
   */
  (_e: 'command', _value: DropdownCommand): void
  /**
   * @property click
   * @description splitButton为true时,点击按钮触发
   * @type Function - (e: MouseEvent) => void
   */
  (_e: 'click', _value: MouseEvent): void
}

export interface DropdownInstance {
  /**
   * @property open
   * @description 打开下拉菜单
   */
  open(): void
  /**
   * @property close
   * @description 关闭下拉菜单
   */
  close(): void
}

export interface DropdownExpose {
  /**
   * @property open
   * @description 打开下拉菜单
   * @type Function - () => void
   */
  open(): void
  /**
   * @property close
   * @description 关闭下拉菜单
   * @type Function - () => void
   */
  close(): void
}

export interface DropdownSlots {
  /**
   * @property default
   * @description 默认插槽
   */
  default: () => string
  /**
   * @property dropdown
   * @description 下拉菜单 `SubComponents: PxDropdownItem`
   */
  dropdown: () => string
}

// dropdown 组件传递上下文
export interface DropdownContext {
  handleItemClick(_item: DropdownItemProps): void
  size: ComputedRef<ButtonSize | void>
}
