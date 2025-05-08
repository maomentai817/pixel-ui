<script setup lang="ts">
import { ref } from 'vue'

const clicked = ref(false)
const onCancel = () => {
  clicked.value = true
}
</script>

<template>
  <px-popconfirm
    width="220"
    icon="info-circle-solid"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
    @cancel="onCancel"
  >
    <template #reference>
      <px-button>Delete</px-button>
    </template>
    <template #actions="{ confirm, cancel }">
      <px-button size="mini" @click="cancel">No!</px-button>
      <px-button
        type="danger"
        size="mini"
        :disabled="!clicked"
        @click="confirm"
      >
        Yes?
      </px-button>
    </template>
  </px-popconfirm>
</template>
