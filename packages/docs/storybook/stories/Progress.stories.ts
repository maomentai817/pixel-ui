import type { Meta, StoryFn } from '@storybook/vue3'

import { PxProgress } from '@mmt817/pixel-ui'
import '@mmt817/pixel-ui/dist/theme/Progress.css'

const meta: Meta<typeof PxProgress> = {
  title: 'Data/Progress',
  component: PxProgress,
  tags: ['autodocs'],
  argTypes: {
    percentage: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1
      }
    },
    strokeWidth: {
      control: { type: 'number' }
    },
    textInside: {
      control: { type: 'boolean' }
    },
    status: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger']
    },
    indeterminate: {
      control: { type: 'boolean' }
    },
    duration: {
      control: { type: 'number' }
    },
    color: {
      control: { type: 'color' }
    },
    showText: {
      control: { type: 'boolean' }
    },
    format: {
      table: {
        disable: true
      }
    },
    striped: {
      control: { type: 'boolean' }
    },
    stripedFlow: {
      control: { type: 'boolean' }
    },
    checker: {
      control: { type: 'boolean' }
    }
  },
  args: {
    percentage: 50
  }
}

export default meta

const Template: StoryFn<typeof PxProgress> = (args) => ({
  components: { PxProgress },
  setup() {
    return { args }
  },
  template: `
    <PxProgress v-bind="args" style="marginBottom:25px" />
    <PxProgress v-bind="args" status="success" style="marginBottom:25px" />
    <PxProgress v-bind="args" status="warning" style="marginBottom:25px" />
    <PxProgress v-bind="args" status="danger" style="marginBottom:25px" />
  `
})

export const Default = Template.bind({})
Default.args = {
  percentage: 50
}

export const StrokeWidth = Template.bind({})
StrokeWidth.args = {
  percentage: 75,
  strokeWidth: 30
}

export const TextInside = Template.bind({})
TextInside.args = {
  percentage: 75,
  strokeWidth: 24,
  textInside: true
}

export const Indeterminate = Template.bind({})
Indeterminate.args = {
  percentage: 75,
  indeterminate: true,
  duration: 4
}

export const CustomColor: StoryFn<typeof PxProgress> = (args) => ({
  components: { PxProgress },
  setup() {
    return { args }
  },
  template: `
    <PxProgress v-bind="args" color="#626aef" style="marginBottom:25px" />
    <PxProgress v-bind="args" color="#ff4785" style="marginBottom:25px" />
    <PxProgress v-bind="args" color="#08979c" style="marginBottom:25px" />
    <PxProgress v-bind="args" color="#ad4e00" style="marginBottom:25px" />
  `
})
CustomColor.args = {
  percentage: 75,
  strokeWidth: 24,
  striped: true
}

export const Striped = Template.bind({})
Striped.args = {
  percentage: 75,
  strokeWidth: 24,
  striped: true
}

export const StripedFlow = Template.bind({})
StripedFlow.args = {
  percentage: 75,
  strokeWidth: 24,
  striped: true,
  stripedFlow: true
}

export const Checker = Template.bind({})
Checker.args = {
  percentage: 75,
  strokeWidth: 24,
  checker: true
}
