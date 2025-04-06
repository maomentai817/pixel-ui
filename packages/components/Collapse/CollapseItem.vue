<script setup lang="ts">
import { inject, computed, defineAsyncComponent, onMounted } from 'vue'

import type { CollapseItemProps } from './types'
import { COLLAPSE_CTX_KEY } from './contants'
import workletPanelURL from '../worklets/pixelpanel.js?url'
import workletContentURL from '../worklets/pixelcontent.js?url'
import transitionEvents from './transitionEvents'

// 异步引入, 避免打包后报错
const PxIcon = defineAsyncComponent(() => import('../Icon/Icon.vue'))

defineOptions({
  name: 'PxCollapseItem'
})

const props = defineProps<CollapseItemProps>()

const ctx = inject(COLLAPSE_CTX_KEY, void 0)

const isActive = computed(() => ctx?.activeNames.value?.includes(props.name))

const handleClick = () => {
  // disabled
  if (props.disabled) return

  ctx?.handleItemClick(props.name)
}

// CSS Houdini Paint Worklet
const paint = () => {
  try {
    if ('paintWorklet' in CSS) {
      ;(CSS as any).paintWorklet.addModule(workletPanelURL)
      ;(CSS as any).paintWorklet.addModule(workletContentURL)
    } else {
      console.warn(
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
  <div class="px-collapse-item" :class="{ 'is-disabled': disabled }">
    <div
      class="px-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive
      }"
      @click="handleClick"
    >
      <span class="px-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </span>
      <px-icon
        :icon="icon || 'angle-right'"
        class="header-angle"
        size="20"
        :color="
          disabled
            ? 'var(--px-text-color-disabled)'
            : 'var(--px-text-color-base)'
        "
      ></px-icon>
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="px-collapse-item__wrapper" v-show="isActive">
        <div class="px-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
