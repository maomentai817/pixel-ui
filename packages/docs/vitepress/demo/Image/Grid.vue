<template>
  <div class="mb-20 f-c">
    <px-button @click="showGrid = !showGrid" type="sakura">grid</px-button>
  </div>
  <div class="px-image-container f-c">
    <image-compare
      src="/pixel-ui/images/xinlang.jpg"
      :block-size="4"
      :color-count="18"
      :show-grid="showGrid"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const showGrid = ref(true)
</script>
