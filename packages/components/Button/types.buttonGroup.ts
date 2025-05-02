// types.buttonGroup.ts
import type { ButtonSize, ButtonType } from './types.button'

export interface ButtonGroupProps {
  /**
   * @property size
   * @type enum - large | default | small
   * @description 按钮组尺寸
   * @default default
   */
  size?: ButtonSize
  /**
   * @property type
   * @type enum - primary | success | warning | danger | base
   * @description 按钮组类型
   * @default base
   */
  type?: ButtonType
  /**
   * @property disabled
   * @type boolean
   * @description 按钮组是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * @property round
   * @type boolean
   * @description 按钮组是否为圆角
   * @default false
   */
  round?: boolean
  /**
   * @property circle
   * @type boolean
   * @description 按钮组是否为圆形
   * @default false
   */
  circle?: boolean
  /**
   * @property color
   * @type string
   * @description 自定义颜色
   * @default -
   */
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
