export interface OverlayProps {
  /**
   * @property mask
   * @type boolean
   * @description 是否显示遮罩层
   * @default true
   */
  mask?: boolean
  /**
   * @property zIndex
   * @type number
   * @description 层级
   * @default 2000
   */
  zIndex?: number
  /**
   * @property overlayClass
   * @type {string | string[] | Record<string, boolean>}
   * @description 遮罩层类
   * @default -
   */
  overlayClass?: string | string[] | Record<string, boolean>
}

export interface OverlayEmits {
  /**
   * @property click
   * @description 点击事件
   */
  (_e: 'click', _value: MouseEvent): void
}

export interface OverlayEvents {
  /**
   * @property click
   * @description 点击事件
   * @type Function - (e: MouseEvent) => void
   */
  (_e: 'click', _value: MouseEvent): void
}
