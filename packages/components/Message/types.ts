import type { Ref, VNode, ComponentInternalInstance } from 'vue'

export const messageTypes = [
  'info',
  'primary',
  'success',
  'warning',
  'danger',
  'sakura',
  'error',
  'iron',
  'stamp'
] as const

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
  primary: MessageTypeFn
  sakura: MessageTypeFn
  success: MessageTypeFn
  warning: MessageTypeFn
  info: MessageTypeFn
  danger: MessageTypeFn
  error: MessageTypeFn
  iron: MessageTypeFn
  stamp: MessageTypeFn
}

export interface MessagePropsIn {
  id: string
  message?: string | VNode | (() => VNode)
  type?: MessageType
  icon?: string
  duration?: number
  showClose?: boolean
  center?: boolean
  offset?: number
  zIndex: number
  transitionName?: string
  onDestory(): void
}
// api-table 文档展示用 props type
export interface MessageProps {
  /**
   * @property message
   * @type {string | VNode | (() => VNode)}
   * @description 消息文字
   * @default ''
   */
  message?: string | VNode | (() => VNode)
  /**
   * @property type
   * @type enum - primary | success | info | warning | danger | error | sakura | iron | stamp
   * @description 消息类型
   * @default info
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
   * @property duration
   * @type number
   * @description 显示时间(ms), 设为0则不会自动关闭
   * @default 3000
   */
  duration?: number
  /**
   * @property showClose
   * @type boolean
   * @description 是否显示关闭按钮
   * @default false
   */
  showClose?: boolean
  /**
   * @property center
   * @type boolean
   * @description 是否居中显示
   * @default false
   */
  center?: boolean
  /**
   * @property offset
   * @type number
   * @description 距离窗口顶部的位置偏移量
   * @default 10
   */
  offset?: number
  /**
   * @property transitionName
   * @type string
   * @description 过渡动画名称
   * @default fade-up
   */
  transitionName?: string
}

export type MessageOptions = Partial<Omit<MessagePropsIn, 'id'>>
export type MessageParams = string | VNode | MessageOptions

export interface MessageInstance {
  id: string
  vnode: VNode
  props: MessagePropsIn
  vm: ComponentInternalInstance
  handler: MessageHandler
}

export interface MessageCompInstance {
  close(): void
  bottomOffset: Ref<number>
}

export interface MessageExpose {
  /**
   * @property close
   * @description 关闭消息
   * @type  Function - () => void
   */
  close(): void
  /**
   * @property bottomOffset
   * @description 消息底部距离视口顶偏移量
   * @type  {Ref<number>}
   */
  bottomOffset: Ref<number>
}

export type CreateMessageProps = Omit<
  MessagePropsIn,
  'onDestory' | 'id' | 'zIndex'
>
