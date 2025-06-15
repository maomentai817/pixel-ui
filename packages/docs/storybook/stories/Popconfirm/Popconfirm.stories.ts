import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'

import { PxPopconfirm, type PopconfirmProps } from '@pixel-ui/components'
import { PxButton } from '@mmt817/pixel-ui'

import '@mmt817/pixel-ui/dist/theme/Popconfirm.css'
import '@mmt817/pixel-ui/dist/theme/Button.css'

const meta: Meta<typeof PxPopconfirm> = {
  title: 'Feedback/Popconfirm',
  component: PxPopconfirm,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '确认框标题'
    },
    confirmButtonText: {
      control: 'text',
      description: '确认按钮文字'
    },
    cancelButtonText: {
      control: 'text',
      description: '取消按钮文字'
    },
    confirmButtonType: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'base', 'sakura'],
      description: '确认按钮类型'
    },
    cancelButtonType: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'base', 'sakura'],
      description: '取消按钮类型'
    },
    icon: {
      control: 'text',
      description: '自定义图标'
    },
    iconColor: {
      control: 'color',
      description: '图标颜色'
    },
    hideIcon: {
      control: 'boolean',
      description: '是否隐藏图标'
    },
    hideAfter: {
      control: 'number',
      description: '关闭延时'
    },
    width: {
      control: 'number',
      description: '弹层宽度,最小宽度150px'
    }
  },
  args: {
    title: '气泡确认框',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    confirmButtonType: 'primary',
    cancelButtonType: 'base',
    icon: 'question-solid',
    iconColor: '#f90',
    hideIcon: false,
    hideAfter: 200,
    width: 200,
    onConfirm: fn(),
    onCancel: fn()
  }
}

export default meta

type Story = StoryObj<typeof meta>

const Template = (args: PopconfirmProps) => ({
  components: { PxPopconfirm, PxButton },
  setup() {
    return { args }
  },
  template: `
    <div style="margin: 100px; text-align: center;">
      <px-popconfirm v-bind="args">
        <px-button>气泡确认框</px-button>
      </px-popconfirm>
    </div>
  `
})

export const Default: Story = {
  args: {
    title: '你确定要执行此操作吗? '
  },
  render: Template
}

export const HideIcon: Story = {
  args: {
    title: '没有图标的提示',
    hideIcon: true
  },
  render: Template
}
export const CustomIcon: Story = {
  args: {
    title: '自定义图标和颜色',
    icon: 'info-circle-solid',
    iconColor: '#626AEF'
  },
  render: Template
}

export const CustomWidth: Story = {
  args: {
    title: '更宽的 Popconfirm 弹层',
    width: 300
  },
  render: Template
}

export const CustomType: Story = {
  args: {
    title: '成功类型按钮',
    confirmButtonType: 'success',
    cancelButtonType: 'warning'
  },
  render: Template
}

export const CustomText: Story = {
  args: {
    title: '自定义按钮文字',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  },
  render: Template
}
