<script setup lang="ts">
import { computed } from 'vue';
import type { IconProps } from './types';

defineOptions({
  name: 'PxIcon'
})

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
})

// icon 部分简单属性样式处理
const customStyle = computed(() => ({
  color: props.color ?? void 0,
  fontSize: `${props.size}px`,
  rotate: props.rotation ? `${props.rotation}deg` : void 0,
}))
</script>

<template>
  <i
    class="px-icon hn"
    :class="{
      [`px-icon--${type}`]: type,
      [`hn-${icon}`]: icon,
      [`px-icon--${flip}`]: flip,
      'is-spin': spin,
      'is-bounce': bounce,
      'is-shake': shake,
      'is-beat': beat,
    }"
    :style="customStyle"
  >
  </i>
</template>

<style scoped>
@import './style.css';
</style>