<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import Pixelit from './pixelit'

import type { PixelItProps } from './types'

const COMP_NAME = 'PxPixelIt'
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<PixelItProps>(), {
  src: '',
  scale: 8,
  palette: null,
  grayscale: false
})

const originRef = ref<HTMLImageElement>()
const canvasRef = ref<HTMLCanvasElement>()

const render = async () => {
  if (!originRef.value || !canvasRef.value) return

  const pixelit = new Pixelit({
    from: originRef.value,
    to: canvasRef.value,
    scale: props.scale,
    palette: props.palette,
    width: props.width,
    height: props.height
  })

  pixelit.draw().pixelate()
  if (props.grayscale) pixelit.convertGrayscale()
  if (props.palette) pixelit.convertPalette()
}

watch(
  () => [
    props.src,
    props.scale,
    props.palette,
    props.grayscale,
    props.width,
    props.height
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
