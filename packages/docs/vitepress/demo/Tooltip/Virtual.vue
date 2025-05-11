<script setup lang="ts">
import { ref } from 'vue'
import type { ButtonInstance } from '@mmt817/pixel-ui'

const virtualTrigger = ref<ButtonInstance>()
</script>

<template>
  <px-tooltip
    content="Bottom center"
    placement="bottom"
    trigger="hover"
    virtual-triggering
    :virtual-ref="virtualTrigger?.ref"
  ></px-tooltip>
  <px-button ref="virtualTrigger" size="small">virtual trigger</px-button>
</template>
