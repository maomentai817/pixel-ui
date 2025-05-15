<template>
  <div class="max-w-600">
    <px-progress :percentage="50" class="mb-15" />
    <px-progress :percentage="100" :format="format" class="mb-15" />
    <px-progress :percentage="100" status="success" class="mb-15" />
    <px-progress :percentage="100" status="warning" class="mb-15" />
    <px-progress :percentage="50" status="danger" class="mb-15" />
    <px-progress :percentage="70" status="sakura" class="mb-15" />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage: number) =>
  percentage === 100 ? 'Full' : `${percentage}%`
</script>
