<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type {
  EyeDropperProps,
  EyeDropperInstance,
  EyeDropperOpenOptions,
  EyeDropperResult,
  EyeDropperEmits
} from './types'

const COMP_NAME = 'PxEyeDropper' as const
defineOptions({
  name: COMP_NAME
})

const props = withDefaults(defineProps<EyeDropperProps>(), {
  initialValue: ''
})

const emits = defineEmits<EyeDropperEmits>()

const sRGBHex = ref(props.initialValue)

const open = async (
  options?: EyeDropperOpenOptions
): Promise<EyeDropperResult | undefined> => {
  const eyeDropper = new (window as any).EyeDropper()
  const result = await eyeDropper.open(options)

  sRGBHex.value = result.sRGBHex
  emits('change', result.sRGBHex)

  return result
}

watch(
  () => props.initialValue,
  (val) => {
    sRGBHex.value = val
  }
)

onMounted(() => {
  sRGBHex.value = props.initialValue
})

defineExpose<EyeDropperInstance>({
  open,
  sRGBHex: sRGBHex.value
})
</script>

<template>
  <div class="px-eyedropper">
    <slot :open="open" :sRGBHex="sRGBHex"></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
