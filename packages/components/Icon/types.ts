export type IconType = 'primary' | 'success' | 'warning' | 'danger' | 'base'

export interface IconProps {
  /**
   * @property flip
   * @description 图标翻转
   */
  flip?: 'horizontal' | 'vertical' | 'both'
  /**
   * @property icon
   * @type string
   * @description 图标名称 - <i class="hn hn-icon-name"></i>
   * @default "-"
   */
  icon: string
  /**
   * @property rotation
   * @description 旋转角度
   */
  rotation?: number | string
  /**
   * @property size
   * @type px
   * @description 图标大小
   * @default "14"
   */
  size?: number | string
  /**
   * @property spin
   * @description 旋转动画
   */
  spin?: boolean
  /**
   * @property bounce
   * @description 跳动动画
   */
  bounce?: boolean
  /**
   * @property shake
   * @description 摇晃动画
   */
  shake?: boolean
  /**
   * @property beat
   * @description 跳动动画
   */
  beat?: boolean
  /**
   * @property type
   * @description 图标类型
   * @default "base"
   */
  type?: IconType
  /**
   * @description 图标颜色
   * @default "#212529"
   */
  color?: string
}
