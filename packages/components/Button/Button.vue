<script setup lang="ts">
import { ref, onMounted } from 'vue' 
import { throttle } from 'lodash-es'
import type { ButtonProps,ButtonEmits, ButtonInstance } from './types'
import workletURL from '../worklets/pixelbox.js?url'

defineOptions({
  name: 'PxButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500
})

const slots = defineSlots()

const _ref = ref<HTMLButtonElement>()

const emit = defineEmits<ButtonEmits>()

// 点击节流逻辑
const handleBtnClick = (e: MouseEvent) => emit('click', e)
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration)

// 暴露方法
defineExpose<ButtonInstance>({
  ref: _ref
})

// CSS Houdini Paint Worklet
const paint = () => {
  try {
    if ('paintWorklet' in CSS) {
      (CSS as any).paintWorklet.addModule(workletURL);
    } else {
      console.warn('CSS Houdini Paint Worklet API is not supported in this browser.');
    }
  } catch (error) {
    console.error('Error loading Paint Worklet:', error);
  }
};

onMounted(async () => { 
  paint()
})
</script>

<template>
  <component
    :is="props.tag"
    ref="_ref"
    class="px-button"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`px-button--${type}`]: type,
      [`px-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    @click="(e: MouseEvent) => useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)"
  >
    <slot></slot>
  </component>
</template>

<style scoped>
@import './style.css';
</style>