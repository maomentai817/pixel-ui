<script setup lang="ts">
import { provideGlobalConfig } from './hooks'
import type { ConfigProviderProps } from './types'

const COMP_NAME = 'PxConfigProvider' as const
defineOptions({
  name: COMP_NAME
})
const props = defineProps<ConfigProviderProps>()
const config = provideGlobalConfig(props)
</script>

<template>
  <slot name="default" :config="config"></slot>
</template>
