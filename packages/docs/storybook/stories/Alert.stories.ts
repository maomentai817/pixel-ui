import type { Meta, StoryFn } from '@storybook/vue3'

// import { PxAlert } from '@mmt817/pixel-ui'
import { PxAlert, type AlertProps } from '@pixel-ui/components'
import '@mmt817/pixel-ui/dist/theme/Alert.css'

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
    }
  }
}

export default meta

const Template: StoryFn<typeof PxAlert> = (args: AlertProps) => ({
  components: { PxAlert },
  setup() {
    return { args }
  },
  template: `
    <px-alert v-bind="args">
      这是一个提示框组件！
    </px-alert>
  `
})

export const Default = Template.bind({})
Default.args = {
  title: '默认提示',
  type: 'info',
  description: '',
  effect: 'light',
  closable: true,
  showIcon: true,
  center: false
}

export const WithDescription: StoryFn<typeof PxAlert> = (args: AlertProps) => ({
  components: { PxAlert },
  setup() {
    return { args }
  },
  template: `
    <px-alert v-bind="args">
      这是一个带描述的提示框内容，适用于更复杂的提示信息。
    </px-alert>
  `
})
WithDescription.args = {
  title: '提示标题',
  type: 'success',
  closable: true,
  showIcon: true,
  effect: 'light'
}

export const DarkEffect = Template.bind({})
DarkEffect.args = {
  title: '暗色提示框',
  type: 'danger',
  effect: 'dark',
  description: 'CSS Houdini 特效也支持深色模式。',
  closable: true,
  showIcon: true
}

export const Centered = Template.bind({})
Centered.args = {
  title: '居中提示',
  description: '内容与标题均居中显示。',
  center: true,
  showIcon: false,
  closable: true,
  type: 'warning'
}

export const NonClosable = Template.bind({})
NonClosable.args = {
  title: '不可关闭',
  description: '该提示框无法通过点击关闭图标来关闭。',
  closable: false,
  type: 'info',
  showIcon: true
}

export const Types: StoryFn<typeof PxAlert> = (args: AlertProps) => ({
  components: { PxAlert },
  setup() {
    return { args }
  },
  template: `
    <px-alert title="Success alert" type="success" />
    <px-alert title="Info alert" type="info" />
    <px-alert title="Warning alert" type="warning" />
    <px-alert title="Error alert" type="danger" />
    <px-alert title="Sakura alert" type="sakura" />
    <px-alert title="Iron alert" iron />
  `
})
