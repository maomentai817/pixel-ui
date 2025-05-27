import { isVNode, render, h, shallowReactive } from 'vue'
import type {
  CreateMessageProps,
  MessageInstance,
  MessageFn,
  Message,
  MessageParams,
  MessagePropsIn,
  MessageHandler,
  MessageType
} from './types'
import { messageTypes } from './types'
import { useId, useZIndex } from '@pixel-ui/hooks'
import { isString, findIndex, set, each, get } from 'lodash-es'
import MessageConstructor from './Message.vue'

const instances: MessageInstance[] = shallowReactive([])
const { nextZIndex } = useZIndex()

export const messageDefaults = {
  type: 'info',
  duration: 3000,
  offset: 10,
  transitionName: 'fade-up'
}

// normalize options
const normalizedOptions = (opts: MessageParams): CreateMessageProps => {
  const result =
    !opts || isVNode(opts) || isString(opts) ? { message: opts } : opts

  return { ...messageDefaults, ...result } as CreateMessageProps
}

// create message instance
const createMessage = (props: CreateMessageProps): MessageInstance => {
  const id = useId().value
  const container = document.createElement('div')

  // 销毁函数
  const destory = () => {
    const idx = findIndex(instances, { id })
    if (idx !== -1) {
      instances.splice(idx, 1)
      render(null, container)
    }
  }

  // message 实例内部使用的 props
  const _props: MessagePropsIn = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory
  }

  // VNode 渲染
  const vnode = h(MessageConstructor, _props)

  render(vnode, container)

  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!
  // 获取组件实例上暴露的方法
  const handler: MessageHandler = {
    close: () => vm.exposed!.close()
  }

  const instance: MessageInstance = {
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
export function getLastBottomOffset(this: MessagePropsIn) {
  const idx = findIndex(instances, { id: this.id })
  if (idx <= 0) return 0

  return get(instances, [idx - 1, 'vm', 'exposed', 'bottomOffset', 'value'])
}

// 创建消息实例
export const message: MessageFn & Partial<Message> = (options = {}) => {
  const normalized = normalizedOptions(options)
  const instance = createMessage(normalized)

  return instance.handler
}

// 关闭所有 instances
export const closeAll = (type?: MessageType) => {
  each(instances, (instance) => {
    if (type) {
      instance.props.type === type && instance.handler.close()
      return
    }
    instance.handler.close()
  })
}

each(messageTypes, (type) => {
  set(message, type, (opts: MessageParams) => {
    const normalized = normalizedOptions(opts)
    return message({ ...normalized, type })
  })
})

// __proto__ 挂载 closeAll
message.closeAll = closeAll

export default message as Message
