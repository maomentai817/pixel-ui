<script setup lang="ts">
import { ref } from 'vue'
import type { TooltipInstance } from '@mmt817/pixel-ui'

const tooltipRef = ref<TooltipInstance>()
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
</script>

<template>
  <px-tooltip ref="tooltipRef" content="手动控制的提示" manual placement="top">
    <px-button>手动控制提示</px-button>
  </px-tooltip>
  <div class="mt-20 gap-10">
    <px-button @click="open">显示</px-button>
    <px-button @click="close">隐藏</px-button>
  </div>
</template>
