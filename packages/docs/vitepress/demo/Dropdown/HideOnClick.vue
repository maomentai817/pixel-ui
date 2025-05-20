<template>
  <px-dropdown :hide-on-click="false">
    <span class="px-dropdown-link">
      Dropdown List
      <px-icon
        icon="angle-down-solid"
        color="var(--px-color-primary)"
        class="translate-y-1 ml-5"
      />
    </span>
    <template #dropdown>
      <px-dropdown-menu>
        <px-dropdown-item>Action 1</px-dropdown-item>
        <px-dropdown-item>Action 2</px-dropdown-item>
        <px-dropdown-item>Action 3</px-dropdown-item>
        <px-dropdown-item disabled>Action 4</px-dropdown-item>
        <px-dropdown-item divided>Action 5</px-dropdown-item>
        <px-dropdown-item divided>Action 6</px-dropdown-item>
      </px-dropdown-menu>
    </template>
  </px-dropdown>
</template>

<style scoped>
.px-dropdown + .px-dropdown {
  margin-left: 15px;
}
.px-dropdown-link {
  cursor: pointer;
  color: var(--px-color-primary);
  font-size: 12px;
  display: flex;
  align-items: center;
}
</style>
