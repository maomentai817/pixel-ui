import type { Meta, StoryFn } from '@storybook/vue3'
import { fn } from '@storybook/test'
import { ref } from 'vue'

import { PxTooltip } from '@pixel-ui/components'
import { PxButton } from '@mmt817/pixel-ui'
import '@mmt817/pixel-ui/dist/theme/Tooltip.css'
import '@mmt817/pixel-ui/dist/theme/Button.css'

const meta: Meta<typeof PxTooltip> = {
  title: 'Feedback/Tooltip',
  component: PxTooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: '提示内容'
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'contextmenu'],
      description: '触发方式'
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: '提示位置'
    },
    manual: {
      control: 'boolean',
      description: '手动控制'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用'
    },
    popperOptions: {
      control: 'object',
      description: 'popperjs 配置'
    },
    transition: {
      control: 'select',
      options: ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right'],
      description: '过渡动画'
    },
    showTimeout: {
      control: 'number',
      description: '显示延时'
    },
    hideTimeout: {
      control: 'number',
      description: '隐藏延时'
    }
  },
  args: {
    content: '提示内容',
    trigger: 'hover',
    placement: 'bottom',
    transition: 'fade',
    'onVisible-change': fn()
  }
}

export default meta

const Template: StoryFn<typeof PxTooltip> = (args) => ({
  components: { PxTooltip, PxButton },
  setup() {
    return { args }
  },
  template: `
    <div style="margin: 100px; text-align: center;">
      <px-tooltip v-bind="args">
        <px-button>悬停或点击我</px-button>
      </px-tooltip>
    </div>
  `
})

export const Default = Template.bind({})
Default.args = {
  trigger: 'hover',
  placement: 'top',
  content: '默认提示内容'
}

export const ClickTrigger = Template.bind({})
ClickTrigger.args = {
  trigger: 'click',
  placement: 'bottom',
  content: '点击触发的提示'
}

export const ContextmenuTrigger = Template.bind({})
ContextmenuTrigger.args = {
  trigger: 'contextmenu',
  placement: 'right',
  content: '右键触发的提示'
}

export const Disabled = Template.bind({})
Disabled.args = {
  trigger: 'hover',
  placement: 'top',
  content: '禁用提示，不会显示',
  disabled: true
}

export const ManualControl: StoryFn<typeof PxTooltip> = (args) => ({
  components: { PxTooltip, PxButton },
  setup() {
    const tooltipRef = ref()
    const open = () => {
      tooltipRef.value?.show()
    }
    const close = () => {
      tooltipRef.value?.hide()
    }
    return { args, tooltipRef, open, close }
  },
  template: `
    <div style="margin: 100px; text-align: center;">
      <px-tooltip v-bind="args" ref="tooltipRef">
        <px-button>手动控制提示</px-button>
      </px-tooltip>
      <div style="margin-top: 20px;">
        <px-button @click="open" style="margin-right: 10px;">显示</px-button>
        <px-button @click="close">隐藏</px-button>
      </div>
    </div>
  `
})
ManualControl.args = {
  manual: true,
  content: '手动控制的提示',
  placement: 'top'
}

export const Effect = Template.bind({})
Effect.args = {
  trigger: 'hover',
  content: 'dark 效果',
  effect: 'dark'
}
