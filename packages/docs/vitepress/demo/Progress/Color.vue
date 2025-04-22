<template>
  <div class="max-w-600">
    <px-progress :percentage="percentage" color="#6f9bc6" class="mb-15" />
    <px-progress :percentage="percentage" color="#a172d0" class="mb-15" />
    <px-progress :percentage="percentage" color="#d80835" class="mb-15" />
    <px-progress :percentage="percentage" color="#eda01f" class="mb-15" />
    <div>
      <px-button-group>
        <px-button icon="minus-solid" @click="decrease" />
        <px-button icon="plus-solid" @click="increase" />
      </px-button-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percentage = ref(20)

const increase = () => {
  percentage.value += 10
  if (percentage.value > 100) {
    percentage.value = 100
  }
}
const decrease = () => {
  percentage.value -= 10
  if (percentage.value < 0) {
    percentage.value = 0
  }
}
</script>
