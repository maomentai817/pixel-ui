<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { addUnit } from '@pixel-ui/utils'
import type { ImageInstance } from '@mmt817/pixel-ui'

interface ImageCompareProps {
  src: string
  width?: number | string
  height?: number | string
  blockSize?: number
  colorCount?: number
  showGrid?: boolean
}

const props = defineProps<ImageCompareProps>()

const containerRef = ref<HTMLElement>()
const isDragging = ref(false)
const divider = ref(50) // 中线百分比位置
const sliderWidth = 4
const marginWidth = 20
const pxImageRef = ref<ImageInstance>()
const pxImageSize = ref({ width: 0, height: 0 })
const onPxImageReady = (size: { width: number; height: number }) => {
  pxImageSize.value = {
    width: Number(props.width) || size.width,
    height: Number(props.height) || size.height,
  }
}

const clipStyle = computed(() => ({
  clipPath: `inset(0 0 0 ${divider.value}%)`
}))

const startDrag = () => {
  isDragging.value = true
  document.body.style.cursor = 'col-resize'
}
const stopDrag = () => {
  isDragging.value = false
  document.body.style.cursor = 'default'
}
const onDrag = (e: MouseEvent) => {
  if (!isDragging.value || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const percent = ((e.clientX - rect.left) / rect.width) * 100
  divider.value = Math.min(100, Math.max(0, percent))
}

onMounted(() => {
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
})
onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<template>
  <div class="image-compare-container">
    <div
      ref="containerRef"
      class="relative border rounded"
      :style="{
        width: `${addUnit(pxImageSize.width)}`,
        height: `${addUnit(pxImageSize.height)}`,
        margin: `${addUnit(marginWidth)}`
      }"
    >
      <!-- 原图层 -->
      <img
        :src="props.src"
        alt="original"
        class="absolute object-cover select-none pointer-events-none"
        :style="{
          width: `${addUnit(pxImageSize.width)}`,
          height: `${addUnit(pxImageSize.height)}`
        }"
      />

      <!-- px-image 裁剪层 -->
      <div class="absolute" :style="clipStyle">
        <px-image
          :src="props.src"
          :width="pxImageSize.width"
          :height="pxImageSize.height"
          :block-size="props.blockSize"
          :color-count="props.colorCount"
          :show-grid="props.showGrid"
          class="object-cover"
          ref="pxImageRef"
          @ready="onPxImageReady"
        />
      </div>

      <!-- 拖动条 -->
      <div
        class="slider absolute top-0 bottom-0 z-10 cursor-col-resize bg-#554562"
        :style="{
          top: `-${marginWidth}px`,
          left: `calc(${divider}% - ${sliderWidth / 2}px)`,
          width: `${addUnit(sliderWidth)}`,
          height: `calc(100% + ${2 * marginWidth}px)`
        }"
        @mousedown="startDrag"
      >
        <px-button
          class="slider-handle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-16 m-0!"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-compare-container {
  background-image: paint(pixelbox);
  --px-border: 4px;
  --px-border-t: 4px;
  --px-border-r: 4px;
  --px-border-b: 4px;
  --px-border-l: 4px;
  --px-border-radius: 3px;
  --px-border-radius-lt: 3px;
  --px-border-radius-rt: 3px;
  --px-border-radius-lb: 3px;
  --px-border-radius-rb: 3px;
  --px-bg-color: transparent;
  --px-border-color: #554562;
}

.slider .slider-handle {
  --px-button-text-color: #554562;
  --px-border-color: #554562;
  --px-bg-color: #fadbe0 !important;
  --px-bg-shadow-color: #eaadbd;
}
</style>
