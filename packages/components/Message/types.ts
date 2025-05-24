import type { Ref, VNode, ComponentInternalInstance } from 'vue'

export const messageTypes = ['info', 'success', 'warning', 'danger'] as const

export type MessageType = (typeof messageTypes)[number]

export interface MessageHandler {
  close: () => void
}

export type MessageFn = {
  (_props: MessageParams): MessageHandler
  closeAll: (_type?: MessageType) => void
}

export type MessageTypeFn = (_props: MessageParams) => MessageHandler

export interface Message extends MessageFn {
  success: MessageTypeFn
  warning: MessageTypeFn
  info: MessageTypeFn
  danger: MessageTypeFn
}

export interface MessageProps {
  id: string
  message?: string | VNode | (() => VNode)
  duration?: number
  showClose?: boolean
  center?: boolean
  type?: MessageType
  offset?: number
  zIndex: number
  transitionName?: string
  onDestory(): void
}

export type MessageOptions = Partial<Omit<MessageProps, 'id'>>
export type MessageParams = string | VNode | MessageOptions

export interface MessageInstance {
  id: string
  vnode: VNode
  props: MessageProps
  vm: ComponentInternalInstance
  handler: MessageHandler
}

export interface MessageCompInstance {
  close(): void
  bottomOffset: Ref<number>
}

export type CreateMessageProps = Omit<
  MessageProps,
  'onDestory' | 'id' | 'zIndex'
>
