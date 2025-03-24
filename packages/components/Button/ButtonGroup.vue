<script setup lang="ts">
import type { ButtonGroupProps } from './types'
import { provide, toRef, reactive } from 'vue'
import { BUTTON_GROUP_CTX_KEY } from './contants'

defineOptions({
  name: 'PxButtonGroup',
})

const props = defineProps<ButtonGroupProps>()

provide(BUTTON_GROUP_CTX_KEY, reactive({
  size: toRef(props, 'size'),
  type: toRef(props, 'type'),
  disabled: toRef(props, 'disabled'),
}))
</script>

<template>
  <div class="px-button-group">
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>