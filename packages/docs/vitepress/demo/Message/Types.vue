<template>
  <div class="f-c flex-wrap gap-10">
    <px-button @click="open5" :use-throttle="false" type="primary">
      Primary
    </px-button>
    <px-button @click="open2" :use-throttle="false" type="success">
      Success
    </px-button>
    <px-button @click="open3" :use-throttle="false" type="warning">
      Warning
    </px-button>
    <px-button @click="open1" :use-throttle="false" type="base">Info</px-button>
    <px-button @click="open4" :use-throttle="false" type="danger">
      Danger
    </px-button>
    <px-button @click="open6" :use-throttle="false" type="sakura">
      Sakura
    </px-button>
    <px-button @click="open7" :use-throttle="false" class="iron-btn">
      Iron
    </px-button>
    <px-button @click="open8" :use-throttle="false" class="stamp-btn">
      Stamp
    </px-button>
  </div>
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
const open7 = () => {
  PxMessage.iron('This is a iron message.')
}
const open8 = () => {
  PxMessage.stamp('This is a stamp message.')
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
