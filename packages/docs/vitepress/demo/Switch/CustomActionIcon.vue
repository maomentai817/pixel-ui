<template>
  <px-switch
    v-model="value1"
    active-action-icon="eye"
    inactive-action-icon="eye-cross"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
</script>
