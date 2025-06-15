import type { Meta, StoryObj } from '@storybook/vue3'

// import { type AlertProps } from '@mmt817/pixel-ui'
import { PxAlert, type AlertProps } from '@pixel-ui/components'
import '@mmt817/pixel-ui/dist/theme/Alert.css'
// import { render } from 'vue'
// import { render } from 'vue'

const meta: Meta<typeof PxAlert> = {
  title: 'Feedback/Alert',
  component: PxAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger', 'sakura']
    },
    effect: {
      control: { type: 'radio' },
      options: ['light', 'dark']
    },
    closable: {
      control: { type: 'boolean' }
    },
    center: {
      control: { type: 'boolean' }
    },
    showIcon: {
      control: { type: 'boolean' }
    },
    iron: {
      control: { type: 'boolean' }
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const Template = (args: AlertProps) => {
  return {
    components: { PxAlert },
    setup() {
      return { args }
    },
    template: `
    <px-alert v-bind="args">
      <template v-if="args.slots?.default">
        <component :is="args.slots.default">
      </template>
      <template v-else>
        {{args.description}}
      </template>
    </px-alert>
  `
  }
}

export const Default: Story = {
  args: {
    title: '默认提示',
    type: 'info',
    description: '这是description中的内容, 用以比较和slots的优先级',
    effect: 'light',
    closable: true,
    showIcon: true,
    center: false,
    slots: {
      default: {
        template: `这是slots中的内容, 用以比较和description的优先级`
      }
    }
  },
  render: Template
}

export const WithDescription: Story = {
  args: {
    title: '提示标题',
    type: 'success',
    closable: true,
    showIcon: true,
    effect: 'light',
    description: '这是一个带描述的提示框内容，适用于更复杂的提示信息'
  },
  paramters: {},
  render: Template
}

export const DarkEffect: Story = {
  args: {
    title: '暗色提示框',
    type: 'danger',
    effect: 'dark',
    description: 'CSS Houdini 特效也支持深色模式。',
    closable: true,
    showIcon: true
  },
  render: Template
}

export const Centered: Story = {
  args: {
    title: '居中提示',
    description: '内容与标题均居中显示。',
    center: true,
    showIcon: false,
    closable: true,
    type: 'warning'
  },
  render: Template
}

export const NonCloseable: Story = {
  args: {
    title: '不可关闭',
    description: '该提示框无法通过点击关闭图标来关闭。',
    closable: false,
    type: 'info',
    showIcon: true
  },
  render: Template
}

export const Types: Story = {
  args: {},
  render: (args: AlertProps) => ({
    components: { PxAlert },
    setup() {
      return { args }
    },
    template: `
    <px-alert v-bind="args" title="Success alert" type="success" />
    <px-alert v-bind="args" title="Info alert" type="info" />
    <px-alert v-bind="args" title="Warning alert" type="warning" />
    <px-alert v-bind="args" title="Error alert" type="danger" />
    <px-alert v-bind="args" title="Sakura alert" type="sakura" />
    <px-alert v-bind="args" title="Iron alert" iron />
  `
  })
}
