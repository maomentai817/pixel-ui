<script setup lang="ts">
import { ref, onMounted } from 'vue' 
import type { ButtonProps } from './types'
import workletURL from '../worklets/pixelbox.js?url'

defineOptions({
  name: 'PxButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
})

const slots = defineSlots()

const _ref = ref<HTMLButtonElement>()

// CSS Houdini Paint Worklet
const paint = () => { 
  if ('paintWorklet' in CSS) { 
    (CSS as any).paintWorklet.addModule(workletURL)
  } else { 
    console.warn('CSS Houdini Paint Worklet API is not supported in this browser.') 
  }
}
onMounted(async () => { 
  paint()
})
</script>

<template>
  <component
    :is="props.tag"
    ref="_ref"
    class="px-button"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`px-button--${type}`]: type,
      [`px-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
  >
    <slot></slot>
  </component>
</template>

<style scoped>
@import './style.css';
</style>