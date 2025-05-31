<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { delay, bind } from 'lodash-es'
import { getLastBottomOffset } from './methods'
import { useOffset } from '@pixel-ui/hooks'
import { addUnit, typeIconMap, RenderVNode } from '@pixel-ui/utils'

import type { NotificationPropsIn, NotificationCompInstance } from './types'

import PxIcon from '../Icon/Icon.vue'

const COMP_NAME = 'PxNotification' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<NotificationPropsIn>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  position: 'top-right',
  transitionName: 'fade',
  showClose: true
})

const visible = ref(false)
const notifyRef = ref<HTMLDivElement>()
const iconName = computed(
  () => props.icon ?? typeIconMap.get(props.type) ?? 'info-circle-solid'
)
// div 高度
const boxHeight = ref(0)

const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  offset: props.offset,
  boxHeight
})

// 水平位置
const horizontalClass = computed(() =>
  props.position.endsWith('right') ? 'right' : 'left'
)
// 垂直位置
const verticalClass = computed(() =>
  props.position.startsWith('top') ? 'top' : 'bottom'
)

const customStyle = computed(() => ({
  [verticalClass.value]: addUnit(topOffset.value),
  zIndex: props.zIndex
}))

// ⏲ notification 计时
let timer: number
function startTimmer() {
  if (props.duration === 0) return
  timer = delay(close, props.duration)
}

function clearTimer() {
  clearTimeout(timer)
}

function close() {
  visible.value = false
  props.onClose?.()
}

onMounted(() => {
  visible.value = true
  startTimmer()
})

// 暴露方法
defineExpose<NotificationCompInstance>({
  bottomOffset,
  close
})
</script>

<template>
  <transition
    :name="transitionName"
    @enter="() => (boxHeight = notifyRef!.getBoundingClientRect().height)"
    @after-leave="!visible && onDestory()"
  >
    <div
      class="px-notification"
      ref="notifyRef"
      :class="{
        [`px-notification--${type}`]: type,
        [horizontalClass]: true,
        'is-close': showClose
      }"
      :style="customStyle"
      v-show="visible"
      role="alert"
      @click="onClick"
      @mouseenter="clearTimer"
      @mouseleave="startTimmer"
    >
      <px-icon class="px-notification__icon" :icon="iconName" />
      <div class="px-notification__text">
        <div class="px-notification__title">{{ title }}</div>
        <div class="px-notification__content">
          <slot>
            <RenderVNode v-if="message" :vNode="message" />
          </slot>
        </div>
      </div>
      <div class="px-notification__close" v-if="showClose">
        <px-icon icon="times-solid" @click.stop="close" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>
