import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'

import { PxCard, type CardProps } from '@pixel-ui/components'
import { PxButton, PxIcon, PxText } from '@mmt817/pixel-ui'
import '@mmt817/pixel-ui/dist/theme/Card.css'

const meta: Meta<typeof PxCard> = {
  title: 'Data/Card',
  component: PxCard,
  tags: ['autodocs'],
  argTypes: {
    hoverable: {
      description: '悬浮状态',
      control: 'boolean'
    },
    round: {
      description: '圆角',
      control: 'boolean'
    },
    circle: {
      description: '圆形',
      control: 'boolean'
    },
    stamp: {
      description: '戳记风格',
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const Template = (args: CardProps, { argTypes }: ArgTypes) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCard
  },
  template:
    '<px-card v-bind="args" style="width: 80%">This is a card.</px-card>'
})

export const Default: Story = {
  render: Template
}
export const Round: Story = {
  args: {
    round: true
  },
  render: Template
}
export const Circle: Story = {
  args: {
    circle: true
  },
  render: Template
}

export const Hoverable: Story = {
  args: {
    hoverable: true
  },
  render: (args: CardProps, { argTypes }: ArgTypes) => ({
    setup: () => ({ args }),
    props: Object.keys(argTypes),
    components: {
      PxCard,
      PxText,
      PxIcon
    },
    template: `
      <px-card v-bind="args" style="width: 140px; text-align: center">
        <template #header>
          <div style="width: 100%; display: flex; justify-content: center; align-items: center; margin-bottom: 10px">
            <px-icon icon="plus-solid" size="20"></px-icon>
          </div>
        </template>
        <px-text>Add</px-text>
      </px-card>`
  })
}

export const WithSlots: Story = {
  render: (args, { argTypes }) => ({
    setup: () => ({ args }),
    props: Object.keys(argTypes),
    components: {
      PxCard,
      PxButton,
      PxIcon,
      PxText
    },
    template: `
    <px-card v-bind="args" style="width: 80%">
		  <template #prepend>
			  <px-icon icon="check-solid" size="20" color="#ff6f5c" />
		  </template>
		  <template #header>
			  <strong>Card header</strong>
		  </template>
		  <px-text color="#4d6bfe" size="14">
			  This is the card body.
		  </px-text>
		  <template #footer>
			  <px-text size="16">
				  Card footer
			  </px-text>
		  </template>
		  <template #append>
			  <px-button type="success">Click me</px-button>
		  </template>
	  </px-card>`
  })
}

export const Stamp: Story = {
  args: {
    stamp: true
  },
  render: (args, { argTypes }) => ({
    setup: () => ({ args }),
    props: Object.keys(argTypes),
    components: {
      PxCard
    },
    template: `<div style="display:flex;justify-content:center;align-items:center;background-color:#ebe6e0;padding:20px">
    <px-card v-bind="args" style="width: 80%">This is a card.</px-card>
  </div>`
  })
}
