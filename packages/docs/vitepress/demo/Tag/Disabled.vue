<template>
  <div class="tag-demo">
    <px-tag disabled>Disabled</px-tag>
    <px-tag type="primary" disabled>Primary</px-tag>
    <px-tag type="success" disabled>Success</px-tag>
    <px-tag type="warning" disabled>Warning</px-tag>
    <px-tag type="danger" disabled closable>Danger</px-tag>

    <px-tag type="primary" disabled effect="plain">Primary</px-tag>
    <px-tag type="success" disabled effect="plain">Success</px-tag>
    <px-tag type="warning" disabled effect="plain">Warning</px-tag>
    <px-tag type="danger" disabled effect="plain">Danger</px-tag>
  </div>
</template>

<style scoped>
.tag-demo .px-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style> 