<script setup lang="ts">
// import libgif from '@zaqmjuop/libgif'
import { SuperGif } from '@mmt817/super-gif'
import { onMounted, ref, nextTick } from 'vue'
import type { AnimationFrameProps } from './types'

defineOptions({
  name: 'PxAnimationFrame'
})

const props = defineProps<AnimationFrameProps>()
const canvasRef = ref<HTMLCanvasElement | null>(null)

let player: any | null = null
let interval: number | null = null
let stageIndex = 0
let currentFrame = 0
let playing = false

function clear() {
  if (interval !== null) {
    clearInterval(interval)
    interval = null
  }
}

function playLoop(start: number, end: number) {
  clear()
  currentFrame = start
  interval = window.setInterval(() => {
    player?.moveTo(currentFrame)
    currentFrame++
    if (currentFrame > end) {
      currentFrame = start
    }
  }, 100)
}

function playOnce(start: number, end: number, onComplete?: () => void) {
  clear()
  currentFrame = start
  interval = window.setInterval(() => {
    player?.moveTo(currentFrame)
    currentFrame++
    if (currentFrame > end) {
      clear()
      onComplete?.()
    }
  }, 100)
}

function playCurrentStage() {
  const stage = props.stages[stageIndex]

  if (!stage) return

  if (stage.type === 'loop') {
    playLoop(stage.start, stage.end)
    playing = false
  } else if (stage.type === 'once') {
    playing = true
    playOnce(stage.start, stage.end, () => {
      playing = false

      if (stageIndex === 1) {
        // 播放完阶段 2，进入 2.5
        stageIndex = 2
        playCurrentStage()
      } else if (stageIndex === 3) {
        // 播放完阶段 3，回到阶段 1
        stageIndex = 0
        playCurrentStage()
      }
    })
  }
}

function handleClick() {
  if (playing) return
  stageIndex++
  stageIndex %= props.stages.length
  playCurrentStage()
}

onMounted(async () => {
  await nextTick()
  if (!canvasRef.value) return

  const img = document.createElement('img')
  img.src = props.src
  img.style.display = 'none'
  document.body.appendChild(img)

  img.onload = () => {
    player = new SuperGif(img, { autoPlay: false }, canvasRef.value!)
    console.log(player)
    player.load(() => {
      playCurrentStage()
    })
  }
})
</script>

<template>
  <div class="px-animation-frame">
    <canvas class="super-gif" ref="canvasRef" @click="handleClick"></canvas>
  </div>
</template>

<style scoped>
.px-animation-frame {
  width: 320px;
  height: 320px;
}
.super-gif {
  width: 320px;
  height: 320px;
  image-rendering: pixelated;
  cursor: pointer;
  position: absolute;
  z-index: 99;
}
</style>
