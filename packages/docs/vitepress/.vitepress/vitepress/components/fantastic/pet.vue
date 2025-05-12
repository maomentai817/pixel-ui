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
      class="fixed w-300 h-310 bottom-10 right-30 z-10"
    />
  </ClientOnly>
</template>
