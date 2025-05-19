<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { usePixelProcessor } from './usePixelProcessor'
import type { ImageProps, ImageInstance, ImageEmits } from './types'

const COMP_NAME = 'PxImage' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<ImageProps>(), {
  blockSize: 2,
  colorCount: 32,
  showGrid: false,
  scale: 1
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const processor = usePixelProcessor()
const emits = defineEmits<ImageEmits>()

const actualSize = ref<{ width: number; height: number }>({
  width: 0,
  height: 0
})
const render = async () => {
  if (!canvasRef.value || !props.src) return
  const canvas = canvasRef.value
  const img = await processor.loadImage(props.src)
  processor.processImage(canvas, img, {
    blockSize: Math.max(1, Number(props.blockSize) || 2),
    colorCount: Math.max(1, Number(props.colorCount) || 32),
    showGrid: props.showGrid,
    cwidth: Number(props.width) || img.naturalWidth,
    cheight: Number(props.height) || img.naturalHeight,
    scale: Number(props.scale)
  })

  actualSize.value = processor.calculateScaledDimensions(
    Number(props.width) || img.naturalWidth,
    Number(props.height) || img.naturalHeight,
    Number(props.scale)
  )

  emits('ready', actualSize.value)
}
onMounted(render)
watch(() => props.src, render)
watch(() => [props.blockSize, props.colorCount, props.showGrid], render)
watch(() => [props.width, props.height, props.scale], render)

// 暴露接口
defineExpose<ImageInstance>({
  getSize: () => actualSize.value
})
</script>

<template>
  <div class="px-image">
    <canvas ref="canvasRef" />
  </div>
</template>

<style scoped>
@import './style.css';
</style>
