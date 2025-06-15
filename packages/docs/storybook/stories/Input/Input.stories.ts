import type { Meta, StoryObj } from '@storybook/vue3'

import InputDemo from './InputDemo.vue'
import { PxIcon, PxInput, type InputProps } from '@pixel-ui/components'
import '@mmt817/pixel-ui/dist/theme/Input.css'
import '@mmt817/pixel-ui/dist/theme/Icon.css'

const meta: Meta<typeof PxInput> = {
  title: 'Form/Input',
  component: PxInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: '输入框绑定值'
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'textarea'],
      description: '输入框类型'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
      description: '输入框尺寸'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用'
    },
    clearable: {
      control: { type: 'boolean' },
      description: '是否显示清除按钮'
    },
    showPassword: {
      control: { type: 'boolean' },
      description: '是否显示切换密码图标'
    },
    placeholder: {
      control: { type: 'text' },
      description: '输入框占位符'
    },
    readonly: {
      control: { type: 'boolean' },
      description: '原生`readonly`属性, 是否只读'
    },
    autocomplete: {
      control: { type: 'text' },
      description: '原生`autocomplete`属性'
    },
    autofocus: {
      control: { type: 'boolean' },
      description: '原生`autofocus`属性, 是否自动获取焦点'
    }
  },
  args: {
    modelValue: '',
    type: 'text',
    size: 'default',
    disabled: false,
    clearable: false,
    showPassword: false,
    placeholder: '请输入内容',
    readonly: false,
    autocomplete: 'off',
    autofocus: false
  }
}

export default meta

type Story = StoryObj<typeof meta>

const Template = (args: InputProps) => ({
  components: { PxInput },
  setup() {
    return { args }
  },
  template: `
    <px-input v-bind="args" style="width: 340px" />
  `
})

export const Default: Story = {
  args: {},
  render: Template
}

export const Disabled: Story = {
  args: {
    disabled: true
  },
  render: Template
}

export const Clearable: Story = {
  args: {
    modelValue: '待清空内容',
    clearable: true
  },
  render: Template
}

export const Password: Story = {
  args: {
    modelValue: '123456',
    type: 'password',
    showPassword: true
  },
  render: Template
}

export const Textarea: Story = {
  args: {
    type: 'textarea'
  },
  render: Template
}

export const WithIcon: Story = {
  args: {},
  render: (args: InputProps) => ({
    components: { PxInput, PxIcon },
    setup() {
      return { args }
    },
    template: `
    <px-input v-bind="args" style="width: 340px; margin-right: 10px;" placeholder="Pick a date">
      <template #suffix>
        <px-icon icon="calender-solid" />
      </template>
    </px-input>
    <px-input
      v-bind="args"
      style="width: 340px"
      placeholder="Type something"
    >
      <template #prefix>
        <px-icon icon="search" />
      </template>
    </px-input>
  `
  })
}

export const WithSlots: Story = {
  render: () => ({
    components: { InputDemo },
    template: `<InputDemo />`
  })
}

export const Size: Story = {
  render: (args: InputProps) => ({
    components: { PxInput },
    setup() {
      return { args }
    },
    template: `
    <div style="margin-bottom: 8px;">
      <px-input v-bind="args" size="large" style="width: 340px" />
    </div>
    <div style="margin-bottom: 8px;">
      <px-input v-bind="args" style="width: 340px" />
    </div>
    <div>
      <px-input v-bind="args" size="small" style="width: 340px" />
    </div>
  `
  })
}
