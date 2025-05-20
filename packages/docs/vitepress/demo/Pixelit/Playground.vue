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
  <div class="f-c mb-20">
    <px-button @click="isGrayscale = !isGrayscale" type="sakura"
      >grayscale</px-button
    >
  </div>
  <div class="f-c mb-20">
    <px-text class="w-250 text-10" tag="div"
      >AspectRatio:{{ aspectRatio }}</px-text
    >
    <px-button icon="minus-solid" @click="decreaseAspectRatio"></px-button>
    <px-button icon="plus-solid" @click="increaseAspectRatio"></px-button>
  </div>
  <div class="f-c mb-20">
    <px-text class="w-120 text-10" tag="div">Scale:{{ scale }}</px-text>
    <px-button icon="minus-solid" @click="decreaseScale"></px-button>
    <px-button icon="plus-solid" @click="increaseScale"></px-button>
    <input type="range" v-model="scale" min="2" max="50" step="1" />
  </div>
  <div class="f-c mb-20">
    <px-text class="w-250 text-10" tag="div">Palette:</px-text>
    <select v-model="selectedPaletteName">
      <option value="">Default</option>
      <option v-for="(_, name) in palettes" :key="name" :value="name">
        {{ name }}
      </option>
    </select>
  </div>
  <div class="pixelit-container f-c">
    <pixelit-compare
      :src="pixelitSrc"
      :scale="scale"
      :aspect-ratio="aspectRatio"
      :palette="selectedPalette"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const scale = ref(4)
const aspectRatio = ref(0.5)
const step = 0.1

const decreaseAspectRatio = () => {
  aspectRatio.value = Math.max(
    0.1,
    Math.round((aspectRatio.value - step) * 10) / 10
  )
}

const increaseAspectRatio = () => {
  aspectRatio.value = Math.min(
    1.0,
    Math.round((aspectRatio.value + step) * 10) / 10
  )
}
const decreaseScale = () => {
  scale.value = Math.max(scale.value - 1, 2)
}
const increaseScale = () => {
  scale.value = Math.min(scale.value + 1, 50)
}

const isGrayscale = ref(false)
const pixelitSrc = ref('/pixel-ui/images/Starbucks.png')

const fileInputRef = ref<HTMLInputElement>()
const uploadImg = () => {
  fileInputRef.value?.click()
}

const handleFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) {
    const file = files[0]
    const url = URL.createObjectURL(file)
    pixelitSrc.value = url
  }
}

// 🎨 定义常用调色板
const palettes: Record<string, number[][]> = {
  Gray: [
    [0, 0, 0],
    [85, 85, 85],
    [170, 170, 170],
    [255, 255, 255]
  ],
  GameBoy: [
    [15, 56, 15],
    [48, 98, 48],
    [139, 172, 15],
    [155, 188, 15]
  ],
  NES: [
    [0, 0, 0],
    [255, 255, 255],
    [255, 0, 0],
    [0, 0, 255],
    [255, 165, 0]
  ],
  CGA: [
    [0, 0, 0],
    [255, 255, 255],
    [170, 255, 238],
    [255, 85, 255]
  ],
  'PICO-8': [
    [0, 0, 0],
    [29, 43, 83],
    [126, 37, 83],
    [0, 135, 81],
    [171, 82, 54],
    [95, 87, 79],
    [194, 195, 199],
    [255, 241, 232]
  ]
}

const selectedPaletteName = ref('')
const selectedPalette = computed(() => palettes[selectedPaletteName.value])
</script>
