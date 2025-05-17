<template>
  <div class="flex gap-2 mb-20" v-for="effect in effects" :key="effect">
    <px-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      :effect="effect"
      round
    >
      {{ item.label }}
    </px-tag>
  </div>
  <div class="flex gap-2 mb-20" v-for="effect in effects" :key="effect">
    <px-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      :effect="effect"
      circle
    >
      {{ item.label }}
    </px-tag>
  </div>
  <div class="flex gap-2 mb-20" v-for="effect in effects" :key="effect">
    <px-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      :effect="effect"
      chubby
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
  { type: 'danger', label: 'Tag 5' }
])

const effects = ref<Array<TagProps['effect']>>(['dark', 'light', 'plain'])
</script>
