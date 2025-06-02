<template>
  <px-button @click="open1" type="primary">Top Right</px-button>
  <px-button @click="open2" type="success">Bottom Right</px-button>
  <px-button @click="open3" type="warning">Bottom Left</px-button>
  <px-button @click="open4" type="danger">Top Left</px-button>
</template>

<script lang="ts" setup>
import { PxNotification } from '@mmt817/pixel-ui'

const open1 = () => {
  PxNotification.primary({
    title: 'Custom Position',
    message: "I'm at the top right corner"
  })
}

const open2 = () => {
  PxNotification.success({
    title: 'Custom Position',
    message: "I'm at the bottom right corner",
    position: 'bottom-right'
  })
}

const open3 = () => {
  PxNotification.warning({
    title: 'Custom Position',
    message: "I'm at the bottom left corner",
    position: 'bottom-left'
  })
}

const open4 = () => {
  PxNotification.danger({
    title: 'Custom Position',
    message: "I'm at the top left corner",
    position: 'top-left'
  })
}
</script>
