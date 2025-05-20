<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { addUnit } from '@pixel-ui/utils'
import type { PixelItProps, PixelItInstance } from '@mmt817/pixel-ui'

type PixelitCompareProps = PixelItProps

const props = withDefaults(defineProps<PixelitCompareProps>(), {
  aspectRatio: 1
})

const containerRef = ref<HTMLElement>()
const isDragging = ref(false)
const divider = ref(50) // 中线百分比位置
const sliderWidth = 4
const marginWidth = 20
const pixelitRef = ref<PixelItInstance>()

const pixelitSize = computed(() => {
  const width = props.width || pixelitRef.value?.getSize().width
  const height = props.height || pixelitRef.value?.getSize().height
  return {
    width,
    height
  }
})

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
  <div class="pixelit-compare-container">
    <div
      ref="containerRef"
      class="relative border rounded"
      :style="{
        width: `${addUnit(pixelitSize.width)}`,
        height: `${addUnit(pixelitSize.height)}`,
        margin: `${addUnit(marginWidth)}`
      }"
    >
      <!-- 原图层 -->
      <img
        :src="props.src"
        alt="original"
        class="pointer-events-none absolute select-none object-cover"
        :style="{
          width: `${addUnit(pixelitSize.width)}`,
          height: `${addUnit(pixelitSize.height)}`
        }"
      />

      <!-- px-image 裁剪层 -->
      <div class="absolute" :style="clipStyle">
        <px-pixel-it
          :src="src"
          :scale="scale"
          :aspect-ratio="aspectRatio"
          :palette="palette"
          :grayscale="grayscale"
          :width="aspectRatio === 1 ? pixelitSize.width : void 0"
          :height="aspectRatio === 1 ? pixelitSize.height : void 0"
          ref="pixelitRef"
        />
      </div>

      <!-- 拖动条 -->
      <div
        class="slider absolute bottom-0 top-0 z-10 cursor-col-resize bg-#554562"
        :style="{
          top: `-${marginWidth}px`,
          left: `calc(${divider}% - ${sliderWidth / 2}px)`,
          width: `${addUnit(sliderWidth)}`,
          height: `calc(100% + ${2 * marginWidth}px)`
        }"
        @mousedown="startDrag"
      >
        <px-button
          class="slider-handle absolute left-1/2 top-1/2 h-16 w-4 m-0! -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pixelit-compare-container {
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
