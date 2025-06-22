<template>
  <px-switch v-model="value1" loading />
  <px-switch v-model="value2" loading class="ml-20" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(false)
</script>
