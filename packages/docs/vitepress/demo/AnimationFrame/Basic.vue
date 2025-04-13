<template>
  <div class="animation-container wh-full">
    <px-animation-frame
      src="/pixel-ui/images/twoking.gif"
      :stages="stages"
      class="static!"
    />
  </div>
</template>
<script lang="ts" setup>
const stages = [{ type: 'loop', start: 0, end: 6 }]
</script>
