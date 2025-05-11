<template>
  <px-dropdown>
    <span class="flex items-center color-#209cee text-12">
      Dropdown List
      <px-icon
        icon="angle-down-solid"
        color="var(--px-color-primary)"
        class="ml-5 mt-3"
      />
    </span>
    <template #dropdown>
      <px-dropdown-menu>
        <px-dropdown-item>Action 1</px-dropdown-item>
        <px-dropdown-item>Action 2</px-dropdown-item>
        <px-dropdown-item>Action 3</px-dropdown-item>
        <px-dropdown-item disabled>Action 4</px-dropdown-item>
        <px-dropdown-item divided>Action 5</px-dropdown-item>
      </px-dropdown-menu>
    </template>
  </px-dropdown>
</template>
