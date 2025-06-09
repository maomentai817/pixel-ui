import type { Meta, StoryFn } from '@storybook/vue3'
import NotificationDemo from './NotificationDemo.vue'
import '@mmt817/pixel-ui/dist/theme/Button.css'
import '@mmt817/pixel-ui/dist/theme/Notification.css'

const meta: Meta<typeof NotificationDemo> = {
  title: 'Feedback/Notification',
  component: NotificationDemo,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      defaultValue: ''
    },
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
      defaultValue: true
    },
    offset: {
      control: { type: 'number' },
      defaultValue: 10
    },
    transitionName: {
      control: { type: 'text' },
      defaultValue: 'fade'
    },
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      defaultValue: 'top-right'
    }
  }
}

export default meta

export const Default: StoryFn = (args) => ({
  components: { NotificationDemo },
  setup() {
    return { args }
  },
  template: '<NotificationDemo v-bind="args" />'
})
