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
      <div class="desc">hover</div>
      <px-dropdown :items="items">
        <span class="dropdown-link">
          Dropdown List
          <px-icon
            icon="angle-down-solid"
            color="#209cee"
            class="translate-y-2"
          />
        </span>
      </px-dropdown>
    </div>
    <div class="flex-1">
      <div class="desc">click</div>
      <px-dropdown :items="items" trigger="click">
        <span class="dropdown-link">
          Dropdown List
          <px-icon
            icon="angle-down-solid"
            color="#209cee"
            class="translate-y-2"
          />
        </span>
      </px-dropdown>
    </div>
    <div class="flex-1">
      <div class="desc">contextmenu</div>
      <px-dropdown :items="items" trigger="contextmenu">
        <span class="dropdown-link">
          Dropdown List
          <px-icon
            icon="angle-down-solid"
            color="#209cee"
            class="translate-y-2"
          />
        </span>
      </px-dropdown>
    </div>
  </div>
</template>

<style scoped>
.desc {
  display: block;
  color: var(--px-text-color-secondary);
  font-size: 10px;
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
