<template>
  <px-button @click="openMsgBox">with callback</px-button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { delay } from 'lodash-es'
import { PxMessage, PxMessageBox } from '@mmt817/pixel-ui'
import type { MessageBoxAction, MessageBoxOptions } from '@mmt817/pixel-ui'

async function openMsgBox() {
  try {
    const action = await PxMessageBox({
      title: 'Message',
      message: h('p', null, [
        h('span', null, 'Message can be '),
        h('i', { style: 'color: teal' }, 'VNode')
      ]),
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'danger',
      icon: 'trash',
      beforeClose(
        action: MessageBoxAction,
        instance: MessageBoxOptions,
        done: () => void
      ) {
        if (action !== 'confirm') {
          done()
          return
        }

        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Loading...'
        delay(() => {
          done()
          delay(() => (instance.confirmButtonLoading = false), 1000)
        }, 3000)
      }
    })

    PxMessage.success(`action : ${action}`)
  } catch (action) {
    PxMessage.warning(`action : ${action}`)
  }
}
</script>
