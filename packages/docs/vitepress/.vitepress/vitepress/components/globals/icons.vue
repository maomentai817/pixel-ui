<script setup lang="ts">
import clipboardCopy from 'clipboard-copy'
import IconCategories from './icons-categories.json'
import { ref, computed, shallowRef } from 'vue'
import { PxMessage } from '@mmt817/pixel-ui'

type CategoriesItem = {
  name: string
  items: string[]
}

const query = ref('')
const categories = shallowRef<CategoriesItem[]>(IconCategories.categories)

const copyContent = async (content: string) => {
  try {
    await clipboardCopy(content)
    PxMessage.success(`已复制：${content}`)
  } catch {
    PxMessage.error('复制失败')
  }
}

const handleCopy = (name: string) => {
  copyContent(name)
}

const filteredCategories = computed(() =>
  categories.value
    .map((category) => {
      const items = category.items.filter((icon) =>
        icon.toLowerCase().includes(query.value.toLowerCase())
      )
      return { ...category, items }
    })
    .filter((category) => category.items.length > 0)
)
</script>

<template>
  <px-input
    v-model="query"
    placeholder="搜索图标名称"
    class="w-full p-8 text-16 mb-16"
  >
    <template #prefix>
      <px-icon icon="search" />
    </template>
  </px-input>

  <div
    v-for="category in filteredCategories"
    :key="category.name"
    class="mt-24"
  >
    <h3 class="icon-title mb-20!">{{ category.name }}</h3>
    <ul class="icon-grid grid m-0 gap-12 list-none! p-0!">
      <li
        v-for="icon in category.items"
        :key="icon"
        class="icon-item h-110 fd-col p-10 text-center hover:bgc-#ecf5ff"
        @click="handleCopy(icon)"
      >
        <px-icon size="32" :icon="icon" color="var(--px-text-color-sakura)" />
        <div
          class="icon-name [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] overflow-hidden text-ellipsis break-words text-12 mt-6 f-1"
        >
          {{ icon }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.icon-title {
  background: -webkit-linear-gradient(10deg, #bd34fe 5%, #e43498 15%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.icon-grid {
  /* grid-template-columns: repeat(6, 1fr); */
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
}

.icon-item {
  cursor:
    var(--px-cursor-pointer-src) 14 0,
    pointer;
  /* border: 1px solid #ddd; */
  transition: all 0.3s;

  /* css houdini paint */
  background-image: paint(pixelbox);
  --px-border: 3px;
  --px-border-t: 3px;
  --px-border-r: 3px;
  --px-border-b: 3px;
  --px-border-l: 3px;
  --px-border-radius: 2px;
  --px-border-radius-lt: 2px;
  --px-border-radius-rt: 2px;
  --px-border-radius-lb: 2px;
  --px-border-radius-rb: 2px;
  --px-bg-color: transparent;
  --px-border-color: var(--px-text-color-sakura);
  --px-bg-shadow-border: 0;
  --px-bg-shadow-color: transparent;

  &:hover {
    .icon-name {
      color: var(--px-color-primary-dark-1);
    }
  }
}

:deep(.icon-item:hover .px-icon) {
  color: var(--px-color-primary) !important;
}
.vp-doc li + li {
  margin-top: 0;
}
</style>
