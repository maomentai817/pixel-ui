<template>
  <px-dropdown split-button type="primary">
    Light
    <template #dropdown>
      <px-dropdown-menu>
        <px-dropdown-item>Action 1</px-dropdown-item>
        <px-dropdown-item>Action 2</px-dropdown-item>
        <px-dropdown-item>Action 3</px-dropdown-item>
        <px-dropdown-item divided>Action 4</px-dropdown-item>
        <px-dropdown-item>Action 5</px-dropdown-item>
      </px-dropdown-menu>
    </template>
  </px-dropdown>
  <px-dropdown split-button type="success" effect="dark">
    Drak
    <template #dropdown>
      <px-dropdown-menu>
        <px-dropdown-item>Action 1</px-dropdown-item>
        <px-dropdown-item>Action 2</px-dropdown-item>
        <px-dropdown-item>Action 3</px-dropdown-item>
        <px-dropdown-item divided>Action 4</px-dropdown-item>
        <px-dropdown-item>Action 5</px-dropdown-item>
      </px-dropdown-menu>
    </template>
  </px-dropdown>
  <px-dropdown split-button type="warning" effect="customized">
    Customized
    <template #dropdown>
      <px-dropdown-menu>
        <px-dropdown-item>Action 1</px-dropdown-item>
        <px-dropdown-item>Action 2</px-dropdown-item>
        <px-dropdown-item>Action 3</px-dropdown-item>
        <px-dropdown-item divided>Action 4</px-dropdown-item>
        <px-dropdown-item>Action 5</px-dropdown-item>
      </px-dropdown-menu>
    </template>
  </px-dropdown>
</template>
<style scoped>
.px-dropdown + .px-dropdown {
  margin-left: 15px;
}
:deep(.px-tooltip__popper.is-customized) {
  --px-bg-color: #9fe597;
  --px-border-color: #9fe597;
  --px-popover-text-color: red;

  #arrow::before {
    --px-popover-bg-color: #9fe597;
    --px-popover-border-color: #9fe597;
  }
}

:deep(.is-customized .divided-placeholder) {
  border-top-color: var(--px-color-white);
}
</style>
