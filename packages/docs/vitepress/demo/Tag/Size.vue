<template>
  <div class="tag-demo">
    <div class="mb-10">
      <px-tag
        v-for="item in items"
        :key="item.type"
        :type="item.type"
        size="small"
        >Small</px-tag
      >
    </div>
    <div class="mb-10">
      <px-tag v-for="item in items" :key="item.type" :type="item.type"
        >Default</px-tag
      >
    </div>
    <div>
      <px-tag
        v-for="item in items"
        :key="item.type"
        :type="item.type"
        size="large"
        >Large</px-tag
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TagProps } from '@mmt817/pixel-ui'

type Item = { type: TagProps['type'] }

const items = ref<Array<Item>>([
  { type: 'primary' },
  { type: 'success' },
  { type: 'info' },
  { type: 'warning' },
  { type: 'danger' },
  { type: 'sakura' }
])
</script>

<style scoped>
.tag-demo .px-tag {
  margin-right: 4px;
}
</style>
