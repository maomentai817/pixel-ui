<template>
  <div class="f-c">
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
    <px-button @click="open7" :use-throttle="false" class="iron-btn"
      >Iron</px-button
    >
  </div>
</template>

<script lang="ts" setup>
import { PxNotification } from '@mmt817/pixel-ui'

const open1 = () => {
  PxNotification({
    title: 'Info',
    message: 'This is a info message.'
  })
}
const open2 = () => {
  PxNotification({
    title: 'Success',
    message: 'Congrats, this is a success message.',
    type: 'success'
  })
}
const open3 = () => {
  PxNotification({
    title: 'Warning',
    message: 'Warning, this is a warning message.',
    type: 'warning'
  })
}
const open4 = () => {
  PxNotification.error({
    title: 'Danger',
    message: 'Oops, this is a error message.'
  })
}
const open5 = () => {
  PxNotification.primary({
    title: 'Primary',
    message: 'This is a primary message.'
  })
}

const open6 = () => {
  PxNotification.sakura({
    title: 'Sakura',
    message: 'This is a sakura message.'
  })
}

const open7 = () => {
  PxNotification.iron({
    title: 'Iron',
    message: 'This is a iron message.'
  })
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
</style>
