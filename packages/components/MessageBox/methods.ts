import { createVNode, isVNode, ref, render, nextTick } from 'vue'
import {
  isString,
  isFunction,
  each,
  set,
  isObject,
  isUndefined,
  assign
} from 'lodash-es'

import type {
  MessageBoxAction,
  MessageBoxOptions,
  MessageBoxData,
  MessageBoxCallback,
  MessageBoxPropsIn,
  IPxMessageBox
} from './types'
import type { ComponentPublicInstance, VNode, VNodeProps, Ref } from 'vue'

// SFC component 作为构造器
import MessageBoxConstructor from './MessageBox.vue'

// 映射
const messageInstanceMap = new Map<
  ComponentPublicInstance<{ doClose: () => void }>,
  {
    options: MessageBoxOptions
    callback: MessageBoxCallback | void
    resolve: (_res: any) => void
    reject: (_res: any) => void
  }
>()

// instance 初始化
const initInstance = (props: MessageBoxPropsIn, container: HTMLElement) => {
  const visible = ref(false)
  const isVNodeMsg = isFunction(props?.message) || isVNode(props?.message)

  const getDefaultSlot = (msg: VNode | (() => VNode)) =>
    isFunction(msg) ? msg : () => msg

  const vnode = createVNode(
    MessageBoxConstructor,
    {
      ...props,
      visible
    } as VNodeProps,
    isVNodeMsg ? { default: getDefaultSlot(props.message as VNode) } : void 0
  )

  // 渲染虚拟节点
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)
  return vnode.component
}

// create messageBox instance
const createMessageBox = (options: MessageBoxOptions) => {
  const container = document.createElement('div')

  // messageBox 实例内部使用的 props
  const _props: MessageBoxPropsIn = {
    ...options,
    doClose: () => {
      vm.visible.value = false
    },
    doAction: (action: MessageBoxAction, inputValue: string) => {
      const currentMsg = messageInstanceMap.get(vm)
      let resolve:
        | MessageBoxAction
        | { value: string; action: MessageBoxAction }

      nextTick(() => vm.doClose())

      // 输入框 promise
      if (options.showInput) {
        resolve = { value: inputValue, action }
      } else {
        resolve = action
      }

      if (options.callback) {
        options.callback(resolve)
        return
      }

      if (action === 'cancel' || action === 'close') {
        currentMsg?.reject(action)
        return
      }
      currentMsg?.resolve(resolve)
    },
    destroy: () => {
      render(null, container)
      messageInstanceMap.delete(vm)
    }
  }

  // 创建 messageBox instance
  const instance = initInstance(_props as MessageBoxPropsIn, container)
  const vm = instance?.proxy as ComponentPublicInstance<{
    doClose: () => void
    visible: Ref<boolean>
  }>

  vm.visible.value = true
  return vm
}

// 创建实例 函数重载
async function MessageBox(_options: MessageBoxOptions): Promise<MessageBoxData>
function MessageBox(options: MessageBoxOptions | string | VNode): Promise<any> {
  let callback: MessageBoxCallback | void
  if (isString(options) || isVNode(options)) {
    options = {
      message: options
    }
  } else {
    callback = options.callback
  }

  return new Promise((resolve, reject) => {
    const instance = createMessageBox(options)
    messageInstanceMap.set(instance, { options, callback, resolve, reject })
  })
}

const MESSAGE_BOX_VARIANTS = ['alert', 'confirm', 'prompt'] as const
const MESSAGE_BOX_DEFAULT_OPTS: Record<
  (typeof MESSAGE_BOX_VARIANTS)[number],
  Partial<MessageBoxOptions>
> = {
  alert: { closeOnClickModal: false },
  confirm: { showCancelButton: true },
  prompt: { showCancelButton: true, showInput: true }
}

// 抽象工厂
const messageBoxFactory = (boxType: (typeof MESSAGE_BOX_VARIANTS)[number]) => {
  return (
    message: string | VNode,
    title: string | MessageBoxOptions,
    options: MessageBoxOptions
  ) => {
    let titleOrOpts = ''
    if (isObject(title)) {
      options = title as MessageBoxOptions
      titleOrOpts = ''
    } else if (isUndefined(title)) {
      titleOrOpts = ''
    } else {
      titleOrOpts = title as string
    }

    return MessageBox(
      assign(
        {
          title: titleOrOpts,
          message,
          type: '',
          boxType,
          ...MESSAGE_BOX_DEFAULT_OPTS[boxType]
        },
        options
      )
    )
  }
}

each(MESSAGE_BOX_VARIANTS, (type) =>
  set(MessageBox, type, messageBoxFactory(type))
)

// 挂载 close 方法
set(MessageBox, 'close', () => {
  messageInstanceMap.forEach((_, vm) => {
    vm.doClose()
  })
  messageInstanceMap.clear()
})

export default MessageBox as IPxMessageBox
