<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressProps } from './types'

const COMP_NAME = 'PxProgress' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<ProgressProps>(), {
  percentage: 0,
  strokeWidth: 12,
  textInside: false,
  status: 'primary',
  indeterminate: false,
  duration: 3,
  showText: true,
  striped: false,
  stripedFlow: false
})

const content = computed(() => { 
  return props.format ? props.format(props.percentage) : `${props.percentage}%`
})

const statusColorMap: Record<string, string> = {
  primary: 'var(--px-bg-color-primary, #209cee)',
  success: 'var(--px-bg-color-success, #92cc41)',
  warning: 'var(--px-bg-color-warning, #f7d51d)',
  danger: 'var(--px-bg-color-danger, #e76e55)'
}

const progressBarOuterStyle = computed(() => { 
  const gapValue = props.strokeWidth / 6
  return { 
    '--px-progress-bar-height': `${props.strokeWidth}px`,
    '--px-progress-bar-gap': `${gapValue}px`
  }
})

const progressBarInnerStyle = computed(() => {
  const style: Record<string, string> = { 
    width: `calc(${props.percentage}% - 2 * var(--px-progress-bar-gap))`,
    animationDuration: `${props.duration}s`,
    transition: 'width .4s ease'
  }

  const color = props.color || statusColorMap[props.status]

  if (props.striped || props.stripedFlow) { 
    style['--px-progress-bar-striped'] = '1'
  }

  style['--px-progress-bar-bg-color'] = color

  // ! flow animation
  if (props.stripedFlow) {
    style.animation = `px-progress-stripe-flow ${props.duration}s linear infinite`
  }

  return style
})
</script>

<template>
  <div
    class="px-progress"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="px-progress-bar">
      <div class="px-progress-bar__outer" :style="progressBarOuterStyle">
        <div
          class="px-progress-bar__inner"
          :class="{
            'is-indeterminate': indeterminate,
            'is-striped': striped,
            'is-striped-flow': stripedFlow,
            [`is-${status}`]: status
          }"
          :style="progressBarInnerStyle"
        >
          <div
            v-if="showText && textInside"
            class="px-progress-bar__inner-text"
          >
            <slot :percentage="percentage">
              <span>{{ content }}</span>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showText && !textInside" class="px-progress__text">
      <slot :percentage="percentage">
        <span>{{ content }}</span>
      </slot>
    </div>
  </div>
</template>

<style scoped>
@import './style.css';
</style>