<script setup lang="ts">
import { SuperGif } from '@mmt817/super-gif'
import { onMounted, ref, nextTick, computed } from 'vue'
import type { AnimationFrameProps } from './types'
import { useDraggable } from '@pixel-ui/hooks'
import { addUnit } from '@pixel-ui/utils'

defineOptions({
  name: 'PxAnimationFrame'
})

const props = withDefaults(defineProps<AnimationFrameProps>(), {
  stages: () => [{ type: 'loop', start: 0, end: 0 }],
  loop: false,
  draggable: true
})
const rootRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()

// 新拖拽 API
useDraggable(
  rootRef,
  canvasRef,
  computed(() => props.draggable),
  computed(() => props.overflow)
)

//todo 动画控制相关
let player: SuperGif | null = null
let interval: number | null = null
let stageIndex = 0 // 当前播放的阶段索引
let currentFrame = 0 // 当前帧
let playing = false

const clear = () => {
  if (interval !== null) {
    clearInterval(interval)
    interval = null
  }
}

const playLoop = (start: number, end: number) => {
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

const playOnce = (start: number, end: number, onComplete?: () => void) => {
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

const playCurrentStage = () => {
  const stage = props.stages[stageIndex]

  if (!stage) return

  if (stage.type === 'loop') {
    playLoop(stage.start, stage.end)
    playing = false
  } else if (stage.type === 'once') {
    playing = true
    playOnce(stage.start, stage.end, () => {
      playing = false

      stageIndex++
      stageIndex %= props.stages.length
      playCurrentStage()
    })
  }
}

const handleClick = () => {
  if (playing) return
  if (props.loop) return
  stageIndex++
  stageIndex %= props.stages.length
  playCurrentStage()
}

onMounted(async () => {
  await nextTick()
  // if (!canvasRef.value) return

  const img = document.createElement('img')
  img.src = props.src
  img.style.display = 'none'
  document.body.appendChild(img)

  img.onload = () => {
    player = new SuperGif(img, { autoPlay: false }, canvasRef.value!)
    player.load(() => {
      if (props.loop) {
        playLoop(0, player!.getLength() - 1)
      } else {
        playCurrentStage()
      }
    })
  }
})
</script>

<template>
  <div
    class="px-animation-frame"
    ref="rootRef"
    :style="{ width: `${addUnit(width)}`, height: `${addUnit(height)}` }"
  >
    <canvas
      class="super-gif"
      ref="canvasRef"
      @click="handleClick"
      :style="{
        width: `${addUnit(width)}`,
        height: `${addUnit(height)}`
      }"
    ></canvas>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
