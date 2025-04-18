<template>
  <px-badge :value="12" class="item">
    <px-button>Badge</px-button>
  </px-badge>
  <px-badge :value="3" class="item">
    <px-button>Badge</px-button>
  </px-badge>
  <px-badge :value="1" class="item" type="primary">
    <px-button>Badge</px-button>
  </px-badge>
  <px-badge :value="2" class="item" type="warning">
    <px-button>Badge</px-button>
  </px-badge>
  <px-badge :value="1" class="item" color="green">
    <px-button>Badge</px-button>
  </px-badge>
</template>
<style scoped>
.px-badge {
  margin-right: 15px;
}
</style>
