import { Loading, type LoadingInstance } from './service'
import type { LoadingOptions } from './types'
import type { Directive, DirectiveBinding, MaybeRef } from 'vue'

export const INSTANCE_KEY = Symbol('loading')

export interface ElementLoading extends HTMLElement {
  [INSTANCE_KEY]?: {
    instance: LoadingInstance
    options: LoadingOptions
  }
}
// 创建实例
const createInstance = (
  el: ElementLoading,
  binding: DirectiveBinding<boolean>
) => {
  const getProp = <K extends keyof LoadingOptions>(name: K) =>
    el.getAttribute(`px-loading-${name}`) as MaybeRef<string>

  const getModifier = <K extends keyof LoadingOptions>(name: K) =>
    binding.modifiers[name]

  const fullscreen = getModifier('fullscreen')
  const options: LoadingOptions = {
    text: getProp('text'),
    spinner: getProp('spinner'),
    background: getProp('background'),
    customClass: getProp('customClass'),
    target: fullscreen ? void 0 : el,
    body: getModifier('body'),
    lock: getModifier('lock'),
    grid: getModifier('grid'),
    matte: getModifier('matte'),
    preset1: getModifier('preset1'),
    fullscreen
  }

  el[INSTANCE_KEY] = {
    options,
    instance: Loading(options)
  }
}

// 指令式调用 v-loading 创建实例
export const vLoading: Directive<ElementLoading, boolean> = {
  mounted(el, binding) {
    if (binding.value) createInstance(el, binding)
  },
  updated(el, binding) {
    if (binding.oldValue === binding.value) return

    if (binding.value && !binding.oldValue) {
      createInstance(el, binding)
      return
    }

    el[INSTANCE_KEY]?.instance.close()
  },
  unmounted(el) {
    el[INSTANCE_KEY]?.instance.close()
    el[INSTANCE_KEY] = void 0
  }
}

export default vLoading
