import type { Meta, StoryFn } from '@storybook/vue3'
import { fn } from '@storybook/test'

import { PxPopconfirm } from '@pixel-ui/components'
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
      options: ['primary', 'success', 'warning', 'danger', 'base'],
      description: '确认按钮类型'
    },
    cancelButtonType: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'base'],
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

const Template: StoryFn = (args) => ({
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

export const Default = Template.bind({})
Default.args = {
  title: '你确定要执行此操作吗？'
}

export const HideIcon = Template.bind({})
HideIcon.args = {
  title: '没有图标的提示',
  hideIcon: true
}

export const CustomIcon = Template.bind({})
CustomIcon.args = {
  title: '自定义图标和颜色',
  icon: 'info-circle-solid',
  iconColor: '#626AEF'
}

export const CustomWidth = Template.bind({})
CustomWidth.args = {
  title: '更宽的 Popconfirm 弹层',
  width: 300
}

export const CustomType = Template.bind({})
CustomType.args = {
  title: '成功类型按钮',
  confirmButtonType: 'success',
  cancelButtonType: 'warning'
}

export const CustomText = Template.bind({})
CustomText.args = {
  title: '自定义按钮文字',
  confirmButtonText: '确定',
  cancelButtonText: '取消'
}
