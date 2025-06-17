<template>
  <px-button
    v-loading.fullscreen.lock="loading"
    type="primary"
    @click="openLoading1"
  >
    As a directive
  </px-button>
  <px-button type="primary" @click="openLoading2"> As a service </px-button>
</template>
<script setup>
import { ref } from 'vue'
import { PxLoading } from '@mmt817/pixel-ui'

const loading = ref(false)

function openLoading1() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

function openLoading2() {
  const _loading = PxLoading.service({
    lock: true,
    spinner: 'spinner-third-solid',
    text: '加载中...',
    background: 'rgba(255,255,255,0.5)'
  })
  setTimeout(() => {
    _loading.close()
  }, 2000)
}
</script>
