export type IconType = 'primary' | 'success' | 'warning' | 'danger' | 'base'

export interface IconProps {
  /**
   * @property icon
   * @type string
   * @description 图标名称
   * @default -
   */
  icon: string
  /**
   * @property size
   * @type number | string
   * @description 图标大小(px)
   * @default 14px
   */
  size?: number | string
  /**
   * @property type
   * @type enum - primary | success | warning | danger | base
   * @description 图标类型
   * @default base
   */
  type?: IconType
  /**
   * @property color
   * @type string
   * @description 图标颜色
   * @default #212529
   */
  color?: string
  /**
   * @property flip
   * @type enum - horizontal | vertical | both
   * @description 图标翻转
   * @default -
   */
  flip?: 'horizontal' | 'vertical' | 'both'
  /**
   * @property rotation
   * @type number | string
   * @description 旋转角度
   * @default -
   */
  rotation?: number | string
  /**
   * @property spin
   * @type boolean
   * @description 是否启用旋转动画
   * @default false
   */
  spin?: boolean
  /**
   * @property bounce
   * @type boolean
   * @description 是否启用跳动动画
   * @default false
   */
  bounce?: boolean
  /**
   * @property shake
   * @type boolean
   * @description 是否启用摇晃动画
   * @default false
   */
  shake?: boolean
  /**
   * @property beat
   * @type boolean
   * @description 是否启用跳动动画
   * @default false
   */
  beat?: boolean
}
