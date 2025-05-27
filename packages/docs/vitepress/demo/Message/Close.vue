<template>
  <px-button @click="open5" :use-throttle="false" type="primary"
    >Primary</px-button
  >
  <px-button @click="open2" :use-throttle="false" type="success"
    >Success</px-button
  >
  <px-button @click="open3" :use-throttle="false" type="warning"
    >Warning</px-button
  >
  <px-button @click="open1" :use-throttle="false" type="base">Info</px-button>
  <px-button @click="open4" :use-throttle="false" type="danger"
    >Danger</px-button
  >
  <px-button @click="open6" :use-throttle="false" type="sakura"
    >Sakura</px-button
  >
  <div class="f-c mt-20">
    <px-button @click="handleClose">closeAll</px-button>
  </div>
</template>

<script lang="ts" setup>
import { PxMessage } from '@mmt817/pixel-ui'
const handleClose = () => {
  PxMessage.closeAll()
}
const open1 = () => {
  PxMessage({
    message: 'This is a info message.',
    showClose: true
  })
}
const open2 = () => {
  PxMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
    showClose: true
  })
}
const open3 = () => {
  PxMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning',
    showClose: true
  })
}
const open4 = () => {
  PxMessage.error({
    message: 'Oops, this is a error message.',
    showClose: true
  })
}
const open5 = () => {
  PxMessage.primary({
    message: 'This is a primary message.',
    showClose: true,
    duration: 0
  })
}

const open6 = () => {
  PxMessage.sakura({
    message: 'This is a sakura message.',
    showClose: true,
    duration: 0
  })
}
</script>
