import { type Ref, type VNode } from 'vue'
import { type MessageType } from '../Message'
import { type ButtonType, type ButtonSize } from '../Button'

export const messageBoxActions = ['confirm', 'cancel', 'close'] as const
export type MessageBoxAction = (typeof messageBoxActions)[number]

export const messageBoxTypes = ['', 'prompt', 'alert', 'confirm'] as const
export type MessageBoxType = (typeof messageBoxTypes)[number]

// 回调
export type MessageBoxCallback = (
  _action: MessageBoxAction | { value: string; action: MessageBoxAction }
) => void

// 输入框数据
export type MessageBoxInputData = {
  value: string
  action: MessageBoxAction
}

export type MessageBoxData = MessageBoxInputData & MessageBoxAction

export interface MessageBoxOptions {
  title?: string
  message?: string | VNode | (() => VNode)
  type?: MessageType
  boxType?: MessageBoxType
  icon?: string
  callback?: MessageBoxCallback
  showClose?: boolean
  beforeClose?: (
    _action: MessageBoxAction,
    _instance: MessageBoxOptions,
    _done: () => void
  ) => void
  lockScroll?: boolean

  showCancelButton?: boolean
  showConfirmButton?: boolean
  cancelButtonText?: string
  confirmButtonText?: string
  cancelButtonLoading?: boolean
  confirmButtonLoading?: boolean
  cancelButtonDisabled?: boolean
  confirmButtonDisabled?: boolean
  cancelButtonType?: ButtonType
  confirmButtonType?: ButtonType
  buttonSize?: ButtonSize
  roundButton?: boolean

  showInput?: boolean
  inputPlaceholder?: string
  inputValue?: string
  inputType?: 'text' | 'textarea' | 'password' | 'number'

  center?: boolean
  closeOnClickModal?: boolean
}

export interface MessageBoxPropsIn extends MessageBoxOptions {
  visible?: Ref<boolean>
  doClose(): void
  doAction(_action: MessageBoxAction, _inputVal?: string): void
  destroy(): void
}

// api-table 文档展示用 props type
export interface MessageBoxProps {
  /**
   * @property title
   * @type string
   * @description MessageBox 标题
   * @default -
   */
  title?: string
  /**
   * @property message
   * @type {string | VNode | (() => VNode)}
   * @description MessageBox 正文内容
   * @default -
   */
  message?: string | VNode | (() => VNode)
  /**
   * @property type
   * @type enum - primary | success | info | warning | danger | error | sakura | iron | stamp
   * @description MessageBox 类型, 用于图标显示
   * @default -
   */
  type?: MessageType
  /**
   * @property icon
   * @type string
   * @description 自定义图标
   * @default -
   */
  icon?: string
  /**
   * @property callback
   * @type Function - (value: string, action: Action) => any | (action: Action) => any
   * @description 若不使用 Promise, 可以使用此参数指定 MessageBox 关闭后的回调
   * @default null
   */
  callback?: MessageBoxCallback
  /**
   * @property showClose
   * @type boolean
   * @description 是否显示关闭按钮
   * @default true
   */
  showClose?: boolean
  /**
   * @property beforeClose
   * @type Function - (action: Action, instance: MessageBoxState, done: () => void) => void
   * @description MessageBox 关闭前的回调, 会暂停消息弹出框的关闭过程
   * @default null
   */
  beforeClose?: (
    _action: MessageBoxAction,
    _instance: MessageBoxOptions,
    _done: () => void
  ) => void
  /**
   * @property lockScroll
   * @type boolean
   * @description 是否在 MessageBox 弹出后锁定背景滚动
   * @default true
   */
  lockScroll?: boolean
  /**
   * @property showCancelButton
   * @type boolean
   * @description 是否显示取消按钮
   * @default false
   */
  showCancelButton?: boolean
  /**
   * @property showConfirmButton
   * @type boolean
   * @description 是否显示确认按钮
   * @default true
   */
  showConfirmButton?: boolean
  /**
   * @property cancelButtonText
   * @type string
   * @description 取消按钮的文本内容
   * @default 取消
   */
  cancelButtonText?: string
  /**
   * @property confirmButtonText
   * @type string
   * @description 确认按钮的文本内容
   * @default 确定
   */
  confirmButtonText?: string
  /**
   * @property cancelButtonLoading
   * @type boolean
   * @description 是否显示取消按钮的加载状态
   * @default false
   */
  cancelButtonLoading?: boolean
  /**
   * @property confirmButtonLoading
   * @type boolean
   * @description 是否显示确认按钮的加载状态
   * @default false
   */
  confirmButtonLoading?: boolean
  /**
   * @property cancelButtonDisabled
   * @type boolean
   * @description 是否禁用取消按钮
   * @default false
   */
  cancelButtonDisabled?: boolean
  /**
   * @property confirmButtonDisabled
   * @type boolean
   * @description 是否禁用确认按钮
   * @default false
   */
  confirmButtonDisabled?: boolean
  /**
   * @property cancelButtonType
   * @type enum - primary | success | warning | danger | base | sakura
   * @description 取消按钮类型
   * @default -
   */
  cancelButtonType?: ButtonType
  /**
   * @property confirmButtonType
   * @type enum - primary | success | warning | danger | base | sakura
   * @description 确认按钮类型
   * @default primary
   */
  confirmButtonType?: ButtonType
  /**
   * @property buttonSize
   * @type enum - large | default | small
   * @description 自定义确认按钮及取消按钮的大小
   * @default default
   */
  buttonSize?: ButtonSize
  /**
   * @property roundButton
   * @type boolean
   * @description 是否使用圆角按钮
   * @default false
   */
  roundButton?: boolean
  /**
   * @property showInput
   * @type boolean
   * @description 是否显示输入框
   * @default false
   */
  showInput?: boolean
  /**
   * @property inputPlaceholder
   * @type string
   * @description 输入框占位文本
   * @default -
   */
  inputPlaceholder?: string
  /**
   * @property inputValue
   * @type string
   * @description 输入框初始值
   * @default -
   */
  inputValue?: string
  /**
   * @property inputType
   * @type string
   * @description 输入框类型
   * @default text
   */
  inputType?: 'text' | 'textarea' | 'password' | 'number'
  /**
   * @property center
   * @type boolean
   * @description 是否居中布局
   * @default false
   */
  center?: boolean
  /**
   * @property closeOnClickModal
   * @type boolean
   * @description 是否可通过点击遮罩层关闭 MessageBox
   * @default true
   */
  closeOnClickModal?: boolean
}

export type MessageBoxShortcutMethod = ((
  _message: MessageBoxOptions['message'],
  _title: MessageBoxOptions['title'],
  _options?: MessageBoxOptions
) => Promise<MessageBoxData>) &
  ((
    _message: MessageBoxOptions['message'],
    _options?: MessageBoxOptions
  ) => Promise<MessageBoxData>)

export interface IErMessageBox {
  (_options: MessageBoxOptions | string | VNode): Promise<any>

  alert: MessageBoxShortcutMethod
  confirm: MessageBoxShortcutMethod
  prompt: MessageBoxShortcutMethod
  close(): void
}
