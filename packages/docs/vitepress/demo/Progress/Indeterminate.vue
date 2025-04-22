<template>
  <div class="max-w-600">
    <px-progress :percentage="50" indeterminate :duration="1" class="mb-15" />
    <px-progress
      :percentage="100"
      :format="format"
      indeterminate
      class="mb-15"
    />
    <px-progress
      :percentage="100"
      status="success"
      indeterminate
      class="mb-15"
    />
    <px-progress
      :percentage="100"
      status="warning"
      indeterminate
      class="mb-15"
    />
    <px-progress
      :percentage="50"
      status="danger"
      indeterminate
      :duration="6"
      class="mb-15"
    />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage: number) =>
  percentage === 100 ? 'Full' : `${percentage}%`
</script>
