import { type Ref, type VNode } from 'vue'
import { type MessageType } from '../Message/types'
import { type ButtonType } from '../Button'

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
  showInput?: boolean
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
  roundButton?: boolean

  center?: boolean
  lockScroll?: boolean
  closeOnClickModal?: boolean

  inputPlaceholder?: string
  inputValue?: string
  inputType?: 'text' | 'textarea' | 'password' | 'number'

  buttonSize?: 'default' | 'small' | 'large'
  beforeClose?: (
    _action: MessageBoxAction,
    _instance: MessageBoxOptions,
    _done: () => void
  ) => void
}

export interface MessageBoxProps extends MessageBoxOptions {
  visible?: Ref<boolean>
  doClose(): void
  doAction(_action: MessageBoxAction, _inputVal?: string): void
  destroy(): void
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
