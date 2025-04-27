<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  watchEffect,
  onUnmounted,
  onMounted,
  type Ref
} from 'vue'
import { createPopper, type Instance } from '@popperjs/core'
import { bind, debounce, type DebouncedFunc } from 'lodash-es'
import { useClickOutside } from '@pixel-ui/hooks'
import { debugWarn } from '@pixel-ui/utils'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'

import workletBoxURL from '../worklets/dist/pixelbox.worklet.js?url'

const COMP_NAME = 'PxTooltip' as const
defineOptions({
  name: COMP_NAME
})

//todo 虚拟节点
interface _TooltipProps extends TooltipProps {
  virtualRef?: HTMLElement | void
  virtualTriggering?: boolean
}

const props = withDefaults(defineProps<_TooltipProps>(), {
  trigger: 'hover',
  placement: 'bottom',
  transition: 'fade',
  showTimeout: 0,
  hideTimeout: 200
})

const emits = defineEmits<TooltipEmits>()
const visible = ref(false)
// 事件
const events: Ref<Record<string, EventListener>> = ref({})
const outerEvents: Ref<Record<string, EventListener>> = ref({})
const dropdownEvents: Ref<Record<string, EventListener>> = ref({})

// ref 实例
const containerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()

// popperjs 配置封装
const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    }
  ],
  ...props.popperOptions
}))

// hover trigger 延时
const openDelay = computed(() =>
  props.trigger === 'hover' ? props.showTimeout : 0
)
const closeDelay = computed(() =>
  props.trigger === 'hover' ? props.hideTimeout : 0
)

// 一些方法
let openDebounce: DebouncedFunc<() => void> | void
let closeDebounce: DebouncedFunc<() => void> | void

function openFinal() {
  closeDebounce?.cancel()
  openDebounce?.()
}

function closeFinal() {
  openDebounce?.cancel()
  closeDebounce?.()
}

function togglePopper() {
  visible.value ? closeFinal() : openFinal()
}

function setVisible(val: boolean) {
  if (props.disabled) return
  visible.value = val
  emits('visible-change', val)
}

// trigger events 绑定
const triggerStrategyMap: Map<string, () => void> = new Map()
triggerStrategyMap.set('hover', () => {
  events.value['mouseenter'] = openFinal
  outerEvents.value['mouseleave'] = closeFinal
  dropdownEvents.value['mouseenter'] = openFinal
})
triggerStrategyMap.set('click', () => {
  events.value['click'] = togglePopper
})
triggerStrategyMap.set('contextmenu', () => {
  events.value['contextmenu'] = (e) => {
    e.preventDefault()
    openFinal()
  }
})
function attachEvents() {
  if (props.disabled || props.manual) return

  triggerStrategyMap.get(props.trigger)?.()
}

// popperjs 封装
let popperInstance: null | Instance

function destroyPopperInstance() {
  popperInstance?.destroy()
  popperInstance = null
}

function resetEvents() {
  events.value = {}
  outerEvents.value = {}
  dropdownEvents.value = {}

  attachEvents()
}

// 不同情况下 popper 实例处理
watch(
  visible,
  (val) => {
    if (!val) return
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value
      )
    }
  },
  { flush: 'post' }
)

watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      resetEvents()
      return
    }
    attachEvents()
  }
)

watch(
  () => props.trigger,
  () => {
    openDebounce?.cancel()
    visible.value = false
    emits('visible-change', false)
    resetEvents()
  }
)

// 防抖绑定
watchEffect(() => {
  if (!props.manual) {
    attachEvents()
  }
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value)
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value)
})

// 外部点击关闭处理 hooks
useClickOutside(containerNode, () => {
  emits('click-outside')
  if (props.trigger === 'hover' || props.manual) return

  visible.value && closeFinal()
})

// 显示隐藏
const show: TooltipInstance['show'] = openFinal
const hide: TooltipInstance['hide'] = () => {
  openDebounce?.cancel()
  setVisible(false)
}
// 暴露方法
defineExpose<TooltipInstance>({
  show,
  hide
})

// 注销
onUnmounted(() => {
  destroyPopperInstance()
})

// CSS Houdini Paint Worklet
const paint = () => {
  try {
    if ('paintWorklet' in CSS) {
      ;(CSS as any).paintWorklet.addModule(workletBoxURL)
    } else {
      debugWarn(
        COMP_NAME,
        'CSS Houdini Paint Worklet API is not supported in this browser.'
      )
    }
    // (CSS as any).paintWorklet.addModule(workletURL)
  } catch (error) {
    console.error('Error loading Paint Worklet:', error)
  }
}

onMounted(() => {
  paint()
})
</script>

<template>
  <div class="px-tooltip" ref="containerNode" v-on="outerEvents">
    <div
      class="px-tooltip__trigger"
      ref="triggerNode"
      v-on="events"
      v-if="!virtualTriggering"
    >
      <slot></slot>
    </div>
    <slot name="default" v-else></slot>

    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div
        class="px-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvents"
        v-if="visible"
      >
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
