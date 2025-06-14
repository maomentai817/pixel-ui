<template>
  <px-button @click="openMsgBox">Content Center</px-button>
</template>

<script setup lang="ts">
import {
  PxMessage,
  PxMessageBox,
  type MessageBoxAction
} from '@mmt817/pixel-ui'

function openMsgBox() {
  PxMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      type: 'warning',
      center: true,
      // 这里展示一下 不用 Promise 写法的时候
      callback: (
        action: MessageBoxAction | { value: string; action: MessageBoxAction }
      ) => {
        if (action === 'confirm') {
          PxMessage.success(action)
        } else {
          PxMessage.warning(action as string)
        }
      }
    }
  )
}
</script>
