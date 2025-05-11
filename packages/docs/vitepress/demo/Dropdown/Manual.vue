<script setup lang="ts">
import type { DropdownItemProps, DropdownInstance } from '@mmt817/pixel-ui'
import { ref } from 'vue'

const items: DropdownItemProps[] = [
  { command: '1', label: 'Action 1' },
  { command: '2', label: 'Action 2' },
  { command: '3', label: 'Action 3', disabled: true },
  { command: '4', label: 'Action 4', divided: true }
]
const dropdownRef = ref<DropdownInstance>()
</script>

<template>
  <px-button @click="() => dropdownRef?.open()" size="small">open</px-button>
  <px-button @click="() => dropdownRef?.close()" size="small">close</px-button>
  <br />
  <px-dropdown ref="dropdownRef" :items="items" trigger="click">
    <span class="dropdown-link">
      Dropdown List
      <px-icon
        icon="angle-down-solid"
        color="var(--px-color-primary)"
        class="translate-y-2"
      />
    </span>
  </px-dropdown>
</template>

<style scoped>
.dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  color: var(--px-color-primary);
  margin-top: 20px;
  i {
    margin-left: 8px;
  }
}
</style>
