<script setup lang="ts">
import {
  computed,
  ref,
  shallowRef,
  useAttrs,
  nextTick,
  watch,
  type StyleValue
} from 'vue'
import { each, noop } from 'lodash-es'
import { useFocusController, useId } from '@pixel-ui/hooks'
import type { InputProps, InputEmits, InputInstance } from './types'

import PxIcon from '../Icon/Icon.vue'

const COMP_NAME = 'PxInput' as const
defineOptions({
  name: COMP_NAME,
  inheritAttrs: false
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'default',
  autocomplete: 'off'
})

const emits = defineEmits<InputEmits>()

// 表单双向绑定数据
const innerValue = ref(props.modelValue)
// pwd 可见性
const pwdVisible = ref(false)
// input 元素
const inputRef = shallowRef<HTMLInputElement>()
// textarea 元素
const textareaRef = shallowRef<HTMLTextAreaElement>()

const attrs = useAttrs()

// 拦截行内样式
const containerStyle = computed<StyleValue>(() => [attrs.style as StyleValue])

// 获取原生元素
const _ref = computed(() => inputRef.value || textareaRef.value)

//todo: Form 组件传递禁用状态
const isDisabled = computed(() => props.disabled)
//todo: Form 获取 FormItem
//todo: FormItem 获取 id

// focusController 获取状态
const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(
  _ref,
  {
    afterBlur() {
      // form 校验
      // formItem?.validate('blur').catch((err) => debugWarn(err))
    }
  }
)
// 清除按钮显示
const showClear = computed(
  () =>
    props.clearable &&
    !!innerValue.value &&
    !isDisabled.value &&
    isFocused.value
)

// 显示密码
const showPwdArea = computed(
  () =>
    props.type === 'password' &&
    props.showPassword &&
    !isDisabled.value &&
    !!innerValue.value
)

// input 方法及暴露方法
const clear: InputInstance['clear'] = function () {
  innerValue.value = ''
  each(['input', 'change', 'update:modelValue'], (e) => emits(e as any, ''))
  emits('clear')
  // 清空表单校验
  // formItem?.clearValidate()
}
const focus: InputInstance['focus'] = async function () {
  await nextTick()
  _ref.value?.focus()
}

const blur: InputInstance['blur'] = function () {
  _ref.value?.blur()
}

const select: InputInstance['select'] = function () {
  _ref.value?.select()
}

// 事件父子通信
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}

const handleChange = () => {
  emits('change', innerValue.value)
}

// pwd 可见切换
const togglePwdVisible = () => {
  pwdVisible.value = !pwdVisible.value
}

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal
    // 表单校验出发
    // formItem?.validate("change").catch((err) => debugWarn(err));
  }
)

defineExpose<InputInstance>({
  ref: _ref,
  focus,
  blur,
  select,
  clear
})
</script>

<template>
  <div
    class="px-input"
    :class="{
      [`px-input--${type}`]: type,
      [`px-input--${size}`]: size,
      'is-disabled': isDisabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocused
    }"
    :style="containerStyle"
  >
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="px-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="px-input__wrapper" ref="wrapperRef">
        <span v-if="$slots.prefix" class="px-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          class="px-input__inner"
          ref="inputRef"
          :id="useId().value"
          :type="showPassword ? (pwdVisible ? 'text' : 'password') : type"
          :disabled="isDisabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          v-bind="attrs"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <span
          v-if="$slots.suffix || showClear || showPwdArea"
          class="px-input__suffix"
        >
          <slot name="suffix"></slot>
          <px-icon
            icon="times-circle"
            v-if="showClear"
            class="px-input__clear"
            @click="clear"
            @mousedown.prevent="noop"
          />
          <px-icon
            icon="eye"
            class="px-input__password"
            v-if="showPwdArea && pwdVisible"
            @click="togglePwdVisible"
          />
          <px-icon
            icon="eye-cross"
            class="px-input__password"
            v-if="showPwdArea && !pwdVisible"
            @click="togglePwdVisible"
          />
        </span>
      </div>
      <div v-if="$slots.append" class="px-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea
        class="px-textarea__wrapper"
        ref="textareaRef"
        :id="useId().value"
        :disabled="isDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        v-bind="attrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </template>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
