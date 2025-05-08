<template>
  <div class="popconfirm-base-box">
    <div class="row center">
      <px-popconfirm
        class="box-item"
        title="Top Left prompts info"
        placement="top-start"
      >
        <template #reference>
          <px-button size="small">top-start</px-button>
        </template>
      </px-popconfirm>
      <px-popconfirm
        class="box-item"
        title="Top Center prompts info"
        placement="top"
      >
        <template #reference>
          <px-button size="small">top</px-button>
        </template>
      </px-popconfirm>
      <px-popconfirm
        class="box-item"
        title="Top Right prompts info"
        placement="top-end"
      >
        <template #reference>
          <px-button size="small">top-end</px-button>
        </template>
      </px-popconfirm>
    </div>
    <div class="row">
      <px-popconfirm
        class="box-item"
        title="Left Top prompts info"
        placement="left-start"
      >
        <template #reference>
          <px-button size="small">left-start</px-button>
        </template>
      </px-popconfirm>
      <px-popconfirm
        class="box-item"
        title="Right Top prompts info"
        placement="right-start"
      >
        <template #reference>
          <px-button size="small">right-start</px-button>
        </template>
      </px-popconfirm>
    </div>
    <div class="row">
      <px-popconfirm
        class="box-item"
        title="Left Center prompts info"
        placement="left"
      >
        <template #reference>
          <px-button size="small" class="mt-3 mb-3">left</px-button>
        </template>
      </px-popconfirm>
      <px-popconfirm
        class="box-item"
        title="Right Center prompts info"
        placement="right"
      >
        <template #reference>
          <px-button size="small">right</px-button>
        </template>
      </px-popconfirm>
    </div>
    <div class="row">
      <px-popconfirm
        class="box-item"
        title="Left Bottom prompts info"
        placement="left-end"
      >
        <template #reference>
          <px-button size="small">left-end</px-button>
        </template>
      </px-popconfirm>
      <px-popconfirm
        class="box-item"
        title="Right Bottom prompts info"
        placement="right-end"
      >
        <template #reference>
          <px-button size="small">right-end</px-button>
        </template>
      </px-popconfirm>
    </div>
    <div class="row center">
      <px-popconfirm
        class="box-item"
        title="Bottom Left prompts info"
        placement="bottom-start"
      >
        <template #reference>
          <px-button size="small">bottom-start</px-button></template
        >
      </px-popconfirm>
      <px-popconfirm
        class="box-item"
        title="Bottom Center prompts info"
        placement="bottom"
      >
        <template #reference>
          <px-button size="small">bottom</px-button></template
        >
      </px-popconfirm>
      <px-popconfirm
        class="box-item"
        title="Bottom Right prompts info"
        placement="bottom-end"
      >
        <template #reference>
          <px-button size="small">bottom-end</px-button>
        </template>
      </px-popconfirm>
    </div>
  </div>
</template>

<style>
.popconfirm-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.popconfirm-base-box .center {
  justify-content: center;
}

.popconfirm-base-box .box-item {
  margin-top: 10px;
}
</style>
