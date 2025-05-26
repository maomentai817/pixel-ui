<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { delay, bind } from 'lodash-es'
import { getLastBottomOffset } from './methods'
import { useOffset, useEventListener } from '@pixel-ui/hooks'
import { addUnit, typeIconMap, RenderVNode } from '@pixel-ui/utils'

import type { MessagePropsIn, MessageCompInstance } from './types'

import PxIcon from '../Icon/Icon.vue'

const COMP_NAME = 'PxMessage' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<MessagePropsIn>(), {
  type: 'info',
  duration: 3000,
  offset: 10,
  transitionName: 'fade-up'
})

const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const iconName = computed(
  () => typeIconMap.get(props.type) ?? 'info-circle-solid'
)
// div 高度
const boxHeight = ref(0)

const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  offset: props.offset,
  boxHeight
})

const customStyle = computed(() => ({
  top: addUnit(topOffset.value),
  zIndex: props.zIndex
}))

// ⏲ message 计时
let timer: number
const startTimer = () => {
  if (props.duration === 0) return
  timer = delay(close, props.duration)
}
const clearTimer = () => {
  clearTimeout(timer)
}
const close = () => {
  visible.value = false
}

// 退出动画
watch(visible, (val) => {
  if (!val) boxHeight.value = -props.offset
})

// ESC 退出
useEventListener(document, 'keydown', (e: Event) => {
  const { code } = e as KeyboardEvent
  if (code === 'Escape') close()
})

onMounted(() => {
  visible.value = true
  startTimer()
})

defineExpose<MessageCompInstance>({
  bottomOffset,
  close
})
</script>

<template>
  <Transition
    :name="transitionName"
    @enter="() => (boxHeight = messageRef!.getBoundingClientRect().height)"
    @after-leave="!visible && onDestory()"
  >
    <div
      class="px-message"
      ref="messageRef"
      :class="{
        [`px-message--${type}`]: type,
        'is-close': showClose,
        'text-center': center
      }"
      :style="customStyle"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <px-icon class="px-message__icon" :icon="iconName" />
      <div class="px-message__content">
        <slot>
          <RenderVNode v-if="message" :vNode="message" />
        </slot>
      </div>
      <div class="px-message__close" v-if="showClose">
        <px-icon icon="times-solid" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import './style.css';
</style>
