<template>
  <div class="flex items-center gap-8 mb-8">
    <px-input
      v-model="input1"
      style="width: 240px"
      size="large"
      placeholder="Please Input"
    />
    <px-input
      v-model="input2"
      style="width: 240px"
      placeholder="Please Input"
    />
    <px-input
      v-model="input3"
      style="width: 240px"
      size="small"
      placeholder="Please Input"
    />
  </div>
  <div class="flex items-center gap-8 mb-8">
    <px-input
      v-model="input1"
      style="width: 240px"
      size="large"
      placeholder="Please Input"
    />
    <px-input
      v-model="input2"
      style="width: 240px"
      placeholder="Please Input"
    />
    <px-input
      v-model="input3"
      style="width: 240px"
      size="small"
      placeholder="Please Input"
    />
  </div>
  <div class="flex items-center gap-8">
    <px-input
      v-model="input1"
      style="width: 240px"
      size="large"
      placeholder="Please Input"
    />
    <px-input
      v-model="input2"
      style="width: 240px"
      placeholder="Please Input"
    />
    <px-input
      v-model="input3"
      style="width: 240px"
      size="small"
      placeholder="Please Input"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
</script>
