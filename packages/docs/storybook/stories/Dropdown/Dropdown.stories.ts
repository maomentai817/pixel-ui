import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'
import PlacementDemo from './PlacementDemo.vue'

import {
  PxButton,
  PxDropdown,
  PxDropdownItem,
  PxIcon,
  type DropdownProps
} from '@pixel-ui/components'
import { ref } from 'vue'
import '@mmt817/pixel-ui/dist/theme/Dropdown.css'
import '@mmt817/pixel-ui/dist/theme/Icon.css'
import '@mmt817/pixel-ui/dist/theme/Button.css'

const meta: Meta<typeof PxDropdown> = {
  title: 'Navigation/Dropdown',
  component: PxDropdown,
  subcomponents: { PxDropdownItem },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select'
      },
      options: ['primary', 'success', 'warning', 'danger', 'base', 'sakura'],
      description: '按钮类型',
      defaultValue: 'base'
    },
    size: {
      control: {
        type: 'select'
      },
      options: ['large', 'default', 'small'],
      description: '按钮尺寸',
      defaultValue: 'default'
    },
    items: {
      control: { type: 'object' },
      description: '菜单项'
    },
    disabled: {
      control: 'boolean',
      description: '按钮是否禁用',
      defaultValue: false
    },
    trigger: {
      control: {
        type: 'select'
      },
      options: ['hover', 'click', 'contextmenu'],
      description: '触发方式',
      defaultValue: 'hover'
    },
    placement: {
      control: {
        type: 'select'
      },
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end'
      ]
    },
    hideOnClick: {
      control: 'boolean',
      description: '点击菜单项时是否隐藏下拉菜单',
      defaultValue: true
    },
    splitButton: {
      control: 'boolean',
      description: 'panel触发元素是否为按钮',
      defaultValue: false
    },
    popperOptions: {
      control: 'object',
      description: 'popperjs 配置'
    },
    effect: {
      control: {
        type: 'select'
      },
      options: ['dark', 'light', 'customized'],
      description: '主题样式',
      defaultValue: 'light'
    },
    transition: {
      control: {
        type: 'select'
      },
      options: ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right']
    },
    showTimeout: {
      control: 'number',
      description: '显示延时',
      defaultValue: 150
    },
    hideTimeout: {
      control: 'number',
      description: '隐藏延时',
      defaultValue: 150
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const Template = (args: DropdownProps, { argTypes }: ArgTypes) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxDropdown,
    PxDropdownItem,
    PxIcon,
    PxButton
  },
  template: `
    <div class="px-dropdown-container" style="width: 100%; height: 200px; display: flex; justify-content: center;">
      <px-dropdown v-bind="args">
        Dropdown
      </px-dropdown>
    </div>
  `
})

const TemplateBtn = (args: DropdownProps, { argTypes }: ArgTypes) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxDropdown,
    PxDropdownItem,
    PxIcon,
    PxButton
  },
  template: `
    <div class="px-dropdown-container" style="width: 100%; height: 200px; display: flex; justify-content: center;">
      <px-dropdown v-bind="args">
        <px-button>Dropdown</px-button>
      </px-dropdown>
    </div>
  `
})

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Item 1',
        command: 'item1'
      },
      {
        label: 'Item 2',
        command: 'item2'
      },
      {
        label: 'Item 3',
        command: 'item3'
      }
    ]
  },
  render: TemplateBtn
}
export const HideOnClick: Story = {
  args: {
    items: [
      {
        label: 'Item 1',
        command: 'item1'
      },
      {
        label: 'Item 2',
        command: 'item2'
      },
      {
        label: 'Item 3',
        command: 'item3'
      }
    ],
    hideOnClick: false
  },
  render: TemplateBtn
}

export const Trigger: Story = {
  args: {
    items: [
      {
        label: 'Item 1',
        command: 'item1'
      },
      {
        label: 'Item 2',
        command: 'item2'
      },
      {
        label: 'Item 3',
        command: 'item3'
      }
    ],
    trigger: 'click'
  },
  render: TemplateBtn
}
export const SplitButton: Story = {
  args: {
    items: [
      {
        label: 'Item 1',
        command: 'item1'
      },
      {
        label: 'Item 2',
        command: 'item2'
      },
      {
        label: 'Item 3',
        command: 'item3'
      }
    ],
    splitButton: true
  },
  render: Template
}

// export const Disabled = Template.bind({})
export const Disabled: Story = {
  args: {
    items: [
      {
        label: 'Item 1',
        command: 'item1'
      },
      {
        label: 'Item 2',
        command: 'item2'
      },
      {
        label: 'Item 3',
        command: 'item3'
      }
    ],
    disabled: true
  },
  render: Template
}

export const Placement: Story = {
  render: (args, { argTypes }) => ({
    setup: () => ({ args }),
    props: Object.keys(argTypes),
    components: {
      PlacementDemo
    },
    template: `<PlacementDemo v-bind='args' />`
  })
}
export const Manual: Story = {
  args: {
    items: [
      {
        label: '选项一',
        command: '1'
      },
      {
        label: '选项二',
        command: '2'
      },
      {
        label: '选项三',
        command: '3'
      }
    ],
    trigger: 'click'
  },
  render: (args, { argTypes }) => ({
    setup() {
      const dropdownRef = ref()
      return { args, dropdownRef }
    },
    props: Object.keys(argTypes),
    components: {
      PxDropdown,
      PxDropdownItem,
      PxButton
    },
    template: `
    <div>
      <px-button @click="() => dropdownRef?.open()" size="small">open</px-button>
      <px-button @click="() => dropdownRef?.close()" size="small">close</px-button>
      <br />
      <br />
      <px-dropdown ref="dropdownRef" v-bind="args">
        Dropdown
      </px-dropdown>
    </div>
  `
  })
}

export const Size: Story = {
  render: (args, { argTypes }) => ({
    setup: () => ({ args }),
    props: Object.keys(argTypes),
    components: {
      PxDropdown,
      PxDropdownItem,
      PxIcon,
      PxButton
    },
    template: `
    <div class="px-dropdown-container" style="width: 100%; height: 200px; display: flex; justify-content: center;">
      <px-dropdown size="large" split-button type="primary">
        Large
        <template #dropdown>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
            <px-dropdown-item>Action 4</px-dropdown-item>
        </template>
      </px-dropdown>

      <px-dropdown split-button type="success">
        Default
        <template #dropdown>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
            <px-dropdown-item>Action 4</px-dropdown-item>
        </template>
      </px-dropdown>

      <px-dropdown size="small" split-button type="warning">
        Small
        <template #dropdown>
            <px-dropdown-item>Action 1</px-dropdown-item>
            <px-dropdown-item>Action 2</px-dropdown-item>
            <px-dropdown-item>Action 3</px-dropdown-item>
            <px-dropdown-item>Action 4</px-dropdown-item>
        </template>
      </px-dropdown>
    </div>
  `
  })
}
