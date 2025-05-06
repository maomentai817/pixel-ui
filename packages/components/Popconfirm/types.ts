import type { ButtonType } from '../Button'

export interface PopconfirmProps {
  /**
   * @property title
   * @type string
   * @description 确认框标题
   * @default -
   */
  title: string
  /**
   * @property confirmButtonText
   * @type string
   * @description 确认按钮文字
   * @default Yes
   */
  confirmButtonText?: string
  /**
   * @property cancelButtonText
   * @type string
   * @description 取消按钮文字
   * @default No
   */
  cancelButtonText?: string
  /**
   * @property confirmButtonType
   * @type enum - primary | success | warning | danger | base
   * @description 确认按钮类型
   * @default primary
   */
  confirmButtonType?: ButtonType
  /**
   * @property cancelButtonType
   * @type enum - primary | success | warning | danger | base
   * @description 取消按钮类型
   * @default -
   */
  cancelButtonType?: ButtonType
  /**
   * @property icon
   * @type string
   * @description 自定义图标
   * @default question-solid
   */
  icon?: string
  /**
   * @property iconColor
   * @type string
   * @description 图标颜色
   * @default #f90
   */
  iconColor?: string
  /**
   * @property hideIcon
   * @type boolean
   * @description 是否隐藏图标
   * @default false
   */
  hideIcon?: boolean
  /**
   * @property hideAfter
   * @type number
   * @description 关闭延时
   * @default 200
   */
  hideAfter?: number
  /**
   * @property width
   * @type {number | string}
   * @description 弹层宽度,最小宽度150px
   * @default 150
   */
  width?: number | string
}

export interface PopconfirmEmits {
  /**
   * @property confirm
   * @description 点击确认按钮时触发
   */
  (_e: 'confirm', _val: MouseEvent): void
  /**
   * @property cancel
   * @description 点击取消按钮时触发
   */
  (_e: 'cancel', _val: MouseEvent): void
}

export interface PopconfirmEvents {
  /**
   * @property confirm
   * @description 点击确认按钮时触发
   * @type Function - (val: MouseEvent)=>void
   */
  (_e: 'confirm', _val: MouseEvent): void
  /**
   * @property cancel
   * @description 点击取消按钮时触发
   * @type Function - (val: MouseEvent)=>void
   */
  (_e: 'cancel', _val: MouseEvent): void
}

export interface PopconfirmSlots {
  /**
   * @property default
   * @description 默认插槽,触发Popconfirm显示的HTML元素
   */
  default: () => string
  /**
   * @property reference
   * @description 同上, default插槽别名
   */
  reference: () => string
}
