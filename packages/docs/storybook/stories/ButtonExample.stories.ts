import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3'
import { fn, within, userEvent, expect, clearAllMocks } from '@storybook/test'
import { set } from 'lodash-es'

import { PxButton } from 'pixel-ui'
// es 打包后单独引入样式
import 'pixel-ui/dist/index.css'

type Story = StoryObj<typeof PxButton> & {argTypes?: ArgTypes}
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
      `<px-button data-testid="story-test-btn" v-bind="args">{{ args.content }}</px-button>`
    )
  }),
  // 测试
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByTestId("story-test-btn");

    await step(
      "When useThrottle is set to true, the onClick should be called once",
      async () => {
        set(args, "useThrottle", true);
        await userEvent.tripleClick(btn);

        expect(args.onClick).toHaveBeenCalledOnce();
        clearAllMocks();
      }
    );

    await step(
      "When useThrottle is set to false, the onClick should be called three times",
      async () => {
        set(args, "useThrottle", false);
        await userEvent.tripleClick(btn);

        expect(args.onClick).toHaveBeenCalledTimes(3);
        clearAllMocks();
      }
    );

    await step(
      "When disabled is set to true, the onClick should not be called",
      async () => {
        set(args, "disabled", true);
        await userEvent.click(btn);

        expect(args.onClick).toHaveBeenCalledTimes(0);
        set(args, "disabled", false);
        clearAllMocks();
      }
    );

    await step(
      "When loading is set to true, the onClick should not be called",
      async () => {
        set(args, "loading", true);
        await userEvent.click(btn);

        expect(args.onClick).toHaveBeenCalledTimes(0);
        set(args, "loading", false);
        clearAllMocks();
      }
    );
  },
}

// circle btn story
export const Circle: Story = {
  args: {
    icon: 'search'
  },
  render: (args: typeof meta.args) => ({
    components: { PxButton },
    setup() { 
      return { args }
    },
    template: container(`
      <px-button circle v-bind="args" />
    `)
  }),
  play: async ({ canvasElement, args, step }) => { 
    const canvas = within(canvasElement)
    await step('click button', async () => { 
      await userEvent.click(canvas.getByRole('button'))
    })

    expect(args.onClick).toHaveBeenCalled()
  }
}

export default meta