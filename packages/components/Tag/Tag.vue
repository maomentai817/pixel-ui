<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { debugWarn } from '@pixel-ui/utils'
import type { TagProps, TagEmits } from './types'

import PxIcon from '../Icon/Icon.vue'
import workletURL from '../worklets/dist/pixelbox.worklet.js?url'

const COMP_NAME = 'PxTag' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<TagProps>(), {
  closable: false,
  size: 'default',
  effect: 'light',
  disabled: false,
  round: false,
  circle: false,
  chubby: false
})

const type = computed(() => {
  const validTypes = [
    'primary',
    'success',
    'warning',
    'danger',
    'info',
    'sakura'
  ]
  return props?.type && validTypes.includes(props.type) ? props.type : 'primary'
})
const emits = defineEmits<TagEmits>()

const close = () => {
  if (props.disabled) return
  emits('close')
}

const click = (event: MouseEvent) => {
  if (props.disabled) return
  emits('click', event)
}

// handle custom colors
const colorStyle = computed(() => {
  if (!props.color) return {}

  const color = props.color

  if (props.effect === 'plain') {
    return {
      '--px-custom-text-color': color,
      '--px-custom-bg-color': 'transparent',
      '--px-custom-border-color': color
    }
  } else {
    return {
      '--px-custom-text-color': '#FFFFFF',
      '--px-custom-bg-color': color,
      '--px-custom-border-color': color
    }
  }
})

// CSS Houdini Paint Worklet
const paint = () => {
  try {
    if (typeof CSS !== 'undefined' && 'paintWorklet' in CSS) {
      ;(CSS as any).paintWorklet.addModule(workletURL)
    } else {
      debugWarn(
        COMP_NAME,
        'CSS Houdini Paint Worklet API is not supported in this browser.'
      )
    }
  } catch (error) {
    console.error('Error loading Paint Worklet:', error)
  }
}

onMounted(async () => {
  paint()
})
</script>

<template>
  <span
    class="px-tag"
    :class="[
      {
        [`px-tag--${size}`]: size,
        [`px-tag--${effect}`]: effect,
        [`px-tag--${type}`]: type,
        'is-disabled': disabled,
        'is-custom': color,
        'is-round': round,
        'is-circle': circle,
        'is-chubby': chubby
      }
    ]"
    :style="colorStyle"
    @click="click"
  >
    <span class="px-tag__content">
      <slot></slot>
    </span>
    <span class="px-tag__close" v-if="closable">
      <px-icon
        class="px-tag__close-icon"
        icon="times-solid"
        size="10"
        @click.stop="close"
      ></px-icon>
    </span>
  </span>
</template>

<style scoped>
@import './style.css';
</style>
