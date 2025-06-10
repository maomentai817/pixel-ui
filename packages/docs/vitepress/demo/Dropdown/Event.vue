<template>
  <px-dropdown @command="handleCommand">
    <span class="px-dropdown-link">
      Dropdown List
      <px-icon
        icon="angle-down-solid"
        color="var(--px-color-primary)"
        class="translate-y-1 ml-5"
      />
    </span>
    <template #dropdown>
      <px-dropdown-item command="a">Action 1</px-dropdown-item>
      <px-dropdown-item command="b">Action 2</px-dropdown-item>
      <px-dropdown-item command="c">Action 3</px-dropdown-item>
      <px-dropdown-item command="d" disabled>Action 4</px-dropdown-item>
      <px-dropdown-item command="e" divided>Action 5</px-dropdown-item>
    </template>
  </px-dropdown>
</template>

<script lang="ts" setup>
import { PxMessage, messageTypes } from '@mmt817/pixel-ui'
const handleCommand = (command: string | number | object) => {
  PxMessage({
    message: `click on item ${command}`,
    type: messageTypes[Math.floor(Math.random() * messageTypes.length)]
  })
}
</script>

<style scoped>
.px-dropdown-link {
  cursor: pointer;
  color: var(--px-color-primary);
  font-size: 12px;
  display: flex;
  align-items: center;
}
</style>
