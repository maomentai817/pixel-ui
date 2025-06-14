<script setup lang="ts">
import { reactive, ref, computed, watch, nextTick, type Ref } from 'vue'
import { isFunction, isNil } from 'lodash-es'
import { typeIconMap } from '@pixel-ui/utils'
import { useZIndex, useLocale, useId } from '@pixel-ui/hooks'

import type { InputInstance } from '../Input'
import type { MessageBoxPropsIn, MessageBoxAction } from './types'

import PxOverlay from '../Overlay/Overlay.vue'
import PxIcon from '../Icon/Icon.vue'
import PxButton from '../Button/Button.vue'
import PxInput from '../Input/Input.vue'

const COMP_NAME = 'PxMessageBox' as const
defineOptions({
  name: COMP_NAME,
  inheritAttrs: false
})

const locale = useLocale()

const props = withDefaults(defineProps<MessageBoxPropsIn>(), {
  boxType: '',
  showClose: true,
  lockScroll: true,
  showConfirmButton: true,
  confirmButtonType: 'primary',
  roundButton: false,
  inputPlaceholder: 'Please input...',
  inputValue: '',
  closeOnClickModal: true
})

const { doAction } = props
const { nextZIndex } = useZIndex()

const headerRef = ref<HTMLElement>()
const inputRef = ref<InputInstance>()
const inputId = useId()

// 参数拓展
const state = reactive({
  ...props,
  zIndex: nextZIndex()
})

const hasMessage = computed(() => !!state.message)
const iconComponent = computed(
  () => state.icon ?? typeIconMap.get(state.type ?? '') ?? 'info-circle-solid'
)

// 监听 visible
watch(
  () => props.visible?.value,
  (val) => {
    if (val) state.zIndex = nextZIndex()
    if (props.boxType !== 'prompt') return

    if (!val) return

    nextTick(() => {
      inputRef.value && inputRef.value.focus()
    })
  }
)

// messageBox 事件回调
const handleAction = (action: MessageBoxAction) => {
  isFunction(props.beforeClose)
    ? props.beforeClose(action, state, () => doAction(action, state.inputValue))
    : doAction(action, state.inputValue)
}

// 点击遮罩层
const handleWrapperClick = () => {
  props.closeOnClickModal && handleAction('close')
}
// prompt 表单回车提交
const handleInputEnter = (e: KeyboardEvent) => {
  if (state.inputType === 'textarea') return
  e.preventDefault()

  return handleAction('confirm')
}
// 关闭
const handleClose = () => {
  handleAction('close')
}
</script>

<template>
  <transition name="fade-in-linear" @after-leave="destroy">
    <px-overlay v-show="(visible as Ref).value" :z-index="state.zIndex" mask>
      <div
        role="dialog"
        class="px-overlay-message-box"
        @click="handleWrapperClick"
      >
        <div
          ref="rootRef"
          :class="[
            'px-message-box',
            {
              'is-center': state.center,
              [`px-message-box--${state.type}`]: state.type
            }
          ]"
          @click.stop
        >
          <div
            v-if="!isNil(state.title)"
            ref="headerRef"
            class="px-message-box__header"
            :class="{ 'show-close': state.showClose }"
          >
            <div class="px-message-box__title">
              <px-icon
                v-if="iconComponent && state.center"
                class="px-message-box__icon"
                :class="{
                  [`px-icon--${state.type}`]: state.type
                }"
                :icon="iconComponent"
              />
              {{ state.title }}
            </div>
            <button
              v-if="showClose"
              class="px-message-box__header-btn"
              @click.stop="handleClose"
            >
              <px-icon icon="times-solid" />
            </button>
          </div>
          <div class="px-message-box__content">
            <px-icon
              v-if="iconComponent && !state.center && hasMessage"
              :class="{
                [`px-icon-${state.type}`]: state.type
              }"
              :icon="iconComponent"
            />
            <div v-if="hasMessage" class="px-message-box__message">
              <slot>
                <component
                  :is="state.showInput ? 'label' : 'p'"
                  :for="state.showInput ? inputId : void 0"
                >
                  {{ state.message }}
                </component>
              </slot>
            </div>
          </div>
          <div v-show="state.showInput" class="px-message-box__input">
            <px-input
              v-model="state.inputValue"
              ref="inputRef"
              :placeholder="state.inputPlaceholder"
              :type="state.inputType"
              @keyup.enter="handleInputEnter"
            />
          </div>
          <div class="px-message-box__footer">
            <px-button
              v-if="state.showCancelButton"
              class="px-message-box__footer-btn px-message-box__cancel-btn"
              :type="state.cancelButtonType"
              :round="state.roundButton"
              :loading="state.cancelButtonLoading"
              @click="handleAction('cancel')"
              @keydown.prevent.enter="handleAction('cancel')"
              >{{
                state.cancelButtonText || locale.t('el.messagebox.cancel')
              }}</px-button
            >
            <px-button
              v-show="state.showConfirmButton"
              class="px-message-box__footer-btn px-message-box__confirm-btn"
              :type="state.confirmButtonType ?? 'primary'"
              :round="state.roundButton"
              :loading="state.confirmButtonLoading"
              @click="handleAction('confirm')"
              @keydown.prevent.enter="handleAction('confirm')"
              >{{
                state.confirmButtonText || locale.t('el.messagebox.confirm')
              }}</px-button
            >
          </div>
        </div>
      </div>
    </px-overlay>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>
