import {
  onMounted,
  onBeforeUnmount,
  watch,
  isRef,
  unref,
  type MaybeRef
} from 'vue'

export default function useEventListener(
  target: MaybeRef<EventTarget | HTMLElement | void>,
  event: string,
  handler: (_e: Event) => any
) {
  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      oldVal?.removeEventListener(event, handler)
      val?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => target?.addEventListener(event, handler))
  }

  onBeforeUnmount(() => unref(target)?.removeEventListener(event, handler))
}
