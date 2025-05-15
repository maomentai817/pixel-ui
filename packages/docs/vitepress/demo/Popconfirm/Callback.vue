<script setup lang="ts">
const confirmEvent = () => {
  console.log('confirm!')
}
const cancelEvent = () => {
  console.log('cancel!')
}
</script>
<template>
  <px-popconfirm
    confirm-button-text="嘻嘻"
    cancel-button-text="No喵"
    confirm-button-type="sakura"
    cancel-button-type="warning"
    icon="info-circle-solid"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
    @confirm="confirmEvent"
    @cancel="cancelEvent"
  >
    <template #reference>
      <px-button>Delete</px-button>
    </template>
  </px-popconfirm>
</template>
