<template>
  <div class="i18n-container">
    <px-button @click="changeLang" type="success" class="mr-20">{{
      language
    }}</px-button>
    <px-config-provider :locale="locale">
      <px-popconfirm title="Are you shure to delete this item?" trigger="hover">
        <px-button>Delete</px-button>
      </px-popconfirm>
    </px-config-provider>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { en, zhCN, zhTW } from '@mmt817/pixel-ui'
import { get } from 'lodash-es'

// 国际化
const language = ref('zhCN')
const langMap = { en, zhCN, zhTW } as const
const locale = computed(() => get(langMap, language.value))
const changeLang = () => {
  const l = ['en', 'zhCN', 'zhTW']
  language.value = l[(l.indexOf(language.value) + 1) % l.length]
}
</script>
