import type { Meta, StoryObj } from '@storybook/vue3'

// import { PxProgress, type ProgressProps } from '@mmt817/pixel-ui'
import { PxProgress, type ProgressProps } from '@pixel-ui/components'
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
      options: ['primary', 'success', 'warning', 'danger', 'sakura']
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

type Story = StoryObj<typeof meta>

const Template = (args: ProgressProps) => ({
  components: { PxProgress },
  setup() {
    return { args }
  },
  template: `
    <PxProgress v-bind="args" style="marginBottom:25px" />
    <PxProgress v-bind="args" status="success" style="marginBottom:25px" />
    <PxProgress v-bind="args" status="warning" style="marginBottom:25px" />
    <PxProgress v-bind="args" status="danger" style="marginBottom:25px" />
    <PxProgress v-bind="args" status="sakura" style="marginBottom:25px" />
  `
})

export const Default: Story = {
  args: {
    percentage: 50
  },
  render: Template
}

export const StrokeWidth: Story = {
  args: {
    percentage: 75,
    strokeWidth: 30
  },
  render: Template
}

export const TextInside: Story = {
  args: {
    percentage: 75,
    strokeWidth: 24,
    textInside: true
  },
  render: Template
}

export const Indeterminate: Story = {
  args: {
    percentage: 75,
    indeterminate: true,
    duration: 4
  },
  render: Template
}

export const Striped: Story = {
  args: {
    percentage: 75,
    strokeWidth: 24,
    striped: true
  },
  render: Template
}

export const StripedFlow: Story = {
  args: {
    percentage: 75,
    strokeWidth: 24,
    striped: true,
    stripedFlow: true
  },
  render: Template
}

export const Checker: Story = {
  args: {
    percentage: 75,
    strokeWidth: 24,
    checker: true
  },
  render: Template
}

export const CustomColor: Story = {
  args: {
    percentage: 75,
    strokeWidth: 24,
    striped: true
  },
  render: (args) => ({
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
}
