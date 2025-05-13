<script setup lang="ts">
import { throttle } from 'lodash-es'
import { BUTTON_GROUP_CTX_KEY } from './contants'
import { ref, onMounted, computed, inject } from 'vue'
import { debugWarn } from '@pixel-ui/utils'
import { usePxButtonCustomStyle } from '@pixel-ui/hooks'
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types.button'

import PxIcon from '../Icon/Icon.vue'
import workletURL from '../worklets/dist/pixelbox.worklet.js?url'

// 异步引入解决打包依赖循环问题
// import { defineAsyncComponent } from 'vue'

// const PxIcon = defineAsyncComponent(() => import('../Icon/Icon.vue'))

const COMP_NAME = 'PxButton' as const
defineOptions({
  name: COMP_NAME
})
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  loadingIcon: 'spinner',
  useThrottle: true,
  throttleDuration: 500
})

// 改造传值, 允许依赖注入
const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0)
const size = computed(() => ctx?.size ?? props?.size ?? '')
const type = computed(() => ctx?.type ?? props?.type ?? '')
const disabled = computed(() => ctx?.disabled || props?.disabled || false)
const round = computed(() => ctx?.round || props?.round || false)
const circle = computed(() => ctx?.circle || props?.circle || false)
// 自定义颜色
const color = computed(() => ctx?.color || props?.color || void 0)

const slots = defineSlots()

const _ref = ref<HTMLButtonElement>()

const emit = defineEmits<ButtonEmits>()

// 服务于单个圆形icon
const iconStyle = computed(() => ({
  marginRight: props.label || slots.default ? '6px' : '0px'
}))

// 自定义颜色
const colorStyle = usePxButtonCustomStyle(props, color)

// 点击节流逻辑
const handleBtnClick = (e: MouseEvent) => emit('click', e)
const handleBtnClickThrottle = throttle(
  handleBtnClick,
  props.throttleDuration,
  { trailing: false }
)

// 暴露方法
defineExpose<ButtonInstance>({
  ref: _ref,
  disabled,
  size,
  type
})

// CSS Houdini Paint Worklet
const paint = () => {
  try {
    if ('paintWorklet' in CSS) {
      ;(CSS as any).paintWorklet.addModule(workletURL)
    } else {
      debugWarn(
        COMP_NAME,
        'CSS Houdini Paint Worklet API is not supported in this browser.'
      )
    }
    // (CSS as any).paintWorklet.addModule(workletURL)
  } catch (error) {
    console.error('Error loading Paint Worklet:', error)
  }
}

onMounted(async () => {
  paint()
})
</script>

<template>
  <component
    ref="_ref"
    class="px-button"
    :is="tag"
    :autofocus="autofocus"
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
      'is-custom': color
    }"
    :style="colorStyle"
    @click="
      (e: MouseEvent) =>
        useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)
    "
  >
    <template v-if="loading">
      <slot name="loading">
        <px-icon
          class="loading-icon"
          spin
          :icon="loadingIcon"
          :style="iconStyle"
        />
      </slot>
    </template>
    <px-icon v-if="icon && !loading" :icon="icon" :style="iconStyle" />
    <span v-if="label || $slots.default">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<style scoped>
@import './style.css';
</style>
