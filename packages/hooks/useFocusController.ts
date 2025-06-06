import { isFunction } from 'lodash-es'
import { getCurrentInstance, ref, type Ref } from 'vue'
import useEventListener from './useEventListener'

interface UseFocusControllerOptions {
  afterFocus?(): void
  beforeBlur?(_event: FocusEvent): boolean | void
  afterBlur?(): void
}

// 控制元素 (或带有 `.focus()` 方法的对象) 的聚焦状态
// 点击时自动聚焦, 同时提供聚焦/失焦 callback
// wrapper 内在逻辑控制
export function useFocusController<T extends HTMLElement | { focus(): void }>(
  target: Ref<T | void>,
  { afterBlur, beforeBlur, afterFocus }: UseFocusControllerOptions = {}
) {
  const instance = getCurrentInstance()!
  const { emit } = instance
  const wrapperRef = ref<HTMLElement>()
  const isFocused = ref(false)

  const handleFocus = (event: FocusEvent) => {
    if (isFocused.value) return
    isFocused.value = true
    emit('focus', event)
    afterFocus?.()
  }

  const handleBlur = (event: FocusEvent) => {
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false
    if (
      cancelBlur ||
      (event.relatedTarget &&
        wrapperRef.value?.contains(event.relatedTarget as Node))
    )
      return

    isFocused.value = false
    emit('blur', event)
    afterBlur?.()
  }

  const handleClick = () => {
    target.value?.focus()
  }

  useEventListener(wrapperRef, 'click', handleClick)

  return {
    wrapperRef,
    isFocused,
    handleFocus,
    handleBlur
  }
}

export default useFocusController
