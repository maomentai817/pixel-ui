<template>
  <div class="tag-demo">
    <px-tag closable @close="handleClose">Closable</px-tag>
    <px-tag type="primary" closable @close="handleClose">Primary</px-tag>
    <px-tag type="success" closable @close="handleClose">Success</px-tag>
    <px-tag type="danger" closable @close="handleClose">Danger</px-tag>
  </div>
</template>

<script setup>
const handleClose = () => {
  console.log('Tag closed')
}
</script>

<style scoped>
.tag-demo .px-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style> 