<template>
  <px-badge :value="200" :max="99" class="item">
    <px-button>comments</px-button>
  </px-badge>
  <px-badge :value="100" :max="10" class="item">
    <px-button>replies</px-button>
  </px-badge>
</template>

<style scoped>
.item {
  margin-right: 40px;
}
</style>
