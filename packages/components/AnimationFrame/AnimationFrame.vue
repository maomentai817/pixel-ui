<script setup lang="ts">
import { SuperGif } from '@mmt817/super-gif'
import { onMounted, ref, nextTick } from 'vue'
import type { AnimationFrameProps } from './types'

defineOptions({
  name: 'PxAnimationFrame'
})

const props = withDefaults(defineProps<AnimationFrameProps>(), {
  stages: () => [{ type: 'loop', start: 0, end: 0 }],
  loop: false
})
const canvasRef = ref<HTMLCanvasElement | null>(null)
//todo 拖拽相关状态
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStartPos = ref({ x: 0, y: 0 })
const elementStartPos = ref({ x: 0, y: 0 })
const hasMoved = ref(false)

// 拖拽 API
// 拖拽逻辑
const startDrag = (e: MouseEvent) => {
  isDragging.value = true
  hasMoved.value = false
  dragStartPos.value = { x: e.clientX, y: e.clientY }
  elementStartPos.value = { ...position.value }

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', onDragEnd)
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return

  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

  const deltaX = clientX - dragStartPos.value.x
  const deltaY = clientY - dragStartPos.value.y

  // 检测是否移动超过阈值
  if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
    hasMoved.value = true
  }

  position.value = {
    x: elementStartPos.value.x + deltaX,
    y: elementStartPos.value.y + deltaY
  }
}

const onDragEnd = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', onDragEnd)
}

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
  if (!canvasRef.value) return

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
    @mousedown="startDrag"
    :style="{
      transform: `translate(${position.x}px, ${position.y}px)`,
      cursor: isDragging ? 'grabbing' : 'grab'
    }"
  >
    <canvas
      class="super-gif"
      ref="canvasRef"
      @click="handleClick"
      :style="{ width: `${props.width}px`, height: `${props.height}px` }"
    ></canvas>
  </div>
</template>

<style scoped>
@import './styl.css';
</style>
