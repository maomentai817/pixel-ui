<script lang="ts" setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>
<template>
  <px-tooltip
    :disabled="disabled"
    content="click to close tooltip function"
    placement="bottom"
  >
    <px-button @click="disabled = !disabled" size="small">
      click to {{ disabled ? 'active' : 'close' }} tooltip function
    </px-button>
  </px-tooltip>
</template>
