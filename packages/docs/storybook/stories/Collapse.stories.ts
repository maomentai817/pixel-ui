import type { Meta, StoryFn } from '@storybook/vue3'

import { PxCollapse, PxCollapseItem } from '@pixel-ui/components'
import { PxIcon } from '@mmt817/pixel-ui'
import '@mmt817/pixel-ui/dist/theme/Collapse.css'

const meta: Meta<typeof PxCollapse> = {
  title: 'Data/Collapse',
  component: PxCollapse,
  subcomponents: { PxCollapseItem },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: {
        type: 'object'
      },
      description: '当前激活面板的name[]'
    },
    accordion: {
      control: 'boolean',
      description: '开启手风琴效果'
    }
  },
  args: {
    modelValue: [],
    accordion: false
  }
}

export default meta

const Template: StoryFn<typeof PxCollapse> = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCollapse,
    PxCollapseItem,
    PxIcon
  },
  template: `
    <px-collapse style="width: 30%" v-bind="args">
      <px-collapse-item title="Title a" name="a">
        <div>折叠面板内容1🐱</div>
      </px-collapse-item>
      <px-collapse-item title="Title b" name="b">
        <div>折叠面板内容2🐱</div>
      </px-collapse-item>
      <px-collapse-item title="Title c disabled" name="c" disabled>
        <div>折叠面板内容3🐱</div>
      </px-collapse-item>
      <px-collapse-item title="Title d" name="d">
        <div>折叠面板内容4🐱</div>
      </px-collapse-item>
    </px-collapse>`
})

export const Default = Template.bind({})
Default.args = {
  modelValue: ['a'],
  accordion: false
}

export const Accordion = Template.bind({})
Accordion.args = {
  modelValue: [],
  accordion: true
}

export const CustomIcon: StoryFn<typeof PxCollapse> = (args, { argTypes }) => ({
  setup: () => ({ args }),
  props: Object.keys(argTypes),
  components: {
    PxCollapse,
    PxCollapseItem,
    PxIcon
  },
  template: `
    <px-collapse style="width: 30%" v-bind="args">
      <px-collapse-item title="Title a" name="a" icon="cog">
        <div>折叠面板内容1🐱</div>
      </px-collapse-item>
      <px-collapse-item title="Title b" name="b" icon="plane">
        <div>折叠面板内容2🐱</div>
      </px-collapse-item>
      <px-collapse-item title="Title c disabled" name="c" disabled icon="times-solid">
        <div>折叠面板内容3🐱</div>
      </px-collapse-item>
      <px-collapse-item title="Title d" name="d" icon="star-crescent-solid">
        <div>折叠面板内容4🐱</div>
      </px-collapse-item>
    </px-collapse>`
})
