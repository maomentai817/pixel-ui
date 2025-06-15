<template>
  <px-button @click="open">Open a draggable Box</px-button>
  <px-button @click="open2"> Open a overflow draggable Box </px-button>
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
      type: 'warning',
      draggable: true
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

const open2 = () => {
  PxMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      draggable: true,
      overflow: true
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
