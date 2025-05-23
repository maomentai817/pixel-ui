<script setup lang="ts">
defineProps<{
  type: string
  details?: string
}>()
</script>

<template>
  <span class="api-typing inline-flex items-center">
    <code>
      {{ type }}
    </code>
    <px-tooltip v-if="details" trigger="click">
      <code class="api-typing-icon">
        <i class="hn hn-info-circle-solid" />
      </code>
      <template #content>
        <div class="vp-tooltip-content">
          <code>
            {{ details }}
          </code>
        </div>
      </template>
    </px-tooltip>
  </span>
</template>
<style scoped>
.api-typing-icon {
  background-color: transparent;
}
.hn {
  font-size: 18px;
  cursor: pointer;
  &::before {
    vertical-align: middle;
  }
}
:deep(.px-tooltip__popper) {
  --px-popover-padding: 8px;
}
.vp-tooltip-content {
  code {
    font-size: 12px;
    line-height: 1.875;
  }
}
</style>
