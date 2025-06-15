import type { Meta, StoryObj } from '@storybook/vue3'

import { PxBadge, type BadgeProps } from '@pixel-ui/components'
import { PxButton, PxIcon } from '@mmt817/pixel-ui'
import '@mmt817/pixel-ui/dist/theme/Badge.css'
import '@mmt817/pixel-ui/dist/theme/Button.css'

const meta: Meta<typeof PxBadge> = {
  title: 'Data/Badge',
  component: PxBadge,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: "''" }
      }
    },
    max: {
      control: { type: 'number' }
    },
    isDot: {
      control: 'boolean'
    },
    hidden: {
      control: 'boolean'
    },
    type: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', 'sakura']
    },
    showZero: {
      control: 'boolean'
    },
    color: {
      control: { type: 'color' }
    },
    offset: {
      control: { type: 'object' },
      table: {
        type: { summary: '[number, number]' }
      }
    }
  },
  args: {
    max: 99,
    isDot: false,
    hidden: false,
    type: 'danger',
    showZero: true
  }
}

export default meta

type Story = StoryObj<typeof meta>

const Template = (args: BadgeProps) => ({
  components: { PxBadge, PxButton },
  setup() {
    return { args }
  },
  template: `
    <div class="px-badge-container">
      <px-badge v-bind="args">
        <px-button>Badge</px-button>
      </px-badge>
    </div>
  `
})

export const Default: Story = {
  args: {
    value: '5'
  },
  render: Template
}

export const Max: Story = {
  args: {
    value: 100,
    max: 9
  },
  render: Template
}

export const Dot: Story = {
  args: {
    isDot: true
  },
  render: Template
}

export const custom: Story = {
  args: {
    value: '5',
    color: '#626aef'
  },
  render: Template
}

export const Offset: Story = {
  args: {
    value: '5',
    offset: [10, 5]
  },
  render: Template
}

export const withSlot: Story = {
  render: (args: BadgeProps) => ({
    components: { PxBadge, PxButton, PxIcon },
    setup() {
      return { args }
    },
    template: `
        <px-badge value = "99" class="item" color = "#626aef" >
          <px-button>SLOT</px-button>
          <template #content = "{ value }" >
            <div class="custom-content">
              <px-icon icon="cog" size="20" color="white" />
              <span>{{ value }}</span>
            </div>
          </template>
        </px-badge>
      `
  })
}

export const Types: Story = {
  args: {
    value: '5'
  },
  render: (args: BadgeProps) => ({
    components: { PxBadge, PxButton },
    setup() {
      return { args }
    },
    template: `
    <div class="px-badge-container" style="display: flex; gap: 10px;">
      <px-badge v-bind="args">
        <px-button>Badge</px-button>
      </px-badge>
      <px-badge v-bind="args" type="primary">
        <px-button>Badge</px-button>
      </px-badge>
      <px-badge v-bind="args" type="success">
        <px-button>Badge</px-button>
      </px-badge>
      <px-badge v-bind="args" type="warning">
        <px-button>Badge</px-button>
      </px-badge>
      <px-badge v-bind="args" type="info">
        <px-button>Badge</px-button>
      </px-badge>
      <px-badge v-bind="args" type="sakura">
        <px-button>Badge</px-button>
      </px-badge>
    </div>
  `
  })
}
