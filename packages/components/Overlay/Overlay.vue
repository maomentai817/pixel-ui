<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'
import type { OverlayProps, OverlayEmits } from './types'

const COMP_NAME = 'PxOverlay' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<OverlayProps>(), {
  mask: true,
  zIndex: 2000,
  lockScroll: true
})

const emits = defineEmits<OverlayEmits>()

const handleClick = (e: MouseEvent) => {
  emits('click', e)
}

let lockCount = 0
const lockScroll = () => {
  lockCount++
  if (lockCount === 1) {
    document.body.style.overflow = 'hidden'
  }
}
const unlockScroll = () => {
  lockCount--
  if (lockCount <= 0) {
    document.body.style.overflow = ''
  }
}

const updateScroll = (shouldLock: boolean) => {
  if (!props.lockScroll) return
  shouldLock ? lockScroll() : unlockScroll()
}

watch(
  () => props.mask,
  (val) => updateScroll(val),
  { immediate: true }
)

onBeforeUnmount(() => {
  if (props.lockScroll) unlockScroll()
})
</script>

<template>
  <div
    class="px-overlay"
    :class="[
      overlayClass,
      {
        'is-grid-basic': grid,
        'is-transparent': !mask,
        'is-matte': matte,
        'is-grid-preset-1': preset1
      }
    ]"
    :style="{ zIndex: zIndex, backgroundColor: color }"
    @click="handleClick"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
