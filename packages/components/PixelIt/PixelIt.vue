<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import Pixelit from './pixelit'

import type { PixelItProps, PixelItInstance } from './types'

const COMP_NAME = 'PxPixelIt'
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<PixelItProps>(), {
  src: '',
  scale: 4,
  palette: null,
  grayscale: false,
  aspectRatio: 1
})

const originRef = ref<HTMLImageElement>()
const canvasRef = ref<HTMLCanvasElement>()
const pixelSize = ref<{ width: number; height: number }>({
  width: 0,
  height: 0
})

const render = async () => {
  if (!originRef.value || !canvasRef.value) return

  const pixelit = new Pixelit({
    from: originRef.value,
    to: canvasRef.value,
    scale: props.scale,
    palette: props.palette,
    width: Number(props.width),
    height: Number(props.height),
    aspectRatio: Number(props.aspectRatio)
  })

  pixelit.draw().pixelate()
  if (props.grayscale) pixelit.convertGrayscale()
  if (props.palette) pixelit.convertPalette()

  pixelSize.value = pixelit.getSize()
}

defineExpose<PixelItInstance>({
  render,
  originRef,
  canvasRef,
  getSize: () => pixelSize.value
})

watch(
  () => [
    props.src,
    props.scale,
    props.palette,
    props.grayscale,
    props.width,
    props.height,
    props.aspectRatio
  ],
  render
)
onMounted(() => {
  if (originRef.value?.complete) render()
})
</script>

<template>
  <div class="px-pixel-it">
    <img
      ref="originRef"
      :src="src"
      alt="source"
      class="px-pixel-it__origin"
      @load="render"
    />
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
