<script setup lang="ts">
import PxIcon from '../Icon/Icon.vue'

const COMP_NAME = 'PxInput' as const
defineOptions({
  name: COMP_NAME
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
          :id="inputId"
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
            icon="times-solid"
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
        :id="inputId"
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
