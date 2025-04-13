<template>
  <div class="animation-container wh-full">
    <px-animation-frame
      src="/pixel-ui/images/pet.gif"
      :stages="stages"
      class="static!"
    />
  </div>
</template>
<script setup lang="ts">
const stages = [
  { type: 'loop', start: 0, end: 11 },
  { type: 'once', start: 12, end: 41 },
  { type: 'loop', start: 31, end: 41 },
  { type: 'once', start: 42, end: 52 }
]
</script>
