<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'
import { DROPDOWN_CTX_KEY } from './contants'
import { useId } from '@pixel-ui/hooks'
import { debugWarn } from '@pixel-ui/utils'

import type { DropdownItemProps } from './types.dropdownItem'

import workletBoxURL from '../worklets/dist/pixelbox.worklet.js?url'

const COMP_NAME = 'PxDropdownItem' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<DropdownItemProps>(), {
  disabled: false,
  divided: false,
  command: useId().value
})

const ctx = inject(DROPDOWN_CTX_KEY)
const size = computed(() => ctx?.size.value)

const handleItemClick = () => {
  if (props.disabled) return
  ctx?.handleItemClick(props)
}

// CSS Houdini Paint Worklet
const paint = () => {
  try {
    if ('paintWorklet' in CSS) {
      ;(CSS as any).paintWorklet.addModule(workletBoxURL)
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
  <li v-if="divided" role="separator" class="divided-placeholder"></li>
  <li
    :id="`dropdown-item-${command ?? useId().value}`"
    :class="{
      'px-dropdown__item': true,
      [`px-dropdown__item--${size}`]: size,
      'is-disabled': disabled,
      'is-divided': divided
    }"
    @click="handleItemClick"
  >
    <slot>{{ label }}</slot>
  </li>
</template>

<style scoped>
@import './style.css';
</style>
