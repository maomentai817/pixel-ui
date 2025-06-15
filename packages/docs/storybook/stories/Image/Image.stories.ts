import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'

import { PxImage } from '@pixel-ui/components'
import '@mmt817/pixel-ui/dist/theme/Image.css'
import type { ImageProps } from '@mmt817/pixel-ui'

const meta: Meta<typeof PxImage> = {
  title: 'Fantastic/Image',
  component: PxImage,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: '图片地址'
    },
    width: {
      control: { type: 'number' }
    },
    height: {
      control: { type: 'number' }
    },
    blockSize: {
      control: { type: 'number' },
      description: '像素块大小'
    },
    colorCount: {
      control: { type: 'number' },
      description: '颜色数量'
    },
    showGrid: {
      control: 'boolean',
      description: '是否显示网格'
    },
    scale: {
      control: { type: 'number' },
      description: '缩放比例'
    }
  }
}

export default meta

const Starbucks = '../assets/images/Starbucks.png'
const xtaffy = '../assets/images/xtaffy.png'
const xinlang = '../assets/images/xinlang.jpg'

type Story = StoryObj<typeof meta>

const Template = (args: ImageProps, { argTypes }: ArgTypes) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: { PxImage },
  template: `
    <div class="container" style="width: 100%; display: flex; justify-content: center; align-items: center;">
      <px-image
        v-bind="args"
      />
    </div>
  `
})

export const Default: Story = {
  args: {
    src: Starbucks,
    width: 395,
    height: 400,
    blockSize: 5,
    colorCount: 18
  },
  render: Template
}
export const Customo: Story = {
  args: {
    src: xtaffy,
    blockSize: 5,
    colorCount: 35,
    scale: 0.8
  },
  render: Template
}
export const withGrid: Story = {
  args: {
    src: xinlang,
    blockSize: 4,
    colorCount: 18,
    showGrid: true
  },
  render: Template
}
