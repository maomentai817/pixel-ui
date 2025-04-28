<template>
  <px-tooltip content="light theme">
    <px-button>Light</px-button>
  </px-tooltip>
  <px-tooltip content="dark theme" effect="dark">
    <px-button>Dark</px-button>
  </px-tooltip>

  <px-tooltip content="customized theme" effect="customized">
    <px-button>Customized theme</px-button>
  </px-tooltip>
</template>

<style>
.px-tooltip .px-tooltip__popper.is-customized {
  --px-bg-color: #9fe597;
  --px-border-color: #9fe597;
  --px-popover-text-color: red;
}

.px-tooltip .px-tooltip__popper.is-customized #arrow::before {
  --px-popover-bg-color: #9fe597;
  --px-popover-border-color: #9fe597;
}
</style>
