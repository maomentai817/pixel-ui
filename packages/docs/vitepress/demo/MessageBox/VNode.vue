<template>
  <px-button @click="open1">Common VNode</px-button>
  <px-button @click="open2">Dynamic props</px-button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { PxMessageBox, PxTag } from '@mmt817/pixel-ui'

function open1() {
  PxMessageBox({
    title: 'Message',
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}

function open2() {
  PxMessageBox({
    title: 'Message',
    type: 'success',
    message: () =>
      h(
        PxTag,
        {
          type: 'success',
          closable: true
        },
        'VNode'
      )
  })
}
</script>
