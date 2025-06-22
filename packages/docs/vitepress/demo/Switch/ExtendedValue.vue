<template>
  <px-tooltip :content="'Switch value: ' + value" placement="top">
    <px-switch
      v-model="value"
      style="
        --px-switch-on-color: #13ce66;
        --px-switch-on-border-color: #13ce66;
        --px-switch-off-color: #ff4949;
        --px-switch-off-border-color: #ff4949;
        --px-switch-off-action-color: #ffffff;
      "
      active-value="100"
      inactive-value="0"
    />
  </px-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('100')
</script>
