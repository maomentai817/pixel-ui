import { ref, computed, type Ref, type ComputedRef } from 'vue'

/** @internal 用于测试中重置全局 zIndex */
export const zIndex = ref(0)

interface UseZIndexResult {
  initialValue: Ref<number>
  currentZIndex: ComputedRef<number>
  nextZIndex: () => number
}
export const useZIndex = (initVal = 2000): UseZIndexResult => {
  const _initVal = ref(initVal)
  const currentZIndex = computed(() => zIndex.value + _initVal.value)

  const nextZIndex = () => {
    zIndex.value += 1
    return currentZIndex.value
  }

  return {
    initialValue: _initVal,
    currentZIndex,
    nextZIndex
  }
}

export default useZIndex
