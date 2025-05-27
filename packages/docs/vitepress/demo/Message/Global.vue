<template>
  <div>
    <px-button @click="open1">插件式调用</px-button>
    <px-button @click="open2">函数式调用</px-button>
    <px-button @click="$message.warning('全局方法调用 Message')">
      全局方法调用
    </px-button>
  </div>
</template>
<script lang="ts" setup>
import { PxMessage } from '@mmt817/pixel-ui'

const open1 = () => {
  PxMessage({
    message: '插件式调用 Message',
    type: 'primary'
  })
}
const open2 = () => {
  PxMessage.success('函数式调用 Message')
}
</script>
