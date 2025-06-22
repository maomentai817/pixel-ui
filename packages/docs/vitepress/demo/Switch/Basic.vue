<template>
  <px-switch v-model="value1" />
  <px-switch
    v-model="value2"
    class="ml-20"
    style="
      --px-switch-on-color: #13ce66;
      --px-switch-on-border-color: #13ce66;
      --px-switch-off-color: #ff4949;
      --px-switch-off-border-color: #ff4949;
      --px-switch-off-action-color: #ffffff;
    "
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
</script>
