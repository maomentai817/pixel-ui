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
</template>

<script lang="ts" setup>
import { PxMessage } from '@mmt817/pixel-ui'

const open1 = () => {
  PxMessage('This is a info message.')
}
const open2 = () => {
  PxMessage({
    message: 'Congrats, this is a success message.',
    type: 'success'
  })
}
const open3 = () => {
  PxMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning'
  })
}
const open4 = () => {
  PxMessage.error('Oops, this is a danger message.')
}
const open5 = () => {
  PxMessage.primary('This is a primary message.')
}

const open6 = () => {
  PxMessage.sakura('This is a sakura message.')
}
</script>
