import type { VNode, Ref, ComponentInternalInstance } from 'vue'

export const notificationTypes = [
  'info',
  'primary',
  'success',
  'warning',
  'danger',
  'sakura',
  'error',
  'iron'
] as const

export type NotificationType = (typeof notificationTypes)[number]

export const notificationPosition = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left'
] as const

export type NotificationPosition = (typeof notificationPosition)[number]

export interface NotificationHandler {
  close(): void
}

export type NotificationFn = {
  (_props: NotificationParams): NotificationHandler
  closeAll(_type?: NotificationType): void
}

export type NotificationTypeFn = (
  _props: NotificationParams
) => NotificationHandler

export interface Notification extends NotificationFn {
  primary: NotificationTypeFn
  sakura: NotificationTypeFn
  success: NotificationTypeFn
  warning: NotificationTypeFn
  info: NotificationTypeFn
  danger: NotificationTypeFn
  error: NotificationTypeFn
  iron: NotificationTypeFn
}

export interface NotificationPropsIn {
  title: string
  id: string
  zIndex: number
  position: NotificationPosition
  type?: NotificationType
  message?: string | VNode
  duration?: number
  showClose?: boolean
  offset?: number
  transitionName?: string
  icon?: string
  onClick?(): void
  onClose?(): void
  onDestory(): void
}

// api-table 文档展示用 props type
export interface NotificationProps {
  /**
   * @property title
   * @type string
   * @description 通知标题
   * @default -
   */
  title: string
  /**
   * @property message
   * @type {string | VNode}
   * @description 通知内容
   * @default -
   */
  message?: string | VNode
  /**
   * @property type
   * @type enum - primary | success | info | warning | danger | error | sakura | iron
   * @description 通知类型
   * @default info
   */
  type?: NotificationType
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
   * @default true
   */
  showClose?: boolean
  /**
   * @property offset
   * @type number
   * @description 距离窗口顶部的位置偏移量
   * @default 20
   */
  offset?: number
  /**
   * @property transitionName
   * @type string
   * @description 过渡动画名称
   * @default fade
   */
  transitionName?: string
  /**
   * @property position
   * @type enum - top-right | top-left | bottom-right | bottom-left
   * @description 通知位置
   * @default top-right
   */
  position: NotificationPosition
  /**
   * @property onClose
   * @type  Function - () => void
   * @description 关闭回调
   * @default -
   */
  onClose?(): void
  /**
   * @property onClick
   * @type  Function - () => void
   * @description 点击回调
   * @default -
   */
  onClick?(): void
}

export type NotificationOptions = Partial<Omit<NotificationPropsIn, 'id'>>
export type NotificationParams = string | VNode | NotificationOptions

export interface NotificationInstance {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  props: NotificationPropsIn
  handler: NotificationHandler
}

export interface NotificationCompInstance {
  close(): void
  bottomOffset: Ref<number>
}

// api-table 文档展示用 comp-instance
export interface NotificationExpose {
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

export type CreateNotificationProps = Omit<
  NotificationPropsIn,
  'onDestory' | 'id' | 'zIndex'
>
