<script setup lang="ts">
import type { ButtonGroupProps } from './types'
import { provide, toRef, reactive } from 'vue'
import { BUTTON_GROUP_CTX_KEY } from './contants'

defineOptions({
  name: 'PxButtonGroup',
})

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  type: 'base'
})

provide(BUTTON_GROUP_CTX_KEY, reactive({
  size: toRef(props, 'size'),
  type: toRef(props, 'type'),
  disabled: toRef(props, 'disabled'),
  round: toRef(props, 'round'),
  circle: toRef(props, 'circle'),
  color: toRef(props, 'color')
}))
</script>

<template>
  <div 
    class="px-button-group"
    :class="{[`px-button-group--${type}`]: type}"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>