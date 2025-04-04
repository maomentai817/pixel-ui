<script setup lang="ts">
import { inject, computed, defineAsyncComponent } from 'vue'

import type { CollapseItemProps } from './types'
import { COLLAPSE_CTX_KEY } from './contants'

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
      <px-icon icon="angle-right" class="header-angle"></px-icon>
    </div>
    <div class="px-collapse-item__wrapper" v-show="isActive">
      <div class="px-collapse-item__content" :id="`item-content-${name}`">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
