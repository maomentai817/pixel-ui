import type { ArgTypes, StoryObj, Meta } from '@storybook/vue3'
import { fn, within, userEvent, expect } from '@storybook/test'
import { action } from '@storybook/addon-actions'

// import { PxButton, PxButtonGroup } from '@mmt817/pixel-ui'
import { PxButton, PxButtonGroup, type ButtonProps } from '@pixel-ui/components'
import '@mmt817/pixel-ui/dist/theme/Button.css'

// type a =  ComponentProps(typeof PxButton)

const meta: Meta<typeof PxButton> = {
  title: 'Basic/Button',
  component: PxButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      description: '按钮类型',
      options: ['base', 'primary', 'success', 'warning', 'danger', 'sakura']
    },
    size: {
      control: { type: 'select' },
      description: '按钮尺寸',
      options: ['large', 'default', 'small']
    },
    label: {
      description: '按钮内容(可被插槽覆盖)',
      control: { type: 'text' }
    },
    disabled: {
      description: '禁用按钮',
      control: 'boolean'
    },
    icon: {
      description: '图标',
      control: { type: 'text' }
    },
    loading: {
      description: '加载中',
      control: 'boolean'
    },
    loadingIcon: {
      description: '加载图标',
      control: { type: 'text' }
    },
    plain: {
      description: '朴素按钮',
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
    color: {
      description: '自定义颜色',
      control: { type: 'color' }
    },
    useThrottle: {
      description: '节流阀',
      control: 'boolean'
    },
    throttleDuration: {
      description: '节流时间间隔',
      control: 'number'
    },
    autofocus: {
      description: '自动聚焦',
      control: 'boolean'
    },
    tag: {
      description: '元素类型',
      control: { type: 'select' },
      options: ['button', 'a', 'div']
    },
    nativeType: {
      description: '原生type属性',
      control: { type: 'select' },
      options: ['button', 'submit', 'reset']
    }
  },
  args: { onClick: fn() }
}

export default meta

type Story = StoryObj<typeof PxButton> & { argTypes?: ArgTypes }

const methods = {
  onClick: action('onClick')
}

export const Button: Story = {
  args: {
    type: 'base',
    label: 'Button'
  },
  render: (args: ButtonProps) => ({
    setup: () => ({ args }),
    components: { PxButton },
    template: '<px-button v-bind="args" @click="onClick" />',
    methods
  })
}
const AllSizesTemplate = (args: ButtonProps, { argTypes }: ArgTypes) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxButton
  },
  template: `<div>
		<px-button v-bind="args" data-testid="story-test-btn" size="large" @click="onClick" />
		<px-button v-bind="args" data-testid="story-test-btn" size="default" @click="onClick" />
		<px-button v-bind="args" data-testid="story-test-btn" size="small" @click="onClick" />
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

export const Primary: Story = {
  args: {
    type: 'primary',
    label: 'Primary'
  },
  render: AllSizesTemplate
}

export const Success: Story = {
  args: {
    type: 'success',
    label: 'Success'
  },
  render: AllSizesTemplate
}

export const Warning: Story = {
  args: {
    type: 'warning',
    label: 'Warning'
  },
  render: AllSizesTemplate
}

export const Danger: Story = {
  args: {
    type: 'danger',
    label: 'Danger'
  },
  render: AllSizesTemplate
}

export const Sakura: Story = {
  args: {
    type: 'sakura',
    label: 'Sakura'
  },
  render: AllSizesTemplate
}

export const WithIcon: Story = {
  args: {
    label: 'Button',
    icon: 'search'
  },
  render: AllSizesTemplate
}

const AllColorsAndSizesTemplate = (
  args: ButtonProps,
  { argTypes }: ArgTypes
) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxButton
  },
  template: `<div>
		<px-button v-bind="args" size="large" type="primary" @click="onClick" />
		<px-button v-bind="args" size="large" type="success" @click="onClick" />
		<px-button v-bind="args" size="large" type="warning" @click="onClick" />
		<px-button v-bind="args" size="large" type="danger" @click="onClick" />
		<px-button v-bind="args" size="large" type="sakura" @click="onClick" />
		<br/>
		<br/>
		<px-button v-bind="args" size="default" type="primary" @click="onClick" />
		<px-button v-bind="args" size="default" type="success" @click="onClick" />
		<px-button v-bind="args" size="default" type="warning" @click="onClick" />
		<px-button v-bind="args" size="default" type="danger" @click="onClick" />
		<px-button v-bind="args" size="default" type="sakura" @click="onClick" />
		<br/>
		<br/>
		<px-button v-bind="args" size="small" type="primary" @click="onClick" />
		<px-button v-bind="args" size="small" type="success" @click="onClick" />
		<px-button v-bind="args" size="small" type="warning" @click="onClick" />
		<px-button v-bind="args" size="small" type="danger" @click="onClick" />
		<px-button v-bind="args" size="small" type="sakura" @click="onClick" />
	</div>`,
  methods
})

export const Square: Story = {
  args: {
    label: '817',
    square: 'true'
  },
  render: AllColorsAndSizesTemplate
}

// ButtonGroup
export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'base']
    },
    groupSize: {
      control: { type: 'select' },
      options: ['large', 'default', 'small', '']
    },
    groupDisabled: {
      control: 'boolean'
    },
    content1: {
      control: { type: 'text' },
      defaultValue: 'Button1'
    },
    content2: {
      control: { type: 'text' },
      defaultValue: 'Button2'
    }
  },
  args: {
    round: true,
    content1: 'Button1',
    content2: 'Button2'
  },
  render: (args: typeof meta.args) => ({
    components: { PxButtonGroup, PxButton },
    setup() {
      return { args }
    },
    template: `<div>
      <px-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
        <px-button v-bind="args">{{args.content1}}</px-button>
        <px-button v-bind="args">{{args.content2}}</px-button>
      </px-button-group>
    </div>`
  }),
  play: async ({
    canvasElement,
    args,
    step
  }: {
    canvasElement: HTMLElement
    args: any
    step: any
  }) => {
    const canvas = within(canvasElement)
    await step('click btn1', async () => {
      await userEvent.click(canvas.getByText('Button1'))
    })
    await step('click btn2', async () => {
      await userEvent.click(canvas.getByText('Button2'))
    })
    expect(args.onClick).toHaveBeenCalled()
  }
}
