<template>
  <px-button @click="open1" class="iron-btn">Iron</px-button>
  <px-button @click="open2" class="stamp-btn">Stamp</px-button>
</template>

<script lang="ts" setup>
import { PxMessageBox } from '@mmt817/pixel-ui'

const open1 = () => {
  PxMessageBox.confirm(
    'It will permanently delete the file. Continue?',
    'Warning',
    {
      type: 'iron',
      icon: 'imgur',
      center: true,
      matte: true,
      preset1: true
    }
  )
}
const open2 = () => {
  PxMessageBox.confirm(
    'It will permanently delete the file. Continue?',
    'Warning',
    {
      type: 'stamp',
      icon: 'imgur',
      center: true,
      grid: true,
      draggable: true
    }
  )
}
</script>
<style scoped>
.iron-btn {
  --px-button-text-color: #8f9db5;
  --px-border-color: #b4c0d2;
  --px-bg-color: #3a4567;
  --px-bg-shadow-color: #252d46;

  &:hover {
    --px-bg-color: #3a4567;
  }
}
.stamp-btn {
  --px-bg-color: #ebe6e0;
  --px-bg-shadow-color: #00000033;

  &:hover {
    --px-bg-color: #ebe6e0;
  }
}
</style>
