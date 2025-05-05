<script setup lang="ts">
import PxTooltip from '../Tooltip/Tooltip.vue'

const COMP_NAME = 'PxPopconfirm' as const
defineOptions({
  name: COMP_NAME
})
</script>

<template>
  <px-tooltip></px-tooltip>
</template>

<style scoped>
@import './style.css';
</style>
