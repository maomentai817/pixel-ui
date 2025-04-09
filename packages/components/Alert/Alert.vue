<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { typeIconMap, debugWarn } from '@pixel-ui/utils'
import type { AlertProps, AlertEmits, AlertInstance } from './types'

import PxIcon from '../Icon/Icon.vue'
import workletURL from '../worklets/pixelbox.js?url'

const COMP_NAME = 'PxAlert' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  type: 'info',
  closable: true
})

const emits = defineEmits<AlertEmits>()
const slots = defineSlots()

// alert 可见性
const visible = ref(true)

const iconName = computed(() => typeIconMap.get(props.type) ?? 'info-circle')
const withDescription = computed(() => props.description || slots.default)

const close = () => {
  visible.value = false
  emits('close')
}

const open = () => {
  visible.value = true
}

defineExpose<AlertInstance>({
  open,
  close
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
  <transition name="px-alert-fade">
    <div
      class="px-alert"
      role="alert"
      v-show="visible"
      :class="{
        [`px-alert--${type}`]: type,
        [`px-alert--${effect}`]: effect,
        'text-center': center
      }"
    >
      <px-icon
        v-show="showIcon"
        class="px-alert__icon"
        :icon="iconName"
        :class="{ 'big-icon': withDescription }"
      ></px-icon>
      <div class="px-alert__content">
        <span
          class="px-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="px-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="px-alert__close" v-if="closable">
          <px-icon
            class="px-alert__close-icon"
            icon="times-solid"
            @click.stop="close"
          ></px-icon>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>
