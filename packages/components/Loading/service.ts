import { ref, reactive, createApp, nextTick } from 'vue'
import { defer, delay, isNil, isString } from 'lodash-es'
import { useZIndex } from '@pixel-ui/hooks'
import type { LoadingOptions, LoadingOptionsResolved } from './types'

import LoadingConstructor from './Loading.vue'

// 字面量
const RELATIVE_CLASS = 'px-loading-parent--relative' as const
const HIDDEN_CLASS = 'px-loading-parent--hiden' as const
const LOADING_COUNT_KEY = 'px-loading-count' as const

// Loading 实例映射表
const instanceMap: Map<HTMLElement, LoadingInstance> = new Map()
const { nextZIndex } = useZIndex(3000)

// create loading instance
const createLoading = (opts: LoadingOptionsResolved) => {
  const visible = ref(opts.visible)
  const afterLeaveFlag = ref(false)
  const handleAfterLeave = () => {
    if (!afterLeaveFlag.value) return
    destory()
  }

  const _props = reactive({
    ...opts,
    onAfterLeave: handleAfterLeave
  })

  const setText = (text: string) => (_props.text = text)

  // 实例的销毁
  const destory = () => {
    const target = _props.parent!
    subLoadingCount(target)

    // 同一节点下多次触发, 不为 0 不做销毁
    if (getLoadingCount(target)) return

    delay(() => {
      removeRelativeClass(target)
      removeHiddenClass(target)
    }, 1)

    // 节点 dom 及映射的销毁卸载
    // instanceMap.delete(target ?? document.body)
    instanceMap.delete(target)
    vm.$el?.parentNode?.removeChild(vm.$el)
    app.unmount()
  }

  let afterLeaveTimer: number

  // 关闭的回调, 优先判断 beforeClose 及其返回值
  const close = () => {
    // 触发关闭前的回调, 返回 false 则不关闭
    if (opts.beforeClose && !opts.beforeClose()) return

    afterLeaveFlag.value = true
    clearTimeout(afterLeaveTimer)
    afterLeaveTimer = defer(handleAfterLeave)

    visible.value = false
    opts.closed?.()
  }

  const app = createApp(LoadingConstructor, {
    ..._props,
    zIndex: _props.fullscreen ? nextZIndex() : void 0,
    visible
  })

  const vm = app.mount(document.createElement('div'))

  return {
    get $el(): HTMLElement {
      return vm.$el
    },
    vm,
    visible,
    close,
    setText
  }
}

// resolved options 内部使用的 props
const resolveOptions = (opts: LoadingOptions): LoadingOptionsResolved => {
  let target: HTMLElement
  if (isString(opts.target))
    target = document.querySelector(opts.target) ?? document.body
  else target = opts.target || document.body

  return {
    parent: target === document.body || opts.body ? document.body : target,
    target: target,
    fullscreen: target === document.body && (opts.fullscreen ?? true),
    lock: opts.lock ?? false,
    text: opts.text,
    spinner: opts.spinner,
    background: opts.background ?? 'rgba(0, 0, 0, .5)',
    customClass: opts.customClass || '',
    visible: opts.visible ?? true,
    grid: opts.grid ?? false,
    matte: opts.matte ?? false,
    preset1: opts.preset1 ?? false,
    beforeClose: opts.beforeClose,
    closed: opts.closed
  }
}

//* Loading parent node class controler
const addRelativeClass = (target: HTMLElement = document.body) => {
  target.classList.add(RELATIVE_CLASS)
}
const removeRelativeClass = (target: HTMLElement = document.body) => {
  target.classList.remove(RELATIVE_CLASS)
}
const addHiddenClass = (target: HTMLElement = document.body) => {
  target.classList.add(HIDDEN_CLASS)
}
const removeHiddenClass = (target: HTMLElement = document.body) => {
  target.classList.remove(HIDDEN_CLASS)
}

//* 计数器, 在一个 target 下多次调用, 只存在一个 Loading
const getLoadingCount = (target: HTMLElement = document.body) => {
  return target.getAttribute(LOADING_COUNT_KEY)
}
const removeLoadingCount = (target: HTMLElement = document.body) => {
  target.removeAttribute(LOADING_COUNT_KEY)
}
const addLoadingCount = (target: HTMLElement = document.body) => {
  const count = getLoadingCount(target) ?? '0'
  target.setAttribute(LOADING_COUNT_KEY, `${Number.parseInt(count) + 1}`)
}
const subLoadingCount = (target: HTMLElement = document.body) => {
  const count = getLoadingCount(target)
  count && Number.parseInt(count) - 1 > 0
    ? target.setAttribute(LOADING_COUNT_KEY, `${Number.parseInt(count) - 1}`)
    : removeLoadingCount(target)
}

const addClass = (
  options: LoadingOptions,
  parent: HTMLElement = document.body
) => {
  options.lock ? addHiddenClass(parent) : removeHiddenClass(parent)

  addRelativeClass(parent)
}

// 全屏单例模式
let fullscreenInstance: LoadingInstance | null = null
export type LoadingInstance = ReturnType<typeof createLoading>

// 创建 Loading 实例
export const Loading = (options: LoadingOptions = {}): LoadingInstance => {
  const resolved = resolveOptions(options)
  // const target = resolved.parent ?? document.body
  const target = resolved.parent!

  // 全屏单例模式
  if (resolved.fullscreen && !isNil(fullscreenInstance))
    return fullscreenInstance

  // 添加 loading 计数, 为 0 销毁实例
  addLoadingCount(resolved?.parent)

  if (instanceMap.has(target)) return instanceMap.get(target)!

  // 创建实例
  const instance = createLoading({
    ...resolved,
    closed: () => {
      resolved.closed?.()

      if (resolved.fullscreen) {
        fullscreenInstance = null
      }
    }
  })

  // 添加类
  addClass(options, resolved?.parent)

  resolved.parent?.appendChild(instance.$el)

  nextTick(() => (instance.visible.value = !!resolved.visible))

  // 全屏 分配实例
  if (resolved.fullscreen) fullscreenInstance = instance

  instanceMap.set(target, instance)
  return instance
}

export default Loading
