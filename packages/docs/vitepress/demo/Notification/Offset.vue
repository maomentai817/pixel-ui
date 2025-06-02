<template>
  <px-button @click="open" type="success">offset</px-button>
</template>

<script lang="ts" setup>
import { PxNotification } from '@mmt817/pixel-ui'

const open = () => {
  PxNotification.success({
    title: 'Success',
    message: 'This is a success message',
    offset: 300
  })
}
</script>
