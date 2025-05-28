<script setup lang="ts">
import { computed } from 'vue'
import { isNumber } from 'lodash-es'
import { usePxBadgeCustomStyle } from '@pixel-ui/hooks'
import type { BadgeProps } from './types'

const COMP_NAME = 'PxBadge' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<BadgeProps>(), {
  max: 99,
  isDot: false,
  hidden: false,
  type: 'danger',
  showZero: true
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
const colorStyle = usePxBadgeCustomStyle(props)

// 偏移量处理
const offsetStyle = computed(() => {
  if (!props.offset) return {}
  const [x, y] = props.offset
  return {
    marginRight: `${-x}px`,
    marginTop: `${y}px`
  }
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
      :style="{ ...colorStyle, ...offsetStyle }"
      v-show="!hidden && (content || isDot || $slots.content)"
    >
      <slot name="content" :value="content">{{ content }}</slot>
    </sup>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
