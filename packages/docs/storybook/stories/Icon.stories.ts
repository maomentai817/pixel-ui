import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3'
import { PxIcon } from '@mmt817/pixel-ui'

// 定义 Story 类型
type Story = StoryObj<typeof PxIcon> & { argTypes?: ArgTypes }

const meta: Meta<typeof PxIcon> = {
  title: 'Atoms/Icon',
  component: PxIcon,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { type: 'text' },
      description: '图标名称'
    },
    size: {
      control: { type: 'number' },
      description: '图标大小(px)'
    },
    color: {
      control: { type: 'color' },
      description: '图标颜色'
    },
    type: {
      control: { type: 'select' },
      options: ['base', 'primary', 'success', 'warning', 'danger'],
      description: '图标类型'
    },
    flip: {
      control: { type: 'select' },
      options: ['', 'horizontal', 'vertical', 'both'],
      description: '图标翻转方向'
    },
    rotation: {
      control: { type: 'number' },
      description: '图标旋转角度'
    },
    spin: {
      control: 'boolean',
      description: '旋转动画'
    },
    bounce: {
      control: 'boolean',
      description: '弹跳动画'
    },
    shake: {
      control: 'boolean',
      description: '抖动动画'
    },
    beat: {
      control: 'boolean',
      description: '心跳动画'
    }
  },
  args: {
    icon: 'face-thinking-solid',
    size: 14,
    type: 'base'
  }
}

// 辅助函数 - 容器样式
const container = (val: string) => `
<div style="margin:5px; display: inline-block">
  ${val}
</div>
`

// 默认示例
export const Default: Story = {
  args: {
    icon: 'face-thinking-solid'
  },

  render: (args) => ({
    components: { PxIcon },
    setup() {
      return { args }
    },
    template: container(`<px-icon v-bind="args"></px-icon>`)
  })
}

// 颜色示例
export const Colors: Story = {
  render: () => ({
    components: { PxIcon },
    template: `
      ${container('<px-icon icon="face-thinking-solid" type="primary"></px-icon>')}
      ${container('<px-icon icon="face-thinking-solid" type="success"></px-icon>')}
      ${container('<px-icon icon="face-thinking-solid" type="warning"></px-icon>')}
      ${container('<px-icon icon="face-thinking-solid" type="danger"></px-icon>')}
    `
  })
}

// 动画示例
export const Animations: Story = {
  render: () => ({
    components: { PxIcon },
    template: `
      ${container('<px-icon icon="face-thinking-solid" spin></px-icon>')}
      ${container('<px-icon icon="face-thinking-solid" bounce></px-icon>')}
      ${container('<px-icon icon="face-thinking-solid" shake></px-icon>')}
      ${container('<px-icon icon="face-thinking-solid" beat></px-icon>')}
    `
  })
}

// 翻转和旋转示例
export const Transformations: Story = {
  render: () => ({
    components: { PxIcon },
    template: `
      ${container('<px-icon icon="face-thinking-solid" flip="horizontal"></px-icon>')}
      ${container('<px-icon icon="face-thinking-solid" flip="vertical"></px-icon>')}
      ${container('<px-icon icon="face-thinking-solid" flip="both"></px-icon>')}
      ${container('<px-icon icon="face-thinking-solid" rotation="180"></px-icon>')}
    `
  })
}

export default meta
