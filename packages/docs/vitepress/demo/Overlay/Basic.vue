<template>
  <div class="h-400 f-c bgc-#ebe6e0">
    <div class="f-c">
      <px-button @click="handleOpen">Button</px-button>
      <px-button @click="handleOpen" type="primary">Primary</px-button>
      <px-button @click="handleOpen" type="success">Success</px-button>
      <px-button @click="handleOpen" type="warning">Warning</px-button>
      <px-button @click="handleOpen" type="danger">Danger</px-button>
      <px-button @click="handleOpen" type="sakura">Sakura</px-button>
    </div>
    <px-overlay v-show="visible" :mask="visible" :overlayClass="'f-c'">
      <px-button @click="handleClose">Close</px-button>
    </px-overlay>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const handleOpen = () => {
  visible.value = true
}
const handleClose = () => {
  visible.value = false
}
</script>
