<template>
  <div class="flex mb-20">
    <px-text class="w-200" tag="div">BlockSize:{{ blockSize }}</px-text>
    <px-button icon="minus-solid" @click="decreaseBlock"></px-button>
    <px-button icon="plus-solid" @click="increaseBlock"></px-button>
  </div>
  <div class="flex mb-20">
    <px-text class="w-200" tag="div">ColorCount:{{ colorCount }}</px-text>
    <px-button icon="minus-solid" @click="decreaseColor"></px-button>
    <px-button icon="plus-solid" @click="increaseColor"></px-button>
  </div>
  <div class="px-image-container f-c">
    <image-compare
      src="/pixel-ui/images/xtaffy.png"
      :block-size="blockSize"
      :color-count="colorCount"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const blockSize = ref(4)
const colorCount = ref(36)

const decreaseBlock = () => {
  blockSize.value = Math.max(blockSize.value - 1, 2)
}
const increaseBlock = () => {
  blockSize.value = Math.min(blockSize.value + 1, 10)
}
const decreaseColor = () => {
  colorCount.value = Math.max(colorCount.value - 1, 2)
}
const increaseColor = () => {
  colorCount.value = Math.min(colorCount.value + 1, 64)
}
</script>
