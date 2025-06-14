<template>
  <px-button @click="openConfirm"> Click to open the Prompt</px-button>
</template>
<script setup lang="ts">
import {
  PxMessage,
  PxMessageBox,
  type MessageBoxAction
} from '@mmt817/pixel-ui'

function openConfirm() {
  PxMessageBox.prompt('Place input your name', 'Tip', { type: 'info' })
    .then(({ value }: any) => {
      PxMessage.success(`your name is: ${value}`)
    })
    .catch((action: MessageBoxAction) => {
      PxMessage.warning(`action: ${action}`)
    })
}
</script>
