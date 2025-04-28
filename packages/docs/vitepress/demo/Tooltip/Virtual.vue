<script setup leng="ts">
import { ref, computed } from 'vue'

const virtualTrigger = ref()

const virtualRef = computed(() => {
  const el = virtualTrigger.value
  return el?.$el ?? el
})
</script>

<template>
  <px-tooltip
    content="Bottom center"
    placement="bottom"
    trigger="hover"
    virtual-triggering
    :virtual-ref="virtualRef"
  ></px-tooltip>
  <px-button ref="virtualTrigger" size="small">virtual trigger</px-button>
</template>
