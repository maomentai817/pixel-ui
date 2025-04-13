<template>
  <px-alert title="Unclosable alert" type="success" :closable="false" />
  <px-alert title="Alert with callback" type="warning" @close="handleClose" />
</template>
<script lang="ts" setup>
const handleClose = () => {
  console.log('Alert closed.')
}
</script>
