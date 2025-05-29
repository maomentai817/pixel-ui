import type { Meta, StoryFn } from '@storybook/vue3'

import { PxPixelIt } from '@pixel-ui/components'
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

const Starbucks = '../assets/images/Starbucks.png'
const xtaffy = '../assets/images/xtaffy.png'
const monaka = '../assets/images/monaka.jpg'
const human = '../assets/images/e.png'

const Template: StoryFn = (args, { argTypes }) => ({
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

export const Default = Template.bind({})
Default.args = {
  src: human,
  scale: 4
}
export const Size = Template.bind({})
Size.args = {
  src: monaka,
  scale: 5,
  aspectRatio: 0.5
}
export const Gray = Template.bind({})
Gray.args = {
  src: xtaffy,
  scale: 4,
  grayscale: true
}
export const Palette = Template.bind({})
Palette.args = {
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
}
