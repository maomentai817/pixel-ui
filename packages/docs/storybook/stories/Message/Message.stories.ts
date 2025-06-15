import type { Meta, StoryObj } from '@storybook/vue3'
import MessageDemo from './MessageDemo.vue'
import '@mmt817/pixel-ui/dist/theme/Button.css'
import '@mmt817/pixel-ui/dist/theme/Message.css'

const meta: Meta<typeof MessageDemo> = {
  title: 'Feedback/Message',
  component: MessageDemo,
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: { type: 'text' },
      defaultValue: ''
    },
    type: {
      control: { type: 'select' },
      options: [
        'primary',
        'success',
        'warning',
        'danger',
        'error',
        'info',
        'sakura',
        'iron'
      ]
    },
    icon: {
      control: { type: 'text' },
      defaultValue: 'info-circle-solid'
    },
    duration: {
      control: { type: 'number' },
      defaultValue: 3000
    },
    showClose: {
      control: 'boolean',
      defaultValue: false
    },
    center: {
      control: 'boolean',
      defaultValue: false
    },
    offset: {
      control: { type: 'number' },
      defaultValue: 10
    },
    transitionName: {
      control: { type: 'text' },
      defaultValue: 'fade-up'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { MessageDemo },
    setup() {
      return { args }
    },
    template: '<MessageDemo v-bind="args" />'
  })
}
