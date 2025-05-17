export type TagType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'sakura'

export type TagSize = 'large' | 'default' | 'small'

export type TagEffect = 'plain' | 'filled'

export interface TagProps {
  /**
   * @property size
   * @type enum - large | default | small
   * @description Tag size
   * @default default
   */
  size?: TagSize
  /**
   * @property type
   * @type enum - primary | success | warning | danger | info | sakura
   * @description Tag type
   * @default primary
   */
  type?: TagType
  /**
   * @property closable
   * @type boolean
   * @description Whether the tag can be closed
   * @default false
   */
  closable?: boolean
  /**
   * @property color
   * @type string
   * @description Custom color
   * @default -
   */
  color?: string
  /**
   * @property effect
   * @type enum - plain | filled
   * @description Tag effect
   * @default filled
   */
  effect?: TagEffect
  /**
   * @property disabled
   * @type boolean
   * @description Whether the tag is disabled
   * @default false
   */
  disabled?: boolean
}

export interface TagEmits {
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
   * @description Default slot, used to set tag content
   */
  default: () => string
}
