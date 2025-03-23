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
      description: "按钮类型",
      options: ["base", "primary", "success", "warning", "danger", ""],
    },
    size: {
      control: { type: "select" },
      description: "按钮尺寸",
      options: ["large", "default", "small", ""],
    },
    label: {
      description: "按钮内容(可被插槽覆盖)",
      control: { type: 'text' },
    },
    disabled: {
      description: "禁用按钮",
      control: "boolean",
    },
    loading: {
      description: "加载中",
      control: "boolean",
    },
    useThrottle: {
      description: "节流阀",
      control: "boolean",
    },
    throttleDuration: {
      description: "节流时间间隔",
      control: "number",
    },
    autofocus: {
      description: "自动聚焦",
      control: "boolean",
    },
    tag: {
      description: "元素类型",
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      description: "原生type属性",
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
    },
    icon: {
      description: "图标",
      control: { type: "text" },
    },
    loadingIcon: {
      description: "加载图标",
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
  label: 'Primary',
}

export const Success = AllSizesTemplate.bind({});
Success.args = {
  type: 'success',
  label: 'Success',
}

export const Warning = AllSizesTemplate.bind({});
Warning.args = {
  type: 'warning',
  label: 'Warning',
}

export const Danger = AllSizesTemplate.bind({});
Danger.args = {
  type: 'danger',
  label: 'Danger',
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