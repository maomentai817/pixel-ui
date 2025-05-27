<template>
  <px-button @click="open" :use-throttle="false">Show message</px-button>
  <px-button @click="openVn" :use-throttle="false">VNode</px-button>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { PxMessage } from '@mmt817/pixel-ui'

const open = () => {
  PxMessage('This is a message.')
}

const openVn = () => {
  PxMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}
</script>
