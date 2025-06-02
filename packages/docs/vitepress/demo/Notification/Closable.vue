<template>
  <px-button @click="open" type="primary"> Hide close button </px-button>
</template>

<script lang="ts" setup>
import { PxNotification } from '@mmt817/pixel-ui'

const open = () => {
  PxNotification.primary({
    title: 'primary',
    message: 'This is a message without close button',
    showClose: false
  })
}
</script>
