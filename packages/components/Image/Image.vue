<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { usePixelProcessor } from './usePixelProcessor'
import type { ImageProps } from './types'

const COMP_NAME = 'PxImage' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<ImageProps>(), {
  blockSize: 2,
  colorCount: 32,
  showGrid: false
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const processor = usePixelProcessor()

const render = async () => {
  if (!canvasRef.value || !props.src) return
  const canvas = canvasRef.value
  const img = await processor.loadImage(props.src)
  processor.processImage(canvas, img, {
    blockSize: props.blockSize ?? 8,
    colorCount: props.colorCount ?? 16,
    showGrid: props.showGrid ?? false,
    cwidth: props.width ?? 0,
    cheight: props.height ?? 0
  })
}

onMounted(render)
watch(() => props.src, render)
watch(() => [props.blockSize, props.colorCount, props.showGrid], render)
watch(() => [props.width, props.height], render)
</script>

<template>
  <div class="px-image">
    <canvas ref="canvasRef" />
  </div>
</template>

<style scoped>
@import './style.css';
</style>
