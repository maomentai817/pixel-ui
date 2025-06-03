<script setup lang="ts">
import { PxNotification, PxButton } from '@pixel-ui/components'
import type { NotificationProps } from '@mmt817/pixel-ui'

withDefaults(defineProps<NotificationProps>(), {
  title: '',
  message: '',
  type: 'info',
  icon: 'info-circle-solid',
  position: 'top-right',
  duration: 3000,
  showClose: true,
  offset: 20,
  transitionName: 'fade'
})
</script>
<template>
  <div class="notification-demo">
    <px-button
      @click="
        () =>
          PxNotification.info({
            title: 'Info',
            message: 'This is a info notification.',
            icon,
            duration,
            showClose,
            position,
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
          PxNotification.primary({
            title: 'Primary',
            message: 'This is a primary notification.',
            icon,
            duration,
            showClose,
            position,
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
          PxNotification.success({
            title: 'Success',
            message: 'This is a success notification.',
            icon,
            duration,
            showClose,
            position,
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
          PxNotification.warning({
            title: 'Warning',
            message: 'This is a warning notification.',
            icon,
            duration,
            showClose,
            position,
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
          PxNotification.danger({
            title: 'Danger',
            message: 'Oops, this is a danger notification.',
            icon,
            duration,
            showClose,
            position,
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
          PxNotification.sakura({
            title: 'Sakura',
            message: 'This is a sakura notification.',
            icon,
            duration,
            showClose,
            position,
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
          PxNotification.iron({
            title: 'Iron',
            message: 'This is a iron notification.',
            icon,
            duration,
            showClose,
            position,
            offset,
            transitionName
          })
      "
    >
      Iron
    </px-button>
  </div>
</template>

<style scoped>
.notification-demo {
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
</style>
