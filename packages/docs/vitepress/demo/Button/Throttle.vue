<script setup>
const handleBtnClick = () => {
  console.log('btn click')
}
</script>

<template>
  <p>
    <px-button @click="handleBtnClick" size="small"> with throttle</px-button>
    <px-button :use-throttle="false" @click="handleBtnClick" size="small">
      without throttle
    </px-button>
  </p>
</template>
