<script lang="ts" setup>
const stages = [{ type: 'loop', start: 0, end: 39 }]
</script>

<template>
  <ClientOnly>
    <px-animation-frame
      src="/pixel-ui/images/cat.gif"
      :stages="stages"
      width="300"
      height="310"
      overflow
      class="fixed bottom-10 right-30 z-10 h-310 w-300"
    />
  </ClientOnly>
</template>
