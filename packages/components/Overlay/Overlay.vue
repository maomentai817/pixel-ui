<script setup lang="ts">
import type { OverlayProps, OverlayEmits } from './types'

const COMP_NAME = 'PxOverlay' as const
defineOptions({
  name: COMP_NAME
})

withDefaults(defineProps<OverlayProps>(), {
  mask: true,
  zIndex: 2000
})

const emits = defineEmits<OverlayEmits>()

const handleClick = (e: MouseEvent) => {
  emits('click', e)
}
</script>

<template>
  <div
    v-if="mask"
    class="px-overlay"
    :class="overlayClass"
    :style="{ zIndex: zIndex }"
    @click="handleClick"
  >
    <slot></slot>
  </div>
  <div
    v-else
    :class="overlayClass"
    :style="{
      zIndex: zIndex,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
