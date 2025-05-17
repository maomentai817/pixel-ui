<template>
  <div class="tag-demo">
    <px-tag type="primary" closable @close="handleClose">Primary</px-tag>
    <px-tag type="success" closable @close="handleClose">Success</px-tag>
    <px-tag type="warning" closable @close="handleClose">Warning</px-tag>
    <px-tag type="danger" closable @close="handleClose">Danger</px-tag>
    <px-tag type="sakura" closable @close="handleClose">Sakura</px-tag>
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
