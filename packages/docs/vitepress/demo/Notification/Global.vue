<template>
  <div>
    <px-button @click="open1">插件式调用</px-button>
    <px-button @click="open2">函数式调用</px-button>
    <px-button
      @click="
        $notify.warning({
          title: 'Warning',
          message: '全局方法调用 Notification'
        })
      "
    >
      全局方法调用
    </px-button>
  </div>
</template>
<script lang="ts" setup>
import { PxNotification } from '@mmt817/pixel-ui'

const open1 = () => {
  PxNotification({
    title: 'Primary',
    message: '插件式调用 NoPxNotification',
    type: 'primary'
  })
}
const open2 = () => {
  PxNotification.success({
    title: 'Success',
    message: '函数式调用 NoPxNotification'
  })
}
</script>
