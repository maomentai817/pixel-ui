<template>
  <div class="flex gap-4">
    <px-text size="12">Using Slots</px-text>
    <px-input v-model="input1" style="width: 240px" placeholder="Pick a date">
      <template #suffix>
        <px-icon icon="calender-solid" />
      </template>
    </px-input>
    <px-input
      v-model="input2"
      style="width: 240px"
      placeholder="Type something"
    >
      <template #prefix>
        <px-icon icon="search" />
      </template>
    </px-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const input1 = ref('')
const input2 = ref('')
</script>
