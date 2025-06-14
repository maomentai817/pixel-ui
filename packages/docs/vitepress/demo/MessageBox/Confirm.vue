<template>
  <px-button @click="open">Click to open the Confirm</px-button>
</template>

<script lang="ts" setup>
import { PxMessage, PxMessageBox } from '@mmt817/pixel-ui'

const open = () => {
  PxMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(() => {
      PxMessage({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      PxMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
</script>
