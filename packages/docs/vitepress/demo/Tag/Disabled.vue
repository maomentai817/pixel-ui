<template>
  <div class="tag-demo">
    <div class="mb-10">
      <px-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        disabled
      >
        {{ item.label }}
      </px-tag>
    </div>
    <div class="mb-10">
      <px-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        disabled
        effect="dark"
      >
        {{ item.label }}
      </px-tag>
    </div>
    <div class="mb-10">
      <px-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        disabled
        effect="dark"
        closable
      >
        {{ item.label }}
      </px-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TagProps } from '@mmt817/pixel-ui'

type Item = { type: TagProps['type']; label: string }

const items = ref<Array<Item>>([
  { type: 'primary', label: 'primary' },
  { type: 'success', label: 'success' },
  { type: 'info', label: 'info' },
  { type: 'warning', label: 'warning' },
  { type: 'danger', label: 'danger' },
  { type: 'sakura', label: 'sakura' }
])
</script>

<style scoped>
.tag-demo .px-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
