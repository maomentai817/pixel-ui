<template>
  <div class="flex flex-wrap items-center">
    <px-dropdown>
      <px-button type="primary">
        Dropdown List<px-icon
          icon="angle-down-solid"
          color="#fff"
          class="ml-5 translate-y-1"
        />
      </px-button>
      <template #dropdown>
        <px-dropdown-menu>
          <px-dropdown-item>Action 1</px-dropdown-item>
          <px-dropdown-item>Action 2</px-dropdown-item>
          <px-dropdown-item>Action 3</px-dropdown-item>
          <px-dropdown-item>Action 4</px-dropdown-item>
          <px-dropdown-item>Action 5</px-dropdown-item>
        </px-dropdown-menu>
      </template>
    </px-dropdown>
    <px-dropdown split-button type="primary" @click="handleClick">
      Dropdown List
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
  </div>
</template>

<script lang="ts" setup>
const handleClick = () => {
  // eslint-disable-next-line no-alert
  alert('button click')
}
</script>

<style scoped>
.example-showcase .px-dropdown + .px-dropdown {
  margin-left: 15px;
}
.example-showcase .px-dropdown-link {
  cursor: pointer;
  color: var(--px-color-primary);
  display: flex;
  align-items: center;
}
</style>
