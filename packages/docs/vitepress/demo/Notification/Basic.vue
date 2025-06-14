<template>
  <px-button @click="open1">Closes automatically</px-button>
  <px-button @click="open2">Won't close automatically</px-button>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { PxNotification } from '@mmt817/pixel-ui'

const open1 = () => {
  PxNotification({
    title: 'Title',
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ]),
    position: 'bottom-right'
  })
}

const open2 = () => {
  PxNotification({
    title: 'Prompt',
    message: 'This is a message that does not automatically close',
    position: 'top-left',
    duration: 0
  })
}
</script>
