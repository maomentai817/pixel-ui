<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useId } from '@pixel-ui/hooks'
import type { SwitchProps, SwitchEmits, SwitchInstance } from './types'

import PxIcon from '../Icon/Icon.vue'

const COMP_NAME = 'PxSwitch' as const
defineOptions({
  name: COMP_NAME
  // inheritAttrs: false
})

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false
})

const emits = defineEmits<SwitchEmits>()
// 禁用
const isDisabled = computed(() => props.disabled)
// 表单值相关
const innerValue = ref(props.modelValue)
const inputRef = ref<HTMLInputElement>()
const inputId = useId().value
const checked = computed(() => innerValue.value === props.activeValue)

const focus: SwitchInstance['focus'] = () => {
  inputRef.value?.focus()
}
const handleChange = () => {
  if (isDisabled.value) return

  const newVal = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newVal

  emits('update:modelValue', newVal)
  emits('change', newVal)
}

onMounted(() => {
  inputRef.value!.checked = checked.value
})

watch(checked, (val) => {
  inputRef.value!.checked = val
  //todo form 表单校验
})

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal
  }
)

// 暴露方法
defineExpose<SwitchInstance>({
  focus,
  checked
})
</script>

<template>
  <div
    class="px-switch"
    :class="{
      [`px-switch--${size}`]: size,
      'is-disabled': isDisabled,
      'is-checked': checked
    }"
    @click="handleChange"
  >
    <input
      class="px-switch__input"
      type="checkbox"
      role="switch"
      ref="inputRef"
      :id="inputId"
      :name="name"
      :disabled="isDisabled"
      :checked="checked"
      @keydown.enter="handleChange"
    />
    <span
      v-if="!inlinePrompt && (inactiveIcon || inactiveText)"
      class="px-switch__label px-switch__label--left"
      :class="{ 'is-active': !checked }"
    >
      <px-icon v-if="inactiveIcon" :icon="inactiveIcon" />
      <span v-if="!inactiveIcon && inactiveText">{{ inactiveText }}</span>
    </span>
    <span class="px-switch__core">
      <div v-if="inlinePrompt" class="px-switch__core-inner">
        <template v-if="activeIcon || inactiveIcon">
          <px-icon
            class="px-switch__core-inner-icon"
            :icon="checked ? (activeIcon ?? '') : (inactiveIcon ?? '')"
          />
        </template>
        <template v-else-if="activeText || inactiveText">
          <span class="px-switch__core-inner-text">
            {{ checked ? activeText : inactiveText }}
          </span>
        </template>
      </div>
      <div class="px-switch__core-action">
        <px-icon v-if="loading" icon="spinner-third" />
        <slot v-else-if="checked" name="active-action">
          <px-icon v-if="activeActionIcon" :icon="activeActionIcon" />
        </slot>
        <slot v-else-if="!checked" name="inactive-action">
          <px-icon v-if="inactiveActionIcon" :icon="inactiveActionIcon" />
        </slot>
      </div>
    </span>
    <span
      v-if="!inlinePrompt && (activeIcon || activeText)"
      class="px-switch__label px-switch__label--right"
      :class="{ 'is-active': checked }"
    >
      <px-icon v-if="activeIcon" :icon="activeIcon" />
      <span v-if="!activeIcon && activeText">{{ activeText }}</span>
    </span>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
