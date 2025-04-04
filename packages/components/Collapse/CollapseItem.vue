<script setup lang="ts">
import type { CollapseItemProps } from './types'

defineOptions({
  name: 'PxCollapseItem'
})

defineProps<CollapseItemProps>()
</script>

<template>
  <div class="px-collapse-item"></div>
</template>

<style scoped>
@import './style.css';
</style>
