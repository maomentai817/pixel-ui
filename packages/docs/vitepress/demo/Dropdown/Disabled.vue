<script setup lang="ts">
import { type DropdownItemProps } from '@mmt817/pixel-ui'

const items: DropdownItemProps[] = [
  { command: '1', label: 'Action 1' },
  { command: '2', label: 'Action 2' },
  { command: '3', label: 'Action 3', disabled: true },
  { command: '4', label: 'Action 4', divided: true }
]
</script>

<template>
  <div class="flex flex-wrap">
    <div class="flex-1">
      <div class="desc">disabled</div>
      <px-dropdown :items="items" disabled>
        <span class="dropdown-link">
          Dropdown List
          <px-icon icon="angle-down-solid" />
        </span>
      </px-dropdown>
    </div>
    <div class="flex-1">
      <div class="desc">undisabled</div>
      <px-dropdown :items="items">
        <span class="dropdown-link">
          Dropdown List
          <px-icon icon="angle-down-solid" color="var(--px-color-primary)" />
        </span>
      </px-dropdown>
    </div>
  </div>
</template>

<style scoped>
.desc {
  display: block;
  color: var(--px-text-color-secondary);
  font-size: 12px;
  margin-bottom: 20px;
}
.dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  color: var(--px-color-primary);
  i {
    margin-left: 8px;
  }
}
</style>
