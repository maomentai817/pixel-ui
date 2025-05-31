import type {
  CreateNotificationProps,
  Notification,
  NotificationFn,
  NotificationHandler,
  NotificationInstance,
  NotificationParams,
  NotificationPropsIn,
  NotificationType
} from './types'

import { shallowReactive, isVNode, render, h } from 'vue'
import { notificationTypes, notificationPosition } from './types'
import { useId, useZIndex } from '@pixel-ui/hooks'
import { isString, findIndex, set, each, get } from 'lodash-es'

import NotificationConstructor from './Notification.vue'

const instancesMap: Map<
  NotificationPropsIn['position'],
  NotificationInstance[]
> = new Map()

each(notificationPosition, (position) => {
  instancesMap.set(position, shallowReactive([]))
})

const { nextZIndex } = useZIndex()

export const notificationDefaults = {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade',
  showClose: true
} as const

// normalize options
const normalizedOptions = (
  opts: NotificationParams
): CreateNotificationProps => {
  const result =
    !opts || isVNode(opts) || isString(opts) ? { message: opts } : opts
  return { ...notificationDefaults, ...result } as CreateNotificationProps
}

// 获取指定位置的实例
const getInstancesByPosition = (
  position: NotificationPropsIn['position']
): NotificationInstance[] => instancesMap.get(position)!

// create notification instance
const createNotification = (
  props: CreateNotificationProps
): NotificationInstance => {
  const id = useId().value
  const container = document.createElement('div')
  const instances = getInstancesByPosition(props.position || 'top-right')

  // 销毁函数
  const destory = () => {
    const idx = findIndex(instances, { id })
    if (idx === -1) return

    instances.splice(idx, 1)
    render(null, container)
  }

  // notification 实例内部使用的 props
  const _props: NotificationPropsIn = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory
  }

  // VNode 渲染
  const vnode = h(NotificationConstructor, _props)

  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!
  // 获取组件实例上暴露的方法
  const handler: NotificationHandler = {
    close: () => vm.exposed!.close()
  }
  const instance: NotificationInstance = {
    props: _props,
    id,
    vm,
    vnode,
    handler
  }
  instances.push(instance)
  return instance
}

// 获取最后一个 message 的偏移量
// eslint-disable-next-line
export function getLastBottomOffset(this: NotificationPropsIn) {
  const instances = getInstancesByPosition(this.position || 'top-right')
  const idx = findIndex(instances, { id: this.id })

  if (idx <= 0) return 0

  return get(instances, [idx - 1, 'vm', 'exposed', 'bottomOffset', 'value'])
}

// 创建通知实例
export const notification: NotificationFn & Partial<Notification> = function (
  options = {}
) {
  const normalized = normalizedOptions(options)
  const instance = createNotification(normalized)

  return instance.handler
}

// 关闭所有通知
export const closeAll = (type?: NotificationType) => {
  instancesMap.forEach((instances) => {
    each(instances, (instance) => {
      if (type) {
        instance.props.type === type && instance.handler.close()
        return
      }
      instance.handler.close()
    })
  })
}

each(notificationTypes, (type) => {
  set(notification, type, (opts: NotificationParams) => {
    const normalized = normalizedOptions(opts)
    return notification({ ...normalized, type })
  })
})

// 添加 closeAll 方法
notification.closeAll = closeAll

export default notification as Notification
