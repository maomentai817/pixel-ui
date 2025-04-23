<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <div class="busuanzi">
        本站访客数 <span id="busuanzi_value_site_uv" /> 人次 本站总访问量 <span id="busuanzi_value_site_pv" /> 次
      </div>
    </template>
  </Layout>
</template>

<style>
.busuanzi {
  font-size: 15px;
  color: gray;
  text-align: center;
}
</style>