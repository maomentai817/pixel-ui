<template>
  <div class="flex flex-wrap items-center">
    <px-dropdown>
      <px-button type="primary">
        Dropdown List<px-icon
          icon="angle-down-solid"
          color="var(--px-color-white)"
          class="translate-y-1 ml-5"
        />
      </px-button>
      <template #dropdown>
        <px-dropdown-item>Action 1</px-dropdown-item>
        <px-dropdown-item>Action 2</px-dropdown-item>
        <px-dropdown-item>Action 3</px-dropdown-item>
        <px-dropdown-item>Action 4</px-dropdown-item>
        <px-dropdown-item>Action 5</px-dropdown-item>
      </template>
    </px-dropdown>
    <px-dropdown split-button type="primary" @click="handleClick">
      Dropdown List
      <template #dropdown>
        <px-dropdown-item>Action 1</px-dropdown-item>
        <px-dropdown-item>Action 2</px-dropdown-item>
        <px-dropdown-item>Action 3</px-dropdown-item>
        <px-dropdown-item divided>Action 4</px-dropdown-item>
        <px-dropdown-item>Action 5</px-dropdown-item>
      </template>
    </px-dropdown>
  </div>
</template>

<script lang="ts" setup>
const handleClick = () => {
  // eslint-disable-next-line no-alert
  alert('button click')
}
</script>

<style scoped>
.px-dropdown + .px-dropdown {
  margin-left: 15px;
}
.px-dropdown-link {
  cursor: pointer;
  color: var(--px-color-primary);
  display: flex;
  align-items: center;
}
</style>
