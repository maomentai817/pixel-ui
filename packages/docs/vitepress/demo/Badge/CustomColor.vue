<template>
  <px-badge :value="12" class="item" color="#626aef">
    <px-button color="#626aef">Badge</px-button>
  </px-badge>
  <px-badge :value="3" class="item" color="#dfee56">
    <px-button color="#dfee56">Badge</px-button>
  </px-badge>
  <px-badge :value="1" class="item" color="#fadbe0">
    <px-button color="#fadbe0">Badge</px-button>
  </px-badge>
  <px-badge :value="1" class="item" color="green">
    <px-button color="green">Badge</px-button>
  </px-badge>
  <br />
  <br />
  <px-badge :value="1" class="item paint-badge">
    <px-button class="paint-button">Badge</px-button>
  </px-badge>
</template>
<style scoped>
.px-badge {
  margin-right: 15px;
}
.paint-badge.px-badge {
  --px-badge-text-color: #554562;
  --px-badge-border-color: #554562;
}
:deep(.px-badge__content) {
  --px-badge-bg-color: #fadbe0;
  --px-badge-bg-shadow-color: #eaadbd;
}
.paint-button.px-button {
  --px-button-text-color: #554562;
  --px-border-color: #554562;
  --px-bg-color: #fadbe0;
  --px-bg-shadow-color: #eaadbd;
}
</style>
