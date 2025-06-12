<script setup lang="ts">
import type {
  ButtonInstance,
  CollapseItemName,
  DropdownItemProps
} from '@mmt817/pixel-ui'
import { ref, onMounted, computed, h } from 'vue'
import { en, zhCN, zhTW, PxMessage, PxNotification } from '@mmt817/pixel-ui'
import { get } from 'lodash-es'

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
  // console.log(BTN.value?.ref)
})

const pixelitScale = ref(8)
const pxImgBlockSize = ref(8)
const pxImgColorCount = ref(32)
const showGrid = ref(false)

// 国际化
const language = ref('zhCN')
const langMap = { en, zhCN, zhTW } as const
const locale = computed(() => get(langMap, language.value))
const changeLang = () => {
  const l = ['en', 'zhCN', 'zhTW']
  language.value = l[(l.indexOf(language.value) + 1) % l.length]
}

// message
const handleMessage = () => {
  PxMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
  PxMessage({
    message: 'This is a info message',
    duration: 0
  })
  PxMessage.primary({
    message: 'This is a primary message',
    duration: 0,
    showClose: true
  })
  PxMessage.success({
    message: 'This is a success message',
    duration: 0,
    center: true
  })
  PxMessage.warning({
    message: 'This is a warning message',
    duration: 0
  })
  PxMessage.danger({
    message: 'This is a danger message',
    duration: 0
  })
  PxMessage.sakura({
    message: 'This is a sakura message',
    duration: 0
  })
  PxMessage.error({
    message: '错误消息弹出',
    duration: 0
  })
  PxMessage.iron({
    message: 'This is a iron message',
    duration: 0,
    showClose: true,
    icon: 'face-thinking-solid'
  })
  PxMessage.stamp({
    message: 'This is a stamp message',
    duration: 0,
    showClose: true
  })
}
// notification
const handleNotification = () => {
  PxNotification({
    title: 'VNode',
    duration: 0,
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
  PxNotification({
    title: 'Info',
    message: 'This is a info notification',
    duration: 0
  })
  PxNotification.primary({
    title: 'Primary',
    message: 'This is a primary notification',
    duration: 0,
    showClose: true
  })
  PxNotification.success({
    title: 'Success',
    message: 'This is a success notification',
    duration: 0
  })
  PxNotification.warning({
    title: 'Warning',
    message: 'This is a warning notification',
    duration: 0
  })
  PxNotification.danger({
    title: 'Danger',
    message: 'This is a danger notification',
    duration: 0
  })
  PxNotification.sakura({
    title: 'Sakura',
    message: 'This is a sakura notification',
    duration: 0
  })
  PxNotification.error({
    title: 'Error',
    message: '错误消息弹出',
    duration: 0
  })
  PxNotification.iron({
    title: 'Iron',
    message: 'This is a iron notification',
    duration: 0,
    showClose: true,
    icon: 'face-thinking-solid'
  })
  PxNotification.stamp({
    title: 'Stamp',
    message: 'This is a stamp notification',
    duration: 0,
    showClose: true
  })
}

// input
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('')
const textarea = ref('')
</script>

<template>
  <div class="playground-container p-x-20 bgc-#ebe6e0">
    <div>一二三四---___"双引号"……'单引号'</div>
    <hr />
    <div>abcdefghijklmnopqrstuvwxyz事件发生加班费</div>
    <hr />
    <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
    <hr />
    <div class="b-red b-solid b-1">
      逗号， 句号。 顿号、 分号； 冒号： 双引号“ 双引号” 单引号‘ 单引号’
      书名号《 书名号》 圆括号（ 圆括号） 方括号【 方括号】 破折号—— 省略号……
      感叹号！ 问号？ 人民币符号￥
      <br />
      <br />
      英文逗号, 英文句号. 英文分号; 英文冒号: 英文双引号" 英文单引号' 小于号&lt;
      大于号&gt; 圆括号( 圆括号) 方括号[ 方括号] 大括号{ 大括号} 连接号/中横线-
      下划线_ 省略号… 感叹号! 问号? 艾特符@ 井号# 美元符号$ 百分号%
      脱字符/抑扬符^ 和号&amp; 星号* 斜杠/ 反斜杠\ 竖线| 波浪线~ 反引号` 等号=
      减号- 加号+
    </div>
    <hr />
    <div class="b-red b-solid b-1" style="font-family: 'Zpix'">
      逗号， 句号。 顿号、 分号； 冒号： 双引号“ 双引号” 单引号‘ 单引号’
      书名号《 书名号》 圆括号（ 圆括号） 方括号【 方括号】 破折号—— 省略号……
      感叹号！ 问号？ 人民币符号￥
      <br />
      <br />
      英文逗号, 英文句号. 英文分号; 英文冒号: 英文双引号" 英文单引号' 小于号&lt;
      大于号&gt; 圆括号( 圆括号) 方括号[ 方括号] 大括号{ 大括号} 连接号/中横线-
      下划线_ 省略号… 感叹号! 问号? 艾特符@ 井号# 美元符号$ 百分号%
      脱字符/抑扬符^ 和号&amp; 星号* 斜杠/ 反斜杠\ 竖线| 波浪线~ 反引号` 等号=
      减号- 加号+
      <hr />
      ABCDEFGHIJKLMNOPQRSTUVWXYZ口口毛十力====----()=>VOID
      <hr />
      abcdefghijklmnopqrstuvwxyz口口毛十力====----()=>void
    </div>
    <hr />
    <px-button size="small" ref="BTN">Normal</px-button>
    <px-button type="primary" size="small">Primary</px-button>
    <px-button type="success" size="small">Success</px-button>
    <px-button type="warning" size="small">Warning</px-button>
    <px-button type="danger" size="small">Danger</px-button>
    <px-button disabled size="small">Disabled</px-button>
    <hr />
    <px-button size="small">Normal</px-button>
    <px-button type="primary" size="small">Primary</px-button>
    <px-button type="success" size="small">Success</px-button>
    <px-button type="warning" size="small">Warning</px-button>
    <px-button type="danger" size="small">Danger</px-button>
    <px-button disabled size="small">Disabled</px-button>
    <hr />
    <px-button>Normal</px-button>
    <px-button type="primary">Primary</px-button>
    <px-button type="success">Success</px-button>
    <px-button type="warning">Warning</px-button>
    <px-button type="danger">Danger</px-button>
    <px-button disabled>Disabled</px-button>
    <hr />
    <px-button size="large">Normal</px-button>
    <px-button type="primary" size="large">Primary</px-button>
    <px-button type="success" size="large">Success</px-button>
    <px-button type="warning" size="large">Warning</px-button>
    <px-button type="danger" size="large">Danger</px-button>
    <px-button disabled size="large">Disabled</px-button>
    <hr />
    <px-button round>Normal</px-button>
    <px-button type="primary" round>Primary</px-button>
    <px-button type="success" round>Success</px-button>
    <px-button type="warning" round>Warning</px-button>
    <px-button type="danger" round>Danger</px-button>
    <px-button disabled round>Disabled</px-button>
    <hr />
    <px-button circle>Normal</px-button>
    <px-button type="primary" circle>Primary</px-button>
    <px-button type="success" circle>Success</px-button>
    <px-button type="warning" circle>Warning</px-button>
    <px-button type="danger" circle>Danger</px-button>
    <px-button disabled circle>Disabled</px-button>
    <px-button disabled circle>1</px-button>
    <hr />
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
    <hr />
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
    <hr />
    <px-button color="#626aef">Button</px-button>
    <px-button color="#626aef" disabled>Button</px-button>
    <px-button color="#626aef" plain>Button</px-button>
    <px-button color="#dfee56">Button</px-button>
    <px-button color="#dfee56" disabled>Button</px-button>
    <px-button color="#dfee56" plain>Button</px-button>
    <px-button color="#fadbe0">Button</px-button>
    <px-button color="#fadbe0" disabled>Button</px-button>
    <px-button color="#fadbe0" plain>Button</px-button>
    <hr />
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
    <hr />
    <px-text>Base</px-text>
    <px-text type="primary">Primary</px-text>
    <px-text type="success">Success</px-text>
    <px-text type="warning">Warning</px-text>
    <px-text type="danger">Danger</px-text>
    <px-text size="26" color="#626aef" align="left" bold>Text</px-text>
    <hr />
    <px-collapse
      v-model="activeNames"
      @change="handleChange"
      style="width: 240px"
      accordion
    >
      <px-collapse-item name="1" title="标题1" icon="cog">
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
          dolorum modi similique autem ex odit aliquid obcaecati doloribus
          officia odio impedit, fugit vitae ullam repudiandae. Unde saepe modi
          porro necessitatibus.
        </div>
      </px-collapse-item>
      <px-collapse-item name="2" title="标题2" disabled>
        内容2
      </px-collapse-item>
      <px-collapse-item name="3" title="标题3"> 内容3 </px-collapse-item>
    </px-collapse>
    <hr />
    <px-animation-frame
      src="/images/pet.gif"
      :stages="stages"
      :width="320"
      :height="320"
    />
    <hr />
    <div class="f-b">
      <div style="width: 600px">
        <px-alert type="success">Success alert</px-alert>
        <px-alert type="info">Info alert</px-alert>
        <px-alert type="warning">Warning alert</px-alert>
        <px-alert type="danger">Error alert</px-alert>
        <px-alert type="danger" iron>Iron alert</px-alert>
      </div>
      <div style="width: 600px">
        <px-alert title="Success Alert" type="success" effect="dark" />
        <px-alert title="Info Alert" type="info" effect="dark" />
        <px-alert title="Warning Alert" type="warning" effect="dark" />
        <px-alert title="Error Alert" type="danger" effect="dark" />
        <px-alert title="Iron Alert" type="danger" effect="dark" iron />
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
        <px-alert title="Iron alert" type="danger" iron center show-icon />
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
        <px-alert
          title="Iron alert"
          type="danger"
          iron
          description="More text description"
          show-icon
        />
      </div>
    </div>
    <div class="flex gap-10 mt-20">
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
    <div class="flex gap-10 mt-20">
      <px-badge value="new" class="item" color="#626aef">
        <px-button>custom background</px-button>
      </px-badge>
      <px-badge value="99" class="item" color="#fadbe0">
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
        <px-button size="small" @click="cancel">No!</px-button>
        <px-button
          type="danger"
          size="small"
          :disabled="!clicked"
          @click="confirm"
        >
          Yes?
        </px-button>
      </template>
    </px-popconfirm>
    <hr />
    <hr />
    <!-- tag -->
    <div>
      <px-tag>Default</px-tag>
      <px-tag type="primary" closable>Primary</px-tag>
      <px-tag type="success" size="small">Success</px-tag>
      <px-tag type="warning" size="large">Warning</px-tag>
      <px-tag type="danger" effect="plain">Danger</px-tag>
      <px-tag type="info" effect="plain">Info</px-tag>
      <px-tag type="sakura" closable>Sakura</px-tag>
    </div>
    <!-- dropdown -->
    <div class="m-y-30 flex flex-wrap">
      <div class="flex-1">
        <div class="block text-14 color-#209cee mb-20">通过 slot 传入 item</div>
        <px-dropdown trigger="click" placement="right-start">
          <span class="flex cursor-pointer items-center color-#209cee">
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
        <div class="block text-14 color-#209cee mb-20">
          通过 props 传入 item
        </div>
        <px-dropdown disabled :items="items">
          <span class="flex cursor-pointer items-center color-#209cee">
            Dropdown List
            <px-icon icon="angle-down" />
          </span>
        </px-dropdown>
      </div>
    </div>

    <div class="mb-30">
      <px-dropdown split-button type="primary" effect="dark" trigger="click">
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
    <span>{{ pxImgBlockSize }}</span>
    <input type="range" v-model="pxImgBlockSize" min="1" max="20" />
    <input
      type="range"
      v-model="pxImgColorCount"
      min="2"
      max="64"
      step="1"
      id="pxImgColorCount"
    />
    <label for="showGrid">{{ showGrid }}</label>
    <input type="checkbox" v-model="showGrid" id="showGrid" />
    <px-image
      src="/images/image1_portrait.jpg"
      :block-size="pxImgBlockSize"
      :color-count="pxImgColorCount"
      :show-grid="showGrid"
      scale="0.5"
    ></px-image>
    <hr />
    <hr />
    <label for="pixelitScale">{{ pixelitScale }}</label>
    <input
      type="range"
      v-model="pixelitScale"
      min="2"
      max="50"
      step="1"
      id="pixelitScale"
    />
    <px-pixel-it
      src="/images/image1_portrait.jpg"
      :scale="pixelitScale"
      :aspect-ratio="0.5"
    ></px-pixel-it>
    <!-- <px-image src="/images/Starbucks.png" :block-size="1" :color-count="8" /> -->
    <!-- 国际化 -->
    <hr />
    <px-button @click="changeLang" type="success" class="mr-20">{{
      language
    }}</px-button>
    <px-config-provider :locale="locale">
      <px-popconfirm title="Are you shure to delete this item?" trigger="hover">
        <px-button>Delete</px-button>
      </px-popconfirm>
    </px-config-provider>
    <hr />
    <px-button @click="handleMessage">message</px-button>
    <px-button @click="handleNotification">notification</px-button>
    This is a warning notification
    <hr />
    <px-card style="width: 240px" stamp>
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
    <hr />
    <div class="mb-20">
      <px-input
        v-model="input1"
        style="width: 240px"
        placeholder="Please input"
      />
    </div>
    <div class="mb-20">
      <px-input
        v-model="input1"
        style="width: 240px"
        disabled
        placeholder="Please input"
      />
    </div>
    <div class="mb-20">
      <px-input
        v-model="input1"
        style="width: 240px"
        clearable
        placeholder="Please input"
      />
    </div>
    <div class="mb-20">
      <px-input
        v-model="input2"
        type="password"
        placeholder="Please input password"
        show-password
      />
    </div>
    <div class="mb-20">
      <px-input v-model="input3" style="width: 240px" placeholder="Pick a date">
        <template #suffix>
          <px-icon icon="bluesky" />
        </template>
      </px-input>
    </div>
    <div class="mb-20">
      <px-input
        v-model="input4"
        style="width: 240px"
        placeholder="Type something"
      >
        <template #prefix>
          <px-icon icon="unsplash" />
        </template>
      </px-input>
    </div>
    <div class="mb-20">
      <px-input
        v-model="textarea"
        style="width: 240px"
        :rows="3"
        type="textarea"
        placeholder="Please input"
      />
    </div>
    <px-overlay
      mask
      preset1
      matte
      grid
      :overlayClass="['customa', 'customb']"
    ></px-overlay>
    <div class="h-300"></div>
  </div>
</template>
