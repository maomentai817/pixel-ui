<template>
  <px-dropdown @command="handleCommand">
    <span class="px-dropdown-link">
      Dropdown List<px-icon
        icon="angle-down-solid"
        color="#209cee"
        class="ml-5 translate-y-1"
      />
    </span>
    <template #dropdown>
      <px-dropdown-menu>
        <px-dropdown-item command="a">Action 1</px-dropdown-item>
        <px-dropdown-item command="b">Action 2</px-dropdown-item>
        <px-dropdown-item command="c">Action 3</px-dropdown-item>
        <px-dropdown-item command="d" disabled>Action 4</px-dropdown-item>
        <px-dropdown-item command="e" divided>Action 5</px-dropdown-item>
      </px-dropdown-menu>
    </template>
  </px-dropdown>
</template>

<script lang="ts" setup>
const handleCommand = (command: string | number | object) => {
  alert(`click on item ${command}`)
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
