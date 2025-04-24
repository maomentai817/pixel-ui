<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'

const COMP_NAME = 'PxTooltip' as const
defineOptions({
  name: COMP_NAME
})

// 虚拟节点
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
console.log(props)

const emits = defineEmits<TooltipEmits>()
console.log(emits)

// 显示隐藏
const show: TooltipInstance['show'] = () => {
  console.log('show')
}
const hide: TooltipInstance['hide'] = () => {
  console.log('hide')
}
// 暴露方法
defineExpose<TooltipInstance>({
  show,
  hide
})
</script>

<template>12</template>

<style scoped>
@import './style.css';
</style>
