<template>
  <div class="flex gap-2">
    <span class="w-80">Dark</span>
    <px-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      effect="dark"
    >
      {{ item.label }}
    </px-tag>
  </div>
  <div class="flex gap-2 mt-10">
    <span class="w-80">Light</span>
    <px-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      effect="light"
    >
      {{ item.label }}
    </px-tag>
  </div>
  <div class="flex gap-2 mt-10">
    <span class="w-80">Plain</span>
    <px-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      effect="plain"
    >
      {{ item.label }}
    </px-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TagProps } from '@mmt817/pixel-ui'

type Item = { type: TagProps['type']; label: string }

const items = ref<Array<Item>>([
  { type: 'primary', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'warning', label: 'Tag 4' },
  { type: 'danger', label: 'Tag 5' },
  { type: 'sakura', label: 'Tag 6' }
])
</script>
