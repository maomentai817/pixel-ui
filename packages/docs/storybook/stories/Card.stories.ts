import type { Meta, StoryFn } from '@storybook/vue3'

import { PxCard } from '@pixel-ui/components'
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
    }
  }
}

export default meta

export const Default: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCard
  },
  template:
    '<px-card v-bind="args" style="width: 80%">This is a card.</px-card>'
})

export const Hoverable: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCard,
    PxText,
    PxIcon
  },
  template: `<px-card v-bind="args" style="width: 140px; text-align: center">
    <template #header>
      <div style="width: 100%; display: flex; justify-content: center; align-items: center; margin-bottom: 10px">
        <px-icon icon="plus-solid" size="20"></px-icon>
      </div>
    </template>
    <px-text>Add</px-text>
  </px-card>`
})

Hoverable.args = {
  hoverable: true
}

export const WithSlots: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCard,
    PxButton,
    PxIcon,
    PxText
  },
  template: `<px-card v-bind="args" style="width: 80%">
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

export const Round: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCard
  },
  template: `<px-card v-bind="args" style="width: 80%">This is a card.</px-card>`
})
Round.args = {
  round: true
}

export const Circle: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCard
  },
  template: `<px-card v-bind="args" style="width: 80%">This is a card.</px-card>`
})
Circle.args = {
  circle: true
}
