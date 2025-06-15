import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'

import { PxPixelIt, type PixelItProps } from '@pixel-ui/components'
import '@mmt817/pixel-ui/dist/theme/PixelIt.css'

const meta: Meta<typeof PxPixelIt> = {
  title: 'Fantastic/PixelIt',
  component: PxPixelIt,
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
    scale: {
      control: { type: 'number' },
      description: '像素块大小'
    },
    palette: {
      control: { type: 'object' },
      description: '调色板'
    },
    grayscale: {
      control: 'boolean',
      description: '是否灰度化'
    },
    aspectRatio: {
      control: { type: 'number' },
      description: '缩放比例'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const Starbucks = '../assets/images/Starbucks.png'
const xtaffy = '../assets/images/xtaffy.png'
const monaka = '../assets/images/monaka.jpg'
const human = '../assets/images/e.png'

const Template = (args: PixelItProps, { argTypes }: ArgTypes) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: { PxPixelIt },
  template: `
    <div class="container" style="width: 100%; display: flex; justify-content: center; align-items: center;">
      <px-pixel-it
        v-bind="args"
      />
    </div>
  `
})

export const Default: Story = {
  args: {
    src: human,
    scale: 4
  },
  render: Template
}
export const Size: Story = {
  args: {
    src: monaka,
    scale: 5,
    aspectRatio: 0.5
  },
  render: Template
}
export const Gray: Story = {
  args: {
    src: xtaffy,
    scale: 4,
    grayscale: true
  },
  render: Template
}
export const Palette: Story = {
  args: {
    src: Starbucks,
    scale: 4,
    aspectRatio: 0.5,
    palette: [
      [0, 0, 0],
      [29, 43, 83],
      [126, 37, 83],
      [0, 135, 81],
      [171, 82, 54],
      [95, 87, 79],
      [194, 195, 199],
      [255, 241, 232]
    ]
  },
  render: Template
}
