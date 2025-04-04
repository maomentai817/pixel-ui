<script setup lang="ts">
import type { CollapseProps, CollapseEmits } from './types'

defineOptions({
  name: 'PxCollapse'
})

const props = defineProps<CollapseProps>()
const emit = defineEmits<CollapseEmits>()
</script>

<template>
  <div class="px-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
