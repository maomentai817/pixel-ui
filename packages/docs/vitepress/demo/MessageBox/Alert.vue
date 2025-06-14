<template>
  <px-button @click="open">Click to open the alert</px-button>
</template>

<script lang="ts" setup>
import {
  PxMessage,
  PxMessageBox,
  type MessageBoxAction
} from '@mmt817/pixel-ui'

const open = () => {
  PxMessageBox.alert('This is a message', 'Title', {
    confirmButtonText: 'OK',
    type: 'success',
    callback: (
      action: MessageBoxAction | { value: string; action: MessageBoxAction }
    ) => {
      PxMessage({
        type: 'info',
        message: `action: ${action}`
      })
    }
  })
}
</script>
