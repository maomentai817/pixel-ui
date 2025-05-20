<template>
  <div class="upload f-c mb-20">
    <px-button type="sakura" @click="uploadImg">
      Upload
      <px-icon icon="upload-alt-solid" color="#554562" />
    </px-button>
    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
  <div class="mb-20 f-c">
    <px-button @click="showGrid = !showGrid" type="sakura">grid</px-button>
  </div>
  <div class="f-c mb-20">
    <px-text class="w-200" tag="div">Scale:{{ scale }}</px-text>
    <px-button icon="minus-solid" @click="decreaseScale"></px-button>
    <px-button icon="plus-solid" @click="increaseScale"></px-button>
  </div>
  <div class="f-c mb-20">
    <px-text class="w-200" tag="div">BlockSize:{{ blockSize }}</px-text>
    <px-button icon="minus-solid" @click="decreaseBlock"></px-button>
    <px-button icon="plus-solid" @click="increaseBlock"></px-button>
  </div>
  <div class="f-c mb-20">
    <px-text class="w-200" tag="div">ColorCount:{{ colorCount }}</px-text>
    <px-button icon="minus-solid" @click="decreaseColor"></px-button>
    <px-button icon="plus-solid" @click="increaseColor"></px-button>
  </div>
  <div class="px-image-container f-c">
    <image-compare
      :src="pxImageSrc"
      :block-size="blockSize"
      :color-count="colorCount"
      :show-grid="showGrid"
      :scale="scale"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const blockSize = ref(4)
const colorCount = ref(36)
const scale = ref(0.5)
const step = 0.1

const decreaseScale = () => {
  scale.value = Math.max(0.1, Math.round((scale.value - step) * 10) / 10)
}

const increaseScale = () => {
  scale.value = Math.min(1.0, Math.round((scale.value + step) * 10) / 10)
}
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

const showGrid = ref(true)
const pxImageSrc = ref('/pixel-ui/images/Starbucks.png')

const fileInputRef = ref<HTMLInputElement>()
const uploadImg = () => {
  fileInputRef.value?.click()
}

const handleFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) {
    const file = files[0]
    const url = URL.createObjectURL(file)
    pxImageSrc.value = url
  }
}
</script>
