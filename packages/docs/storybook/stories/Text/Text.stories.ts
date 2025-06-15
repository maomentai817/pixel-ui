import type { Meta, StoryObj } from '@storybook/vue3'

// import { PxText } from '@mmt817/pixel-ui'
import { PxText } from '@pixel-ui/components'
import '@mmt817/pixel-ui/dist/theme/Text.css'

const meta: Meta<typeof PxText> = {
  title: 'Basic/Text',
  component: PxText,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number' },
      description: '字体大小(px)'
    },
    type: {
      control: { type: 'select' },
      description: '字体类型',
      options: ['base', 'primary', 'success', 'warning', 'danger', 'sakura']
    },
    color: {
      control: { type: 'color' },
      description: '字体颜色'
    },
    bold: {
      control: 'boolean',
      description: '是否粗体'
    },
    align: {
      control: { type: 'select' },
      description: '对齐方式',
      options: ['left', 'center', 'right']
    },
    tag: {
      description: '元素类型',
      control: { type: 'select' },
      options: ['span', 'a', 'div']
    },
    compact: {
      control: 'boolean',
      description: '是否紧凑'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args, { argTypes }) => ({
    setup: () => ({ args }),
    props: Object.keys(argTypes),
    components: {
      PxText
    },
    template: '<px-text v-bind="args">嘻嘻喵🐱mmt817喵</px-text>'
  })
}
