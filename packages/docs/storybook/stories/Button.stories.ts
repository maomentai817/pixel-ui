import type { StoryFn } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'

import { PxButton } from 'pixel-ui'

export default {
  title: 'Atoms/Button',
  components: PxButton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["base", "primary", "success", "warning", "danger", ""],
    },
    size: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    label: {
      control: { type: 'text' },
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    useThrottle: {
      control: "boolean",
    },
    throttleDuration: {
      control: "number",
    },
    autofocus: {
      control: "boolean",
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
    },
    icon: {
      control: { type: "text" },
    },
    loadingIcon: {
      control: { type: "text" },
    },
  },
}

const methods = {
  onClick: action("onClick"),
}

const Template: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: { PxButton },
  template: '<px-button v-bind="args" @click="onClick" />',
  methods
})
export const Button = Template.bind({})
Button.args = {
  type: 'base',
  label: 'Button'
}
const AllSizesTemplate: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxButton,
  },
  template: `<div>
		<px-button v-bind="args" data-testid="story-test-btn" size="large" @click="onClick" />
		<px-button v-bind="args" data-testid="story-test-btn" size="default" @click="onClick" />
		<px-button v-bind="args" data-testid="story-test-btn" size="small" @click="onClick" />
    <br />
    <br />
		<px-button v-bind="args" data-testid="story-test-btn" loading @click="onClick" />
		<px-button v-bind="args" data-testid="story-test-btn" loading loadingIcon="circle-notch" @click="onClick" />
		<px-button v-bind="args" data-testid="story-test-btn" disabled @click="onClick" />
    <br />
    <br />
		<px-button v-bind="args" data-testid="story-test-btn" plain @click="onClick" />
		<px-button v-bind="args" data-testid="story-test-btn" round @click="onClick" />
		<px-button v-bind="args" data-testid="story-test-btn" circle @click="onClick" />
	</div>`,
  methods
})

const AllColorsAndSizesTemplate: StoryFn = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxButton,
  },
  template: `<div>
		<px-button v-bind="args" size="large" type="primary" @click="onClick" />
		<px-button v-bind="args" size="large" type="success" @click="onClick" />
		<px-button v-bind="args" size="large" type="warning" @click="onClick" />
		<px-button v-bind="args" size="large" type="danger" @click="onClick" />
		<br/>
		<br/>
		<px-button v-bind="args" size="default" type="primary" @click="onClick" />
		<px-button v-bind="args" size="default" type="success" @click="onClick" />
		<px-button v-bind="args" size="default" type="warning" @click="onClick" />
		<px-button v-bind="args" size="default" type="danger" @click="onClick" />
		<br/>
		<br/>
		<px-button v-bind="args" size="small" type="primary" @click="onClick" />
		<px-button v-bind="args" size="small" type="success" @click="onClick" />
		<px-button v-bind="args" size="small" type="warning" @click="onClick" />
		<px-button v-bind="args" size="small" type="danger" @click="onClick" />
	</div>`,
  methods,
})

export const Primary = AllSizesTemplate.bind({});
Primary.args = {
  type: 'primary',
  label: 'Button',
}

export const Success = AllSizesTemplate.bind({});
Success.args = {
  type: 'success',
  label: 'Button',
}

export const Warning = AllSizesTemplate.bind({});
Warning.args = {
  type: 'warning',
  label: 'Button',
}

export const Danger = AllSizesTemplate.bind({});
Danger.args = {
  type: 'danger',
  label: 'Button',
}

export const WithIcon = AllSizesTemplate.bind({});
WithIcon.args = {
  label: 'Button',
  icon: 'search',
}

export const Square = AllColorsAndSizesTemplate.bind({});
Square.args = {
  label: '817',
  square: true,
}