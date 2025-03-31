import type { Meta, StoryFn } from '@storybook/vue3'

import { PxCard, PxButton, PxIcon } from '@mmt817/pixel-ui'

const meta: Meta<typeof PxCard> = {
  title: 'Atoms/Card',
  component: PxCard,
  tags: ["autodocs"],
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
  },
}

export default meta

export const Default: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCard,
  },
  template: '<px-card v-bind="args" style="width: 80%">This is a card.</px-card>',
})

export const Hoverable: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCard,
  },
  template: `<px-card v-bind="args" style="width: 80%">This is a card.</px-card>`,
})

Hoverable.args = {
  hoverable: true,
}

export const WithSlots: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCard,
    PxButton,
    PxIcon,
  },
  template: `<px-card v-bind="args" style="width: 80%">
		<template #prepend>
			<px-icon icon="check" size="large" />
		</template>
		<template #header>
			<strong>Card header</strong>
		</template>
			This is the card body.
		<template #footer>
				Card footer
		</template>
		<template #append>
			<px-button>Click me</px-button>
		</template>
	</px-card>`,
})

export const Round: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCard,
  },
  template: `<px-card v-bind="args" style="width: 80%">This is a card.</px-card>`,
})
Round.args = {
  round: true,
}

export const Circle: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCard,
  },
  template: `<px-card v-bind="args" style="width: 80%">This is a card.</px-card>`,
})
Circle.args = {
  circle: true,
}


