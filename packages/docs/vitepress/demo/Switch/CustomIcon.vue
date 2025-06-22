<template>
  <px-switch v-model="value1" active-icon="check" inactive-icon="times" />
  <br />
  <px-switch
    v-model="value2"
    class="mt-20 ml-20"
    inline-prompt
    active-icon="check"
    inactive-icon="times"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
</script>
