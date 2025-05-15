import type { Meta, StoryFn } from '@storybook/vue3'

// import { PxAnimationFrame } from '@mmt817/pixel-ui'
import { PxAnimationFrame } from '@pixel-ui/components'
import '@mmt817/pixel-ui/dist/theme/AnimationFrame.css'

const meta: Meta<typeof PxAnimationFrame> = {
  title: 'Fantastic/AnimationFrame',
  component: PxAnimationFrame,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'GIF 图片地址'
    },
    width: {
      control: { type: 'number' },
      defaultValue: 320
    },
    height: {
      control: { type: 'number' },
      defaultValue: 320
    },
    stages: {
      control: 'object',
      description: '动画阶段配置'
    },
    loop: {
      control: 'boolean',
      description: '是否全局循环'
    }
  }
}

export default meta

const Naloong = '../assets/images/pet.gif'
const twoking = '../assets/images/twoking.gif'
const taffy = '../assets/images/taffy.gif'

const Template: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: { PxAnimationFrame },
  template: `
    <div class="container" style="width: 100%; height: 400px; display: flex; justify-content: center; align-items: center;">
      <px-animation-frame
        v-bind="args"
        @click="onClick"
      />
    </div>
  `,
  methods: {
    onClick() {
      console.log('click')
    }
  }
})

export const Default = Template.bind({})
Default.args = {
  src: twoking,
  stages: [{ type: 'loop', start: 0, end: 6 }]
}

export const Loop = Template.bind({})
Loop.args = {
  src: taffy,
  loop: true,
  width: 320,
  height: 320
}

export const Henshin = Template.bind({})
Henshin.args = {
  src: Naloong,
  width: 320,
  height: 320,
  stages: [
    { type: 'loop', start: 0, end: 11 },
    { type: 'once', start: 12, end: 41 },
    { type: 'loop', start: 31, end: 41 },
    { type: 'once', start: 42, end: 52 }
  ]
}
