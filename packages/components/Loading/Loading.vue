<script setup lang="ts">
import { computed, type Ref } from 'vue'
import { isString } from 'lodash-es'
import type { LoadingOptions } from './types'

import PxIcon from '../Icon/Icon.vue'

const COMP_NAME = 'PxLoading' as const
defineOptions({
  name: COMP_NAME,
  inheritAttrs: false
})

const props = defineProps<LoadingOptions>()

const iconName = computed(() => {
  if (isString(props.spinner)) return props.spinner
  return 'spinner-solid'
})
</script>

<template>
  <transition name="fade-in-linear" @after-leave="onAfterLeave">
    <div
      v-show="(props.visible as Ref).value"
      class="px-loading px-loading__mask"
      :class="[customClass, { 'is-fullscreen': fullscreen }]"
    >
      <div class="px-loading__spinner">
        <px-icon v-if="props.spinner !== false" :icon="iconName" spin />
        <p v-if="text" class="px-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<style>
@import './style.css';
.px-loading {
  --px-loading-bg-color: v-bind(background) !important;
  --px-loading-z-index: v-bind(zIndex) !important;
}
</style>
