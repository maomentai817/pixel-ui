<script setup lang="ts">
import { computed, ref } from 'vue'
import { addUnit } from '@pixel-ui/utils'
import { useLocale } from '@pixel-ui/hooks'
import type { PopconfirmProps, PopconfirmEmits } from './types'
import type { TooltipInstance } from '../Tooltip'

import PxTooltip from '../Tooltip/Tooltip.vue'
import PxButton from '../Button/Button.vue'
import PxIcon from '../Icon/Icon.vue'

const COMP_NAME = 'PxPopconfirm' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<PopconfirmProps>(), {
  confirmButtonType: 'primary',
  icon: 'question-solid',
  iconColor: '#f90',
  hideAfter: 200,
  width: 200
})

const locale = useLocale()
const emits = defineEmits<PopconfirmEmits>()
const tooltipRef = ref<TooltipInstance>()
const style = computed(() => ({ width: addUnit(props.width) }))

const hidePoper = () => {
  tooltipRef.value?.hide()
}
const confirm = (e: MouseEvent) => {
  emits('confirm', e)
  hidePoper()
}
const cancel = (e: MouseEvent) => {
  emits('cancel', e)
  hidePoper()
}
</script>

<template>
  <px-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
    <template #content>
      <div class="px-popconfirm" :style="style">
        <div class="px-popconfirm__main">
          <px-icon
            v-if="!hideIcon && icon"
            :icon="icon"
            :color="iconColor"
            :size="20"
          />
          {{ title }}
        </div>
        <div class="px-popconfirm__action">
          <slot name="actions" :confirm="confirm" :cancel="cancel">
            <px-button
              class="px-popconfirm__cancel"
              size="small"
              :type="cancelButtonType"
              @click="cancel"
            >
              {{
                cancelButtonText || locale.t('el.popconfirm.cancelButtonText')
              }}
            </px-button>
            <px-button
              class="px-popconfirm__confirm"
              size="small"
              :type="confirmButtonType"
              @click="confirm"
            >
              {{
                confirmButtonText || locale.t('el.popconfirm.confirmButtonText')
              }}
            </px-button>
          </slot>
        </div>
      </div>
    </template>

    <template v-if="$slots.default">
      <slot name="default"></slot>
    </template>

    <template v-if="$slots.reference">
      <slot name="reference"></slot>
    </template>
  </px-tooltip>
</template>

<style scoped>
@import './style.css';
</style>
