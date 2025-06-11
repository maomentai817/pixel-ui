<script setup lang="ts">
import type { MessageBoxPropsIn, MessageBoxAction } from './types'

const COMP_NAME = 'PxMessageBox' as const
defineOptions({
  name: COMP_NAME,
  inheritAttrs: false
})
</script>

<template>message-box</template>

<style scoped>
@import './style.css';
</style>
