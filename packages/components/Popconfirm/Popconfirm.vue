<script setup lang="ts">
import type { PopconfirmProps, PopconfirmEmits } from './types'

import PxTooltip from '../Tooltip/Tooltip.vue'

const COMP_NAME = 'PxPopconfirm' as const
defineOptions({
  name: COMP_NAME
})

withDefaults(defineProps<PopconfirmProps>(), {
  confirmButtonType: 'primary',
  icon: 'question-solid',
  iconColor: '#f90',
  hideAfter: 200,
  width: 150
})

const emits = defineEmits<PopconfirmEmits>()
const confirm = (e: MouseEvent) => {
  emits('confirm', e)
}
const cancel = (e: MouseEvent) => {
  emits('cancel', e)
}
</script>

<template>
  12
  <px-tooltip></px-tooltip>
</template>

<style scoped>
@import './style.css';
</style>
