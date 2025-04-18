<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { isNumber } from 'lodash-es'
import { debugWarn, updateColors } from '@pixel-ui/utils'
import type { BadgeProps } from './types'

import workletURL from '../worklets/dist/pixelbox.worklet.js?url'

const COMP_NAME = 'PxBadge' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<BadgeProps>(), {
  max: 99,
  isDot: false,
  hidden: false,
  type: 'danger',
  showZero: true,
})

const content = computed<string>(() => { 
  if (props.isDot) return ''
  if (isNumber(props.value) && props.value === 0 && !props.showZero) return ''
  if (isNumber(props.value) && isNumber(props.max)) { 
    return props.value > props.max ? `${props.max}+` : `${props.value}`
  }
  return `${props.value}`
})

// 自定义颜色
const colorStyle = computed(() => {
  const colors = props.color ? updateColors(props.color) : void 0
  if (!colors) return {}
  return {
    '--px-custom-badge-bg-color': colors.bgColor,
    '--px-custom-badge-light-color': colors.lightColor,
    '--px-custom-badge-light-color-2': colors.lightColor2,
    '--px-custom-badge-bg-shadow-color': colors.bgShadowColor,
    '--px-custom-badge-text-color': colors.textColor,
    '--px-custom-badge-fill-hover-color': colors.fillHoverColor,
    '--px-custom-badge-border-color': colors.borderColor
  }
})

// 偏移量处理
const offsetStyle = computed(() => {
  if (!props.offset) return {}
  const [x, y] = props.offset
  return {
    marginRight: `${-x}px`,
    marginTop: `${y}px`
  }
})

// CSS Houdini Paint Worklet
const paint = () => {
  try {
    if ('paintWorklet' in CSS) {
      ;(CSS as any).paintWorklet.addModule(workletURL)
    } else {
      debugWarn(
        COMP_NAME,
        'CSS Houdini Paint Worklet API is not supported in this browser.'
      )
    }
    // (CSS as any).paintWorklet.addModule(workletURL)
  } catch (error) {
    console.error('Error loading Paint Worklet:', error)
  }
}

onMounted(async () => {
  paint()
})
</script>

<template>
<div class="px-badge">
  <slot></slot>
  <sup
    class="px-badge__content"
    :class="{
      [`px-badge--${type}`]: type,
      [`is-dot`]: isDot,
      [`is-fixed`]: !!$slots.default,
      [`is-custom`]: color
    }"
    :style="{...colorStyle, ...offsetStyle}"
    v-show="!hidden && (content || isDot || $slots.content)"
  >
    <slot name="content" :value="content">{{ content }}</slot>
  </sup>
</div>
</template>

<style scoped>
@import './style.css';
</style>