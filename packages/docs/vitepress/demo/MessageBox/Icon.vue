<template>
  <px-button @click="open">Custom Icon</px-button>
</template>

<script lang="ts" setup>
import { PxMessageBox } from '@mmt817/pixel-ui'

const open = () => {
  PxMessageBox.confirm(
    'It will permanently delete the file. Continue?',
    'Warning',
    {
      type: 'danger',
      icon: 'imgur',
      center: true
    }
  )
}
</script>
