<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import { isNil, omit } from 'lodash-es'
import { DROPDOWN_CTX_KEY } from './contants'
// import { useDisabledStyle } from '@pixel-ui/hooks'

import type {
  DropdownProps,
  DropdownEmits,
  DropdownInstance,
  DropdownContext
} from './types.dropdown'
import type { DropdownItemProps } from './types.dropdownItem'
import type { TooltipInstance } from '../Tooltip'
import { type ButtonInstance, PxButton, PxButtonGroup } from '../Button'

import PxTooltip from '../Tooltip/Tooltip.vue'
import DropdownItem from './DropdownItem.vue'

const COMP_NAME = 'PxDropdown' as const
defineOptions({
  name: COMP_NAME,
  inheritAttrs: false
})

const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true,
  items: () => [] as DropdownItemProps[]
})
const emits = defineEmits<DropdownEmits>()

const tooltipRef = ref<TooltipInstance>()
const triggerRef = ref<ButtonInstance>()

const tooltipProps = computed(() =>
  omit(props, ['items', 'hideAfterClick', 'size', 'type', 'splitButton'])
)

// emits
// tooltip 显示变化
const handleVisibleChange = (visible: boolean) => {
  emits('visible-change', visible)
}
// splitButton 下拉菜单点击
const handleSplitButtonClick = (e: MouseEvent) => {
  emits('click', e)
}

// dropdown-item click
const handleItemClick = (e: DropdownItemProps) => {
  // 点击菜单项后是否隐藏下拉菜单
  props.hideOnClick && tooltipRef.value?.hide()

  !isNil(e.command) && emits('command', e.command)
}

// todo: 非测试环境下, disabled 样式特殊处理
// !TEST && useDisabledStyle()

// provide ctx
provide<DropdownContext>(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size)
})

// 暴露方法
defineExpose<DropdownInstance>({
  open: () => tooltipRef.value?.show(),
  close: () => tooltipRef.value?.hide()
})
</script>

<template>
  <div class="px-dropdown" :class="{ 'is-disabled': props.disabled }">
    <px-tooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="splitButton"
      :virtual-ref="triggerRef?.ref.value"
      @visible-change="handleVisibleChange"
    >
      <px-button-group
        v-if="splitButton"
        :type="type"
        :size="size"
        :disabled="props.disabled"
      >
        <px-button @click="handleSplitButtonClick">
          <slot name="default"></slot>
        </px-button>
        <px-button ref="triggerRef" icon="angle-down"></px-button>
      </px-button-group>

      <slot name="default" v-else></slot>

      <template #content>
        <div class="px-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command">
              <dropdown-item v-bind="item"></dropdown-item>
            </template>
          </slot>
        </div>
      </template>
    </px-tooltip>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
