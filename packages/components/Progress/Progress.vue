<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { updateColors } from '@pixel-ui/utils'
import type { ProgressProps } from './types'
import ProgressRing from './ProgressRing.vue'

const COMP_NAME = 'PxProgress' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<ProgressProps>(), {
  percentage: 0,
  strokeWidth: 16,
  textInside: false,
  status: 'primary',
  indeterminate: false,
  duration: 4,
  showText: true,
  striped: false,
  stripedFlow: false,
  checker: false,
  blockSize: 4,
  type: 'line',
  width: 126
})

const content = computed(() => {
  return props.format ? props.format(props.percentage) : `${props.percentage}%`
})

// 限制 storkeWidth
const strokeWidth = computed(() => Math.max(props.strokeWidth, 16))

const statusColorMap: Record<string, string> = {
  primary: 'var(--px-color-primary, #209cee)',
  success: 'var(--px-color-success, #92cc41)',
  warning: 'var(--px-color-warning, #f7d51d)',
  danger: 'var(--px-color-danger, #e76e55)',
  sakura: 'var(--px-color-sakura, #f06595)'
}

const progressBarOuterStyle = computed(() => {
  const gapValue = Math.max(strokeWidth.value / 6, 4)
  return {
    '--px-progress-bar-height': `${strokeWidth.value}px`,
    '--px-progress-bar-gap': `${gapValue}px`
  }
})

const progressBarInnerStyle = computed(() => {
  const style: Record<string, string> = {
    width: `${props.percentage}%`,
    '--px-progress-bar-duration': `${props.duration}s`,
    '--px-stripe-size': `${props.blockSize}`,
    transition: 'width .4s ease'
  }

  if (props.color) {
    const colorStyle = getColorStyle(props.color)
    style['--px-progress-bar-bg-color'] = colorStyle.bgColor!
    style['--px-progress-bar-bg-shadow-color'] = colorStyle.fillHoverColor!
  } else {
    style['--px-progress-bar-bg-color'] = statusColorMap[props.status]
  }

  if (props.striped || props.stripedFlow) {
    style['--px-progress-bar-striped'] = '1'
  }

  return style
})

// 自定义颜色 - stripe
const getColorStyle = (color: any) => {
  const colors = updateColors(color)
  return {
    bgColor: colors.bgColor,
    fillHoverColor: colors.fillHoverColor
  }
}

const progressBarInnerRef = ref()
let stripeOffset = 0
let rafId = 0
const stripePeriod = 16

// stripe flow 动画处理
const updateStripeFlow = () => {
  const duration = props.duration
  const speed = stripePeriod / duration / 8

  // stripeOffset = (stripeOffset + speed) % stripePeriod
  stripeOffset = (stripeOffset - speed + stripePeriod) % stripePeriod

  progressBarInnerRef.value?.style.setProperty(
    '--px-stripe-offset',
    `${stripeOffset}px`
  )
  rafId = requestAnimationFrame(updateStripeFlow)
}

const stopStripeFlow = () => {
  cancelAnimationFrame(rafId)
}

onMounted(async () => {
  // paint()

  props.stripedFlow && updateStripeFlow()
})

onBeforeUnmount(() => {
  stopStripeFlow()
})
</script>

<template>
  <div
    class="px-progress"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
    :class="{
      'is-circle': type === 'circle'
    }"
  >
    <template v-if="type === 'line'">
      <div class="px-progress-bar">
        <div class="px-progress-bar__outer" :style="progressBarOuterStyle">
          <div class="px-progress-bar-gap">
            <div
              class="px-progress-bar__inner"
              :class="{
                'is-striped': striped,
                'is-striped-flow': stripedFlow,
                'is-indeterminate': indeterminate,
                'is-checker': checker,
                [`is-${status}`]: status
              }"
              :style="progressBarInnerStyle"
              ref="progressBarInnerRef"
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
      </div>
      <div v-if="showText && !textInside" class="px-progress__text">
        <slot :percentage="percentage">
          <span>{{ content }}</span>
        </slot>
      </div>
    </template>

    <template v-else-if="type === 'circle'">
      <ProgressRing
        :width="props.width"
        :percentage="percentage"
        :status="status"
        :strokeWidth="props.strokeWidth"
        :showText="showText"
        :color="color"
        :content="content"
      />
    </template>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
