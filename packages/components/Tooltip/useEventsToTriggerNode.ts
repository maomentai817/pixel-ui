import { each, isElement } from 'lodash-es'
import { onMounted, onUnmounted, watch } from 'vue'
import type { ComputedRef, Ref, WatchStopHandle } from 'vue'
import type { TooltipProps } from './types'

export function useEventsToTriggerNode(
  props: TooltipProps & { virtualTriggering?: boolean },
  triggerNode: ComputedRef<HTMLElement | undefined>,
  events: Ref<Record<string, EventListener>>,
  closeMethod: () => void
) {
  let watchEventsStopHandle: WatchStopHandle | void
  let watchTriggerNodeStopHandle: WatchStopHandle | void

  const _eventHandleMap = new Map()

  const _bindEventToVirtualTriggerNode = () => {
    const el = triggerNode.value
    isElement(el) &&
      each(events.value, (fn, event) => {
        _eventHandleMap.set(event, fn)
        el?.addEventListener(event as keyof HTMLElementEventMap, fn)
      })
  }
  const _unbindEventToVirtualTriggerNode = () => {
    const el = triggerNode.value
    isElement(el) &&
      each(
        ['mouseenter', 'mouseleave', 'click', 'contextmenu'],
        (key) =>
          _eventHandleMap.has(key) &&
          el?.removeEventListener(key, _eventHandleMap.get(key))
      )
  }

  onMounted(() => {
    watchTriggerNodeStopHandle = watch(
      triggerNode,
      () => props.virtualTriggering && _bindEventToVirtualTriggerNode(),
      { immediate: true }
    )

    watchEventsStopHandle = watch(
      events,
      () => {
        if (!props.virtualTriggering) return
        _unbindEventToVirtualTriggerNode()
        _bindEventToVirtualTriggerNode()
        closeMethod()
      },
      { deep: true }
    )
  })

  onUnmounted(() => {
    watchTriggerNodeStopHandle?.()
    watchEventsStopHandle?.()
  })
}

export default useEventsToTriggerNode
