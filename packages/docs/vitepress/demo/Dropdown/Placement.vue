<template>
  <div class="dropdown-base-box">
    <div class="row center">
      <px-dropdown placement="top-start">
        <px-button size="small">top-start</px-button>
        <template #dropdown>
          <px-dropdown-menu>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
          </px-dropdown-menu>
        </template>
      </px-dropdown>

      <px-dropdown placement="top">
        <px-button size="small">top</px-button>
        <template #dropdown>
          <px-dropdown-menu>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
          </px-dropdown-menu>
        </template>
      </px-dropdown>

      <px-dropdown placement="top-end">
        <px-button size="small">top-end</px-button>
        <template #dropdown>
          <px-dropdown-menu>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
          </px-dropdown-menu>
        </template>
      </px-dropdown>
    </div>

    <div class="row">
      <px-dropdown placement="left-start">
        <px-button size="small">left-start</px-button>
        <template #dropdown>
          <px-dropdown-menu>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
          </px-dropdown-menu>
        </template>
      </px-dropdown>

      <px-dropdown placement="right-start">
        <px-button size="small">right-start</px-button>
        <template #dropdown>
          <px-dropdown-menu>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
          </px-dropdown-menu>
        </template>
      </px-dropdown>
    </div>

    <div class="row">
      <px-dropdown placement="left">
        <px-button size="small" class="mt-3 mb-3">left</px-button>
        <template #dropdown>
          <px-dropdown-menu>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
          </px-dropdown-menu>
        </template>
      </px-dropdown>

      <px-dropdown placement="right">
        <px-button size="small">right</px-button>
        <template #dropdown>
          <px-dropdown-menu>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
          </px-dropdown-menu>
        </template>
      </px-dropdown>
    </div>

    <div class="row">
      <px-dropdown placement="left-end">
        <px-button size="small">left-end</px-button>
        <template #dropdown>
          <px-dropdown-menu>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
          </px-dropdown-menu>
        </template>
      </px-dropdown>

      <px-dropdown placement="right-end">
        <px-button size="small">right-end</px-button>
        <template #dropdown>
          <px-dropdown-menu>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
          </px-dropdown-menu>
        </template>
      </px-dropdown>
    </div>

    <div class="row center">
      <px-dropdown placement="bottom-start">
        <px-button size="small">bottom-start</px-button>
        <template #dropdown>
          <px-dropdown-menu>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
          </px-dropdown-menu>
        </template>
      </px-dropdown>

      <px-dropdown placement="bottom">
        <px-button size="small">bottom</px-button>
        <template #dropdown>
          <px-dropdown-menu>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
          </px-dropdown-menu>
        </template>
      </px-dropdown>

      <px-dropdown placement="bottom-end">
        <px-button size="small">bottom-end</px-button>
        <template #dropdown>
          <px-dropdown-menu>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
          </px-dropdown-menu>
        </template>
      </px-dropdown>
    </div>
  </div>
</template>

<style>
.dropdown-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-base-box .center {
  justify-content: center;
}

.dropdown-base-box .row .px-dropdown {
  margin-top: 10px;
}
</style>
