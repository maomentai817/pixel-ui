<script setup lang="ts">
import { provide, ref, watch } from 'vue'

import type { CollapseProps, CollapseEmits, CollapseItemName } from './types'
import { COLLAPSE_CTX_KEY } from './contants'

defineOptions({
  name: 'PxCollapse'
})

const props = defineProps<CollapseProps>()
const emit = defineEmits<CollapseEmits>()

const activeNames = ref(props.modelValue)

// accordion mode throw error
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one active item')
}

const handleItemClick = (name: CollapseItemName) => {
  let _activeNames = [...activeNames.value]
  // accordion mode
  if (props.accordion) {
    _activeNames = [_activeNames[0] === name ? '' : name]
    updateActiveNames(_activeNames)
    return
  }

  const index = _activeNames.indexOf(name)
  if (index > -1) {
    // close
    _activeNames.splice(index, 1)
  } else {
    // expand
    _activeNames.push(name)
  }

  updateActiveNames(_activeNames)
}

const updateActiveNames = (newNames: CollapseItemName[]) => {
  activeNames.value = newNames
  emit('update:modelValue', newNames)
  emit('change', newNames)
}

watch(
  () => props.modelValue,
  (newNames) => updateActiveNames(newNames)
)

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick
})
</script>

<template>
  <div class="px-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
