<script setup lang="ts">
import { computed, inject } from 'vue'
import { DROPDOWN_CTX_KEY } from './contants'
import { useId } from '@pixel-ui/hooks'

import type { DropdownItemProps } from './types.dropdownItem'

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
