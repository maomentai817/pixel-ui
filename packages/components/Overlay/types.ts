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
  /**
   * @property lockScroll
   * @type boolean
   * @description 是否锁定滚动
   * @default true
   */
  lockScroll?: boolean
  /**
   * @property grid
   * @type boolean
   * @description 网格背景默认
   * @default false
   */
  grid?: boolean
  /**
   * @property matte
   * @type boolean
   * @description 是否开启哑光
   * @default false
   */
  matte?: boolean
  /**
   * @property preset1
   * @type boolean
   * @description 网格背景预设-1
   */
  preset1?: boolean
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
