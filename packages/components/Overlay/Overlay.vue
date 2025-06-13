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

watch(
  () => props.mask,
  (val) => {
    if (props.lockScroll) {
      document.body.style.overflow = val ? 'hidden' : ''
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (props.lockScroll) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div
    v-if="mask"
    class="px-overlay"
    :class="[
      overlayClass,
      { 'is-grid-basic': grid, 'is-matte': matte, 'is-grid-preset-1': preset1 }
    ]"
    :style="{ zIndex: zIndex, backgroundColor: color }"
    @click="handleClick"
  >
    <slot></slot>
  </div>
  <div
    v-else
    :class="[
      overlayClass,
      { 'is-grid-basic': grid, 'is-matte': matte, 'is-grid-preset-1': preset1 }
    ]"
    :style="{
      zIndex: zIndex,
      position: 'fixed',
      inset: 0,
      backgroundColor: color
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
