<script setup>
const handleBtnClick = () => {
  console.log('btn click')
}
</script>

<template>
  <p>
    <px-button @click="handleBtnClick"> with throttle</px-button>
    <px-button :use-throttle="false" @click="handleBtnClick">
      without throttle
    </px-button>
  </p>
</template>
