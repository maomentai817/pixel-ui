<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressProps } from './types'

type ProgressRingProps = Required<
  Pick<
    ProgressProps,
    'width' | 'percentage' | 'status' | 'strokeWidth' | 'showText'
  >
> &
  Pick<ProgressProps, 'color'> & {
    content: string
    pixelSize?: number
  }

const props = withDefaults(defineProps<ProgressRingProps>(), {
  pixelSize: 3
})

// 进度圆环尺寸
const size = computed(() => props.width)
// 像素块尺寸
const pixelSize = computed(() => props.pixelSize)
// 圆心坐标
const centerX = computed(() => size.value / 2)
const centerY = computed(() => size.value / 2)

// 外边框半径是整个宽度的 0.9 倍
const outerRadius = computed(() => Math.floor((size.value / 2) * 0.9))
const innerRadius = computed(() => outerRadius.value - props.strokeWidth)

const statusColorMap: Record<string, string> = {
  primary: 'var(--px-color-primary, #209cee)',
  success: 'var(--px-color-success, #92cc41)',
  warning: 'var(--px-color-warning, #f7d51d)',
  danger: 'var(--px-color-danger, #e76e55)',
  sakura: 'var(--px-color-sakura, #f06595)'
}

// 进度颜色
const progressColor = computed(
  () => props.color ?? statusColorMap[props.status]
)

const points = computed(() => {
  const pointsData = {
    borderPoints: [] as { x: number; y: number }[],
    backgroundPoints: [] as { x: number; y: number }[],
    progressPoints: [] as { x: number; y: number }[]
  }

  const progressAngle = (props.percentage / 100) * Math.PI * 2
  const gridSize = pixelSize.value
  const borderWidth = Math.max(1, Math.floor(gridSize * 0.8)) // 边框宽度

  for (let x = 0; x < size.value; x += gridSize) {
    for (let y = 0; y < size.value; y += gridSize) {
      const pixelCenterX = x + gridSize / 2
      const pixelCenterY = y + gridSize / 2

      const distance = Math.sqrt(
        Math.pow(pixelCenterX - centerX.value, 2) +
          Math.pow(pixelCenterY - centerY.value, 2)
      )

      const distanceToInner = Math.abs(distance - innerRadius.value)
      const distanceToOuter = Math.abs(distance - outerRadius.value)

      const isInnerBorder =
        distanceToInner <= borderWidth &&
        distance <= innerRadius.value + borderWidth
      const isOuterBorder =
        distanceToOuter <= borderWidth &&
        distance >= outerRadius.value - borderWidth

      if (isInnerBorder || isOuterBorder) {
        pointsData.borderPoints.push({ x, y })
      } else if (
        distance > innerRadius.value + borderWidth &&
        distance < outerRadius.value - borderWidth
      ) {
        // 在圆环内部，计算角度
        const angle = Math.atan2(
          pixelCenterY - centerY.value,
          pixelCenterX - centerX.value
        )

        // 标准化角度，从顶部开始 (12点方向)
        let normalizedAngle = angle + Math.PI / 2
        if (normalizedAngle < 0) normalizedAngle += Math.PI * 2

        // 判断是否在进度范围内
        if (normalizedAngle <= progressAngle) {
          pointsData.progressPoints.push({ x, y })
        } else {
          pointsData.backgroundPoints.push({ x, y })
        }
      }
    }
  }

  return pointsData
})
</script>

<template>
  <div
    class="px-progress-circle"
    :style="{ width: `${width}px`, height: `${width}px` }"
  >
    <svg :width="width" :height="width" :viewBox="`0 0 ${width} ${width}`">
      <!-- 背景层 -->
      <g>
        <rect
          v-for="(point, index) in points.backgroundPoints"
          :key="`bg-${index}`"
          :x="point.x"
          :y="point.y"
          :width="pixelSize"
          :height="pixelSize"
          fill="#eceef5"
        />
      </g>

      <!-- 进度层 -->
      <g>
        <rect
          v-for="(point, index) in points.progressPoints"
          :key="`progress-${index}`"
          :x="point.x"
          :y="point.y"
          :width="pixelSize"
          :height="pixelSize"
          :fill="progressColor"
        />
      </g>

      <!-- 边框层 -->
      <g>
        <rect
          v-for="(point, index) in points.borderPoints"
          :key="`border-${index}`"
          :x="point.x"
          :y="point.y"
          :width="pixelSize"
          :height="pixelSize"
          fill="#000000"
        />
      </g>
    </svg>

    <div v-if="showText" class="px-progress-circle__text">
      <slot>
        <span>{{ content }}</span>
      </slot>
    </div>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
