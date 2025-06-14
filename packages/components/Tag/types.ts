export const tagTypes = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
  'sakura'
] as const
export type TagType = (typeof tagTypes)[number]

export const tagSizes = ['large', 'default', 'small'] as const
export type TagSize = (typeof tagSizes)[number]

export const tagEffects = ['light', 'dark', 'plain'] as const
export type TagEffect = (typeof tagEffects)[number]

export interface TagProps {
  /**
   * @property size
   * @type enum - large | default | small
   * @description Tag 的尺寸
   * @default default
   */
  size?: TagSize
  /**
   * @property type
   * @type enum - primary | success | warning | danger | info | sakura
   * @description Tag 的类型
   * @default primary
   */
  type?: TagType
  /**
   * @property closable
   * @type boolean
   * @description 是否可关闭
   * @default false
   */
  closable?: boolean
  /**
   * @property color
   * @type string
   * @description 自定义颜色
   * @default -
   */
  color?: string
  /**
   * @property effect
   * @type enum - light | dark | plain
   * @description Tag 的主题
   * @default filled
   */
  effect?: TagEffect
  /**
   * @property disabled
   * @type boolean
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * @property round
   * @type boolean
   * @description 是否圆角
   * @default false
   */
  round?: boolean
  /**
   * @property circle
   * @type boolean
   * @description 是否圆型
   * @default false
   */
  circle?: boolean
  /**
   * @property chubby
   * @type boolean
   * @description 更圆的圆角
   * @default false
   */
  chubby?: boolean
}

export interface TagEmits {
  /**
   * @property close
   * @description Close event
   */
  (_e: 'close'): void
  /**
   * @property click
   * @description Click event
   */
  (_e: 'click', _val: MouseEvent): void
}

export interface TagEvents {
  /**
   * @property close
   * @description Close event
   * @type Function - ()=>void
   */
  (_e: 'close'): void
  /**
   * @property click
   * @description Click event
   * @type Function - (event: MouseEvent)=>void
   */
  (_e: 'click', _val: MouseEvent): void
}

export interface TagSlots {
  /**
   * @property default
   * @description 默认插槽
   */
  default: () => string
}
