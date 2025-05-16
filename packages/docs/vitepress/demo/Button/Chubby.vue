<template>
  <p>
    <px-button chubby>Chubby</px-button>
    <px-button type="primary" chubby>Primary</px-button>
    <px-button type="success" chubby>Success</px-button>
  </p>
  <p>
    <px-button type="warning" chubby>Warning</px-button>
    <px-button type="danger" chubby>Danger</px-button>
    <px-button type="sakura" chubby>Sakura</px-button>
  </p>
  <p>
    <px-button icon="search" chubby />
    <px-button type="primary" icon="edit-solid" chubby />
    <px-button type="success" icon="check-solid" chubby />
    <px-button type="warning" icon="star-solid" chubby />
    <px-button type="danger" icon="trash-solid" chubby />
    <px-button type="sakura" icon="tag-solid" chubby />
  </p>
  <hr />
  <p class="compare">
    <px-button round>Round</px-button>
    <px-button type="primary" round>Primary</px-button>
    <px-button type="success" round>Success</px-button>
  </p>
  <p class="compare">
    <px-button type="warning" round>Warning</px-button>
    <px-button type="danger" round>Danger</px-button>
    <px-button type="sakura" round>Sakura</px-button>
  </p>
  <p class="compare">
    <px-button icon="search" circle />
    <px-button type="primary" icon="edit-solid" circle />
    <px-button type="success" icon="check-solid" circle />
    <px-button type="warning" icon="star-solid" circle />
    <px-button type="danger" icon="trash-solid" circle />
    <px-button type="sakura" icon="tag-solid" circle />
  </p>
</template>
<style scoped>
.compare .px-button {
  --px-button-size: 60px;
}
</style>
