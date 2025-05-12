<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
import pet from './fantastic/pet.vue'
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <div class="busuanzi text-15px color-gray text-center">
        本站访客数 <span id="busuanzi_value_site_uv" /> 人次 本站总访问量 <span id="busuanzi_value_site_pv" /> 次
      </div>
      <pet />
    </template>
  </Layout>
</template>
