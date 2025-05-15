<template>
  <px-dropdown size="large" split-button type="sakura">
    Large
    <template #dropdown>
      <px-dropdown-menu>
        <px-dropdown-item>Action 1</px-dropdown-item>
        <px-dropdown-item>Action 2</px-dropdown-item>
        <px-dropdown-item>Action 3</px-dropdown-item>
        <px-dropdown-item>Action 4</px-dropdown-item>
      </px-dropdown-menu>
    </template>
  </px-dropdown>

  <px-dropdown split-button type="success">
    Default
    <template #dropdown>
      <px-dropdown-menu>
        <px-dropdown-item>Action 1</px-dropdown-item>
        <px-dropdown-item>Action 2</px-dropdown-item>
        <px-dropdown-item>Action 3</px-dropdown-item>
        <px-dropdown-item>Action 4</px-dropdown-item>
      </px-dropdown-menu>
    </template>
  </px-dropdown>

  <px-dropdown size="small" split-button type="warning">
    Small
    <template #dropdown>
      <px-dropdown-menu>
        <px-dropdown-item>Action 1</px-dropdown-item>
        <px-dropdown-item>Action 2</px-dropdown-item>
        <px-dropdown-item>Action 3</px-dropdown-item>
        <px-dropdown-item>Action 4</px-dropdown-item>
      </px-dropdown-menu>
    </template>
  </px-dropdown>
</template>

<style scoped>
.px-dropdown + .px-dropdown {
  margin-left: 15px;
}
</style>
