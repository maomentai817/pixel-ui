<script setup lang="ts">
import type {
  ButtonInstance,
  CollapseItemName,
  DropdownItemProps
} from '@mmt817/pixel-ui'
import { ref, onMounted } from 'vue'

const activeNames = ref([])

const handleChange = (val: CollapseItemName[]) => {
  console.log(val)
}

const stages = [
  { type: 'loop', start: 0, end: 11 },
  { type: 'once', start: 12, end: 41 },
  { type: 'loop', start: 31, end: 41 },
  { type: 'once', start: 42, end: 52 }
]

const format = (percentage: number) => {
  return percentage === 100 ? 'Full' : `${percentage}%`
}

const tooltiptest = ref()

const clicked = ref(false)
function onCancel() {
  clicked.value = true
}

const items: DropdownItemProps[] = [
  { command: '1', label: 'Action 1' },
  { command: '2', label: 'Action 2' },
  { command: '3', label: 'Action 3', disabled: true },
  { command: '4', label: 'Action 4', divided: true }
]

const BTN = ref<ButtonInstance>()
onMounted(() => {
  console.log(BTN.value?.ref)
})
</script>

<template>
  <px-button size="mini" ref="BTN">Normal</px-button>
  <px-button type="primary" size="mini">Primary</px-button>
  <px-button type="success" size="mini">Success</px-button>
  <px-button type="warning" size="mini">Warning</px-button>
  <px-button type="danger" size="mini">Danger</px-button>
  <px-button disabled size="mini">Disabled</px-button>
  <br />
  <br />
  <px-button size="small">Normal</px-button>
  <px-button type="primary" size="small">Primary</px-button>
  <px-button type="success" size="small">Success</px-button>
  <px-button type="warning" size="small">Warning</px-button>
  <px-button type="danger" size="small">Danger</px-button>
  <px-button disabled size="small">Disabled</px-button>
  <br />
  <br />
  <px-button>Normal</px-button>
  <px-button type="primary">Primary</px-button>
  <px-button type="success">Success</px-button>
  <px-button type="warning">Warning</px-button>
  <px-button type="danger">Danger</px-button>
  <px-button disabled>Disabled</px-button>
  <br />
  <br />
  <px-button size="large">Normal</px-button>
  <px-button type="primary" size="large">Primary</px-button>
  <px-button type="success" size="large">Success</px-button>
  <px-button type="warning" size="large">Warning</px-button>
  <px-button type="danger" size="large">Danger</px-button>
  <px-button disabled size="large">Disabled</px-button>
  <br />
  <br />
  <px-button round>Normal</px-button>
  <px-button type="primary" round>Primary</px-button>
  <px-button type="success" round>Success</px-button>
  <px-button type="warning" round>Warning</px-button>
  <px-button type="danger" round>Danger</px-button>
  <px-button disabled round>Disabled</px-button>
  <br />
  <br />
  <px-button circle>Normal</px-button>
  <px-button type="primary" circle>Primary</px-button>
  <px-button type="success" circle>Success</px-button>
  <px-button type="warning" circle>Warning</px-button>
  <px-button type="danger" circle>Danger</px-button>
  <px-button disabled circle>Disabled</px-button>
  <px-button disabled circle>1</px-button>
  <br />
  <br />
  <px-icon icon="face-thinking-solid"></px-icon>
  <px-icon icon="face-thinking-solid" size="30"></px-icon>
  <px-icon icon="face-thinking-solid" color="red"></px-icon>
  <px-icon icon="face-thinking-solid" type="primary"></px-icon>
  <px-icon icon="face-thinking-solid" type="success"></px-icon>
  <px-icon icon="face-thinking-solid" type="warning"></px-icon>
  <px-icon icon="face-thinking-solid" type="danger"></px-icon>
  <px-icon icon="face-thinking-solid" flip="horizontal"></px-icon>
  <px-icon icon="face-thinking-solid" flip="vertical"></px-icon>
  <px-icon icon="face-thinking-solid" flip="both"></px-icon>
  <px-icon icon="face-thinking-solid" rotation="180"></px-icon>
  <px-icon icon="face-thinking-solid" spin></px-icon>
  <px-icon icon="face-thinking-solid" bounce></px-icon>
  <px-icon icon="face-thinking-solid" shake></px-icon>
  <px-icon icon="face-thinking-solid" beat></px-icon>
  <br />
  <br />
  <px-button-group type="primary" round>
    <px-button>Button1</px-button>
    <px-button>Button2</px-button>
    <px-button>Button3</px-button>
  </px-button-group>
  <px-button-group type="success" circle>
    <px-button>Button1</px-button>
    <px-button>Button3</px-button>
  </px-button-group>
  <px-button-group type="warning">
    <px-button>Button1</px-button>
    <px-button>Button2</px-button>
    <px-button>Button3</px-button>
    <px-button>Button4</px-button>
  </px-button-group>
  <br />
  <br />
  <px-button color="#626aef">Button</px-button>
  <px-button color="#626aef" disabled>Button</px-button>
  <px-button color="#626aef" plain>Button</px-button>
  <px-button color="#dfee56">Button</px-button>
  <px-button color="#dfee56" disabled>Button</px-button>
  <px-button color="#dfee56" plain>Button</px-button>
  <px-button color="#fadbe0">Button</px-button>
  <px-button color="#fadbe0" disabled>Button</px-button>
  <px-button color="#fadbe0" plain>Button</px-button>
  <br />
  <br />
  <px-card style="width: 240px" hoverable round>
    <template #prepend>
      <px-icon icon="face-thinking-solid" size="30"></px-icon>
    </template>
    <template #header>1212</template>
    xxxx
    <template #footer>3434</template>
    <template #append>
      <px-button>Button1</px-button>
    </template>
  </px-card>
  <br />
  <br />
  <px-text>Base</px-text>
  <px-text type="primary">Primary</px-text>
  <px-text type="success">Success</px-text>
  <px-text type="warning">Warning</px-text>
  <px-text type="danger">Danger</px-text>
  <px-text size="26" color="#626aef" align="left" bold>Text</px-text>
  <br />
  <br />
  <br />
  <px-collapse
    v-model="activeNames"
    @change="handleChange"
    style="width: 240px"
    accordion
  >
    <px-collapse-item name="1" title="标题1" icon="cog">
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
        dolorum modi similique autem ex odit aliquid obcaecati doloribus officia
        odio impedit, fugit vitae ullam repudiandae. Unde saepe modi porro
        necessitatibus.
      </div>
    </px-collapse-item>
    <px-collapse-item name="2" title="标题2" disabled> 内容2 </px-collapse-item>
    <px-collapse-item name="3" title="标题3"> 内容3 </px-collapse-item>
  </px-collapse>
  <br />
  <br />
  <px-animation-frame
    src="/images/pet.gif"
    :stages="stages"
    :width="320"
    :height="320"
  />
  <br />
  <br />
  <div class="f-b">
    <div style="width: 600px">
      <px-alert type="success">Success alert</px-alert>
      <px-alert type="info">Info alert</px-alert>
      <px-alert type="warning">Warning alert</px-alert>
      <px-alert type="danger">Error alert</px-alert>
    </div>
    <div style="width: 600px">
      <px-alert title="Success Alert" type="success" effect="dark" />
      <px-alert title="Info Alert" type="info" effect="dark" />
      <px-alert title="Warning Alert" type="warning" effect="dark" />
      <px-alert title="Error Alert" type="danger" effect="dark" />
    </div>
  </div>
  <div class="basic block" style="max-width: 600px">
    <px-alert title="Unclosable alert" type="success" :closable="false" />
    <px-alert title="Alert with callback" type="warning" />
  </div>
  <div class="f-b">
    <div style="width: 600px">
      <px-alert title="Success alert" type="success" center show-icon />
      <px-alert title="Info alert" type="info" center show-icon />
      <px-alert title="Warning alert" type="warning" center show-icon />
      <px-alert title="Error alert" type="danger" center show-icon />
    </div>
    <div style="width: 600px">
      <px-alert
        title="Success alert"
        type="success"
        description="More text description"
        show-icon
      />
      <px-alert
        title="Info alert"
        type="info"
        description="More text description"
        show-icon
      />
      <px-alert
        title="Warning alert"
        type="warning"
        description="More text description"
        show-icon
      />
      <px-alert
        title="Error alert"
        type="danger"
        description="More text description"
        show-icon
      />
    </div>
  </div>
  <div class="flex mt-20 gap-10">
    <px-badge :value="102" class="item" :max="999">
      <px-button>comments</px-button>
    </px-badge>
    <px-badge :value="3" class="item">
      <px-button>replies</px-button>
    </px-badge>
    <px-badge :value="0" class="item" type="primary">
      <px-button>comments</px-button>
    </px-badge>
    <px-badge :value="2" class="item" type="warning">
      <px-button>replies</px-button>
    </px-badge>
    <px-badge :value="2" class="item" type="info">
      <px-button>replies</px-button>
    </px-badge>
  </div>
  <div class="flex mt-20 gap-10">
    <px-badge value="new" class="item" color="#626aef">
      <px-button>custom background</px-button>
    </px-badge>
    <px-badge value="99" class="item" color="#626aef">
      <px-button>custom background</px-button>
      <template #content="{ value }">
        <div class="custom-content">
          <px-icon icon="cog"></px-icon>
          <span>{{ value }}</span>
        </div>
      </template>
    </px-badge>
    <px-badge :value="1" class="item" is-dot>
      <px-button>custom background</px-button>
    </px-badge>
    <px-badge :value="1" class="item" is-dot :offset="[10, 5]">
      <px-button>custom background</px-button>
    </px-badge>
  </div>
  <div class="w-600 mt-20">
    <px-progress class="mb-15" :percentage="50" />
    <px-progress class="mb-15" :percentage="100" :format="format" />
    <px-progress class="mb-15" :percentage="100" status="success" />
    <px-progress class="mb-15" :percentage="100" status="warning" />
    <px-progress class="mb-15" :percentage="50" status="danger" />
  </div>
  <div class="w-600 mt-20">
    <px-progress
      class="mb-15"
      :text-inside="true"
      :stroke-width="26"
      :percentage="70"
    />
    <px-progress
      class="mb-15"
      :text-inside="true"
      :stroke-width="24"
      :percentage="100"
      status="success"
    />
    <px-progress
      class="mb-15"
      :text-inside="true"
      :stroke-width="22"
      :percentage="80"
      status="warning"
    />
    <px-progress
      class="mb-15"
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="danger"
    />
    <px-progress class="mb-15" color="#626aef" :percentage="75" />
    <px-progress color="#626aef" :percentage="75" :text-inside="true"
      >content</px-progress
    >
  </div>
  <div class="w-600 mt-20">
    <px-progress class="mb-15" :percentage="50" :stroke-width="24" striped />
    <px-progress
      class="mb-15"
      :percentage="50"
      :stroke-width="24"
      striped
      color="#626aef"
    />
    <px-progress
      class="mb-15"
      :percentage="75"
      :stroke-width="24"
      striped
      striped-flow
      status="success"
    />
    <px-progress
      class="mb-15"
      :percentage="100"
      :stroke-width="24"
      striped
      status="warning"
    />
    <px-progress
      class="mb-15"
      :percentage="30"
      :stroke-width="24"
      striped
      striped-flow
      status="danger"
    />
    <px-progress
      class="mb-15"
      :percentage="30"
      :stroke-width="24"
      checker
      status="danger"
    />
    <px-progress :percentage="50" :indeterminate="true" />
  </div>
  <div class="tooltip-base-box w-1000">
    <div class="flex items-center justify-around">
      <px-tooltip
        class="mt-10"
        content="Top Left prompts info"
        placement="top-start"
      >
        <px-button size="small">top-start</px-button>
      </px-tooltip>
      <px-tooltip
        class="mt-10"
        content="Top Center prompts info"
        placement="top"
      >
        <px-button size="small">top</px-button>
      </px-tooltip>
      <px-tooltip
        class="mt-10"
        content="Top Right prompts info"
        trigger="click"
        placement="top-end"
      >
        <px-button size="small">top-end</px-button>
      </px-tooltip>
    </div>
    <div class="f-b">
      <px-tooltip
        class="mt-10"
        content="Left Top prompts info"
        placement="left-start"
      >
        <px-button size="small">left-start</px-button>
      </px-tooltip>
      <px-tooltip
        class="mt-10"
        content="Right Top prompts info"
        trigger="click"
        placement="right-start"
      >
        <px-button size="small">right-start</px-button>
      </px-tooltip>
    </div>
    <div class="f-b">
      <px-tooltip
        class="mt-10"
        content="Left Center prompts info"
        placement="left"
      >
        <px-button size="small" class="mt-3 mb-3">left</px-button>
      </px-tooltip>
      <px-tooltip
        class="mt-10"
        content="Right Center prompts info"
        placement="right"
      >
        <px-button size="small">right</px-button>
      </px-tooltip>
    </div>
    <div class="f-b">
      <px-tooltip
        class="mt-10"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <px-button size="small">left-end</px-button>
      </px-tooltip>
      <px-tooltip
        class="mt-10"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <px-button size="small">right-end</px-button>
      </px-tooltip>
    </div>
    <div class="flex items-center justify-around">
      <px-tooltip
        class="mt-10"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <px-button size="small">bottom-start</px-button>
      </px-tooltip>
      <px-tooltip
        class="mt-10"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <px-button size="small">bottom</px-button>
      </px-tooltip>
      <px-tooltip
        class="mt-10"
        content="Bottom Right prompts info"
        placement="bottom-end"
        effect="dark"
      >
        <px-button size="small">bottom-end</px-button>
      </px-tooltip>
    </div>
  </div>

  <!-- tooltip virtual trigger -->
  <div class="w-600 mt-20">
    <px-tooltip
      content="Bottom center"
      placement="bottom"
      trigger="hover"
      virtual-triggering
      :virtual-ref="tooltiptest?.ref"
    ></px-tooltip>
    <px-button ref="tooltiptest">virtual trigger</px-button>
  </div>
  <p class="mt-50">气泡确认框</p>
  <px-popconfirm title="Are you sure to delete this?">
    <px-button>Delete</px-button>
  </px-popconfirm>
  <p class="m-y-50"></p>
  <px-popconfirm
    width="220"
    icon="info-circle-solid"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
    @cancel="onCancel"
  >
    <template #reference>
      <px-button>Delete</px-button>
    </template>
    <template #actions="{ confirm, cancel }">
      <px-button size="mini" @click="cancel">No!</px-button>
      <px-button
        type="danger"
        size="mini"
        :disabled="!clicked"
        @click="confirm"
      >
        Yes?
      </px-button>
    </template>
  </px-popconfirm>
  <!-- dropdown -->
  <div class="flex flex-wrap m-y-30">
    <div class="flex-1">
      <div class="block text-14 mb-20 color-#209cee">通过 slot 传入 item</div>
      <px-dropdown trigger="click" placement="right-start">
        <span class="flex items-center cursor-pointer color-#209cee">
          Dropdown List
          <px-icon icon="angle-down" />
        </span>
        <template #dropdown>
          <px-dropdown-item command="1">Action 1</px-dropdown-item>
          <px-dropdown-item command="2" label="Action 2" />
          <px-dropdown-item command="3" disabled>Action 3</px-dropdown-item>
          <px-dropdown-item command="4" divided>Action 4</px-dropdown-item>
        </template>
      </px-dropdown>
    </div>
    <div class="flex-1">
      <div class="block text-14 mb-20 color-#209cee">通过 props 传入 item</div>
      <px-dropdown disabled :items="items">
        <span class="flex items-center cursor-pointer color-#209cee">
          Dropdown List
          <px-icon icon="angle-down" />
        </span>
      </px-dropdown>
    </div>
  </div>

  <div class="">
    <px-dropdown split-button type="primary" effect="dark" trigger="click">
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
  <div class="h-300"></div>
</template>

<style scoped></style>
