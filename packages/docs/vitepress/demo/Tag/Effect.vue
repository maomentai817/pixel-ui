<template>
  <div class="tag-demo">
    <div class="mb-10">
      <px-tag>Default</px-tag>
      <px-tag type="primary">Primary</px-tag>
      <px-tag type="success">Success</px-tag>
      <px-tag type="warning">Warning</px-tag>
      <px-tag type="danger">Danger</px-tag>
    </div>
    <div>
      <px-tag effect="plain">Plain</px-tag>
      <px-tag type="primary" effect="plain">Primary</px-tag>
      <px-tag type="success" effect="plain">Success</px-tag>
      <px-tag type="warning" effect="plain">Warning</px-tag>
      <px-tag type="danger" effect="plain">Danger</px-tag>
    </div>
  </div>
</template>

<style scoped>
.tag-demo .px-tag {
  margin-right: 10px;
}
.mb-10 {
  margin-bottom: 10px;
}
</style> 