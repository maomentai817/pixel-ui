import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3'
import { fn } from '@storybook/test'

import { PxButton } from 'pixel-ui'

type Story = StoryObj<typeof PxButton> & {argTypes: ArgTypes}
const meta: Meta<typeof PxButton> = {
  title: "Example/Button",
  component: PxButton,
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
  args: { onClick: fn() },
};
const container = (val: string) => `
<div style="margin:5px">
${val}
</div>
`

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: {type: "text"}
    }
  },
  args: {
    type: "base",
    content: "Button"
  },
  render: (args: typeof meta.args) => ({
    components: { PxButton },
    setup() { 
      return { args }
    },
    template: container(
      `<px-button v-bind="args">{{ args.content }}</px-button>`
    )
  })
}

export default meta