<template>
  <div class="max-w-600">
    <px-alert title="Iron alert" iron />
    <px-alert title="Unclosable alert" iron :closable="false" />
    <px-alert title="USE ICON" iron show-icon />
    <px-alert title="CENTER" iron center show-icon />
    <px-alert
      title="Icon with description"
      iron
      description="More text description"
      show-icon
    />
    <px-alert
      title="Icon with description"
      iron
      description="More text description"
      show-icon
      class="board-alert"
    />
    <px-alert
      title="Icon with description"
      iron
      description="More text description"
      show-icon
      class="other-alert"
    />
  </div>
</template>
<style scoped>
.board-alert {
  --px-corner-size: 6 !important;
  --px-block-size: 9 !important;
  padding: var(--px-alert-padding) !important;
  height: 300px;
}
.other-alert {
  --px-board-color: #733f38 !important;
  --px-color-1: #feac28 !important;
  --px-color-2: #f87622 !important;
  --px-shadow-color: #3f282f !important;
}
</style>
