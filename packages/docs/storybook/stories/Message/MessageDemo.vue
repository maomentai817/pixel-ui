<script setup lang="ts">
import { PxMessage, PxButton } from '@pixel-ui/components'
import type { MessageProps } from '@mmt817/pixel-ui'

withDefaults(defineProps<MessageProps>(), {
  message: '',
  type: 'info',
  icon: 'info-circle-solid',
  duration: 3000,
  showClose: false,
  center: false,
  offset: 10,
  transitionName: 'fade-up'
})
</script>
<template>
  <div class="message-demo">
    <px-button
      @click="
        () =>
          PxMessage.info({
            message: 'This is a info message.',
            icon,
            duration,
            showClose,
            center,
            offset,
            transitionName
          })
      "
    >
      Info
    </px-button>
    <px-button
      type="primary"
      @click="
        () =>
          PxMessage.primary({
            message: 'This is a primary message.',
            icon,
            duration,
            showClose,
            center,
            offset,
            transitionName
          })
      "
    >
      Primary
    </px-button>
    <px-button
      type="success"
      @click="
        () =>
          PxMessage.success({
            message: 'This is a success message.',
            icon,
            duration,
            showClose,
            center,
            offset,
            transitionName
          })
      "
    >
      Success
    </px-button>
    <px-button
      type="warning"
      @click="
        () =>
          PxMessage.warning({
            message: 'This is a warning message.',
            icon,
            duration,
            showClose,
            center,
            offset,
            transitionName
          })
      "
    >
      Warning
    </px-button>
    <px-button
      type="danger"
      @click="
        () =>
          PxMessage.danger({
            message: 'Oops, this is a danger message.',
            icon,
            duration,
            showClose,
            center,
            offset,
            transitionName
          })
      "
    >
      Danger
    </px-button>
    <px-button
      type="sakura"
      @click="
        () =>
          PxMessage.sakura({
            message: 'This is a sakura message.',
            icon,
            duration,
            showClose,
            center,
            offset,
            transitionName
          })
      "
    >
      Sakura
    </px-button>
    <px-button
      class="iron-btn"
      @click="
        () =>
          PxMessage.iron({
            message: 'This is a iron message.',
            icon,
            duration,
            showClose,
            center,
            offset,
            transitionName
          })
      "
    >
      Iron
    </px-button>
    <px-button
      class="stamp-btn"
      @click="
        () =>
          PxMessage.stamp({
            message: 'This is a stamp message.',
            icon,
            duration,
            showClose,
            center,
            offset,
            transitionName
          })
      "
    >
      Stamp
    </px-button>
  </div>
</template>

<style scoped>
.message-demo {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.iron-btn {
  --px-button-text-color: #8f9db5;
  --px-border-color: #b4c0d2;
  --px-bg-color: #3a4567;
  --px-bg-shadow-color: #252d46;

  &:hover {
    --px-bg-color: #3a4567;
  }
}
.stamp-btn {
  --px-bg-color: #ebe6e0;
  --px-bg-shadow-color: #00000033;

  &:hover {
    --px-bg-color: #ebe6e0;
  }
}
</style>
