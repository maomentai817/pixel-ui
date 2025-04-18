<template>
  <px-badge value="new" class="item">
    <px-button>comments</px-button>
  </px-badge>
  <px-badge value="hot" class="item">
    <px-button>replies</px-button>
  </px-badge>
  <px-badge value="99" class="item">
    <px-button>share</px-button>
    <template #content="{ value }">
      <div class="custom-content">
        <px-icon icon="cog" color="#fff" size="20" />
        <span>{{ value }}</span>
      </div>
    </template>
  </px-badge>
</template>
<style scoped>
.item {
  margin-right: 25px;
}
</style>
