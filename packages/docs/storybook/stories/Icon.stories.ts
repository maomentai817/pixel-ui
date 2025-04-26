import type { Meta, StoryFn } from '@storybook/vue3'

// import { PxIcon } from '@mmt817/pixel-ui'
import { PxIcon } from '@pixel-ui/components'
import '@mmt817/pixel-ui/dist/theme/Icon.css'

const meta: Meta<typeof PxIcon> = {
  title: 'Basic/Icon',
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

export default meta

const Template: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxIcon
  },
  template: `<px-icon v-bind="args" />`
})

// 默认示例
export const Default = Template.bind({})
Default.args = {
  icon: 'face-thinking-solid',
  size: 38
}

// 颜色示例
export const Colors: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxIcon
  },
  template: `
    <px-icon v-bind="args" color="#ff4785" icon="face-thinking-solid" size="38" />
    <px-icon v-bind="args" color="rgb(0,212,255)"icon="face-thinking-solid" size="38" />
    <px-icon v-bind="args" color="hsl(265, 100%, 50%)" icon="face-thinking-solid" size="38" />
    <px-icon v-bind="args" color="hwb(38 0% 0%)" icon="face-thinking-solid" size="38" />
  `
})

// 动画示例
export const Animations: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxIcon
  },
  template: `
    <px-icon v-bind="args" spin type="primary" icon="face-thinking-solid" size="38" />
    <px-icon v-bind="args" bounce type="success" icon="face-thinking-solid" size="38" />
    <px-icon v-bind="args" shake type="warning" icon="face-thinking-solid" size="38" />
    <px-icon v-bind="args" beat type="danger" icon="face-thinking-solid" size="38" />
  `
})

// 翻转和旋转示例
export const Transformations: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxIcon
  },
  template: `
    <px-icon v-bind="args" flip="horizontal" type="primary" icon="face-thinking-solid" size="38" />
    <px-icon v-bind="args" flip="vertical" type="success" icon="face-thinking-solid" size="38" />
    <px-icon v-bind="args" flip="both" type="warning" icon="face-thinking-solid" size="38" />
    <px-icon v-bind="args" rotation="270" type="danger" icon="face-thinking-solid" size="38" />
  `
})
