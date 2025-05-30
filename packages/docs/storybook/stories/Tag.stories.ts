import type { Meta, StoryFn } from '@storybook/vue3'

import { PxTag, PxIcon } from '@pixel-ui/components'
import '@mmt817/pixel-ui/dist/theme/Tag.css'
import '@mmt817/pixel-ui/dist/theme/Icon.css'

const meta: Meta<typeof PxTag> = {
  title: 'Data/Tag',
  component: PxTag,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['large', 'default', 'small']
    },
    type: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', 'sakura']
    },
    closable: { control: 'boolean' },
    color: { control: { type: 'color' } },
    effect: {
      control: { type: 'select' },
      options: ['light', 'dark', 'plain']
    },
    disabled: { control: 'boolean' },
    round: { control: 'boolean' },
    circle: { control: 'boolean' },
    chubby: { control: 'boolean' }
  }
}

export default meta

const Template: StoryFn = (args) => ({
  components: { PxTag },
  setup() {
    return { args }
  },
  template: `
    <div class="px-badge-container">
      <px-tag v-bind="args">Tag</px-tag>
    </div>
  `
})
export const Default = Template.bind({})

export const Types: StoryFn = (args) => ({
  components: { PxTag, PxIcon },
  setup() {
    return { args }
  },
  template: `
    <div class="px-badge-container">
      <px-tag v-bind="args" type="primary">Primary</px-tag>
      <px-tag v-bind="args" type="success">Success</px-tag>
      <px-tag v-bind="args" type="warning">Warning</px-tag>
      <px-tag v-bind="args" type="danger">Danger</px-tag>
      <px-tag v-bind="args" type="info">Info</px-tag>
      <px-tag v-bind="args" type="sakura">Sakura</px-tag>
      <px-tag v-bind="args">
        <px-icon icon="badge-check-solid" color="#ff6f5c" />
      </px-tag>
    </div>
  `
})
export const Closable: StoryFn = (args) => ({
  components: { PxTag },
  setup() {
    return { args }
  },
  template: `
    <div class="px-badge-container">
      <px-tag v-bind="args" type="primary" closable @close="handleClose">Primary</px-tag>
      <px-tag v-bind="args" type="success" closable @close="handleClose">Success</px-tag>
      <px-tag v-bind="args" type="warning" closable @close="handleClose">Warning</px-tag>
      <px-tag v-bind="args" type="danger" closable @close="handleClose">Danger</px-tag>
      <px-tag v-bind="args" type="sakura" closable @close="handleClose">Sakura</px-tag>
    </div>
  `
})
export const Sizes: StoryFn = (args) => ({
  components: { PxTag },
  setup() {
    return { args }
  },
  template: `
    <div class="px-badge-container">
      <px-tag v-bind="args" size="large">Large</px-tag>
      <px-tag v-bind="args" size="default">Default</px-tag>
      <px-tag v-bind="args" size="small">Small</px-tag>
    </div>
    `
})
export const Effect: StoryFn = (args) => ({
  components: { PxTag },
  setup() {
    return { args }
  },
  template: `
    <div class="px-badge-container">
      <px-tag v-bind="args" effect="light">Light</px-tag>
      <px-tag v-bind="args" effect="dark">Dark</px-tag>
      <px-tag v-bind="args" effect="plain">Plain</px-tag>
    </div>
    `
})
export const Disabled: StoryFn = (args) => ({
  components: { PxTag },
  setup() {
    return { args }
  },
  template: `
    <div class="px-badge-container">
      <px-tag v-bind="args" disabled>Disabled</px-tag>
      <px-tag v-bind="args" disabled effect="dark">Disabled</px-tag>
      <px-tag v-bind="args" disabled closable>Disabled</px-tag>
    </div>
    `
})
export const Round: StoryFn = (args) => ({
  components: { PxTag },
  setup() {
    return { args }
  },
  template: `
    <div class="px-badge-container">
      <px-tag v-bind="args" round>Round</px-tag>
      <px-tag v-bind="args" round effect="dark">Round</px-tag>
      <px-tag v-bind="args" round closable>Round</px-tag>
    </div>
    `
})
export const Circle: StoryFn = (args) => ({
  components: { PxTag },
  setup() {
    return { args }
  },
  template: `
    <div class="px-badge-container">
      <px-tag v-bind="args" circle>Circle</px-tag>
      <px-tag v-bind="args" circle effect="dark">Circle</px-tag>
      <px-tag v-bind="args" circle closable>Circle</px-tag>
    </div>
    `
})
export const Chubby: StoryFn = (args) => ({
  components: { PxTag },
  setup() {
    return { args }
  },
  template: `
    <div class="px-badge-container">
      <px-tag v-bind="args" chubby>Chubby</px-tag>
      <px-tag v-bind="args" chubby effect="dark">Chubby</px-tag>
      <px-tag v-bind="args" chubby closable>Chubby</px-tag>
    </div>
    `
})
