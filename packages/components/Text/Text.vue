<script setup lang="ts">
import { computed } from 'vue'
import type { TextProps } from './types'

defineOptions({
  name: 'PxText',
})
const props = withDefaults(defineProps<TextProps>(), {
  size: 16,
  bold: false,
  tag: 'span',
  compact: false,
})
// text 部分简单属性样式处理
const customStyle = computed(() => ({
  color: props.color ?? void 0,
  fontSize: `${props.size}px`,
  fontWeight: props.bold ? 'bold' : void 0,
  textAlign: props.align ?? void 0,
}))
</script>

<template>
  <component 
    class="px-text"
    :is="tag"
    :class="{
      [`px-text--${type}`]: type,
      'is-compact': compact,
    }"
    :style="customStyle"
  >
		<slot></slot>
	</component>
</template>

<style scoped>
@import './style.css';
</style>