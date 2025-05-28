<template>
  <px-button @click="open" type="sakura">Icon</px-button>
</template>
<script lang="ts" setup>
import { PxMessage } from '@mmt817/pixel-ui'

const open = () => {
  PxMessage.sakura({
    showClose: true,
    message: 'Custom icon',
    icon: 'bluesky'
  })
}
</script>
