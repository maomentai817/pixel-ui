<template>
  <px-button @click="openCenter">Centered text</px-button>
</template>
<script lang="ts" setup>
import { PxMessage } from '@mmt817/pixel-ui'

const openCenter = () => {
  PxMessage({
    showClose: true,
    message: 'Centered text',
    center: true
  })
}
</script>
