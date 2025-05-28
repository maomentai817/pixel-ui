import type { AlertType } from './types'

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { withInstall } from '@pixel-ui/utils'
import { PxAlert } from '.'

import Alert from './Alert.vue'
import Icon from '../Icon/Icon.vue'

describe('Alert.vue', () => {
  const title = 'Test Alert' as const
  const desc = 'This is a test description' as const
  it('should render the alert with default props', () => {
    const wrapper = mount(Alert, {
      props: {
        title
      },
      slots: {
        default: desc
      },
      global: {
        stubs: ['PxIcon']
      }
    })
    expect(wrapper.text()).toContain(title)
    expect(wrapper.text()).toContain(desc)

    // close icon
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('info-circle-solid')

    const wrapper2 = mount(() => (
      <Alert title={title} description={desc}></Alert>
    ))

    expect(wrapper2.text()).toContain(title)
    expect(wrapper2.text()).toContain(desc)
  })

  it.each([
    ['info', 'info-circle-solid'],
    ['success', 'check-circle-solid'],
    ['warning', 'exclamation-triangle-solid'],
    ['danger', 'times-circle-solid'],
    ['error', 'times-circle-solid'],
    ['non-compliance', 'info-circle-solid'] // 不符合 type 定义的
  ])('should has the correct icon when props type is %s', (type, iconName) => {
    const wrapper = mount(Alert, {
      props: {
        title,
        closable: false,
        showIcon: true,
        type: type as AlertType
      },
      slots: {
        default: desc
      },
      global: {
        stubs: ['PxIcon']
      }
    })

    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe(iconName)
  })

  it('should emit close event when close icon is clicked', () => {
    const onClose = vi.fn()

    const wrapper = mount(Alert, {
      props: {
        title,
        closable: true,
        showIcon: false,
        onClose
      },
      slots: {
        default: desc
      },
      global: {
        stubs: ['PxIcon']
      }
    })
    wrapper.find('.px-alert__close-icon').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('should allow custom content via slots', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'test title'
      },
      slots: {
        default: desc,
        title
      }
    })
    expect(wrapper.text()).toContain(desc)
    expect(wrapper.text()).toContain(title)
    expect(wrapper.text()).not.toContain('test title')
  })

  it('should support centering text', () => {
    const wrapper = mount(Alert, {
      props: {
        title,
        description: desc,
        center: true
      }
    })
    //class
    const rootNode = wrapper.find('.px-alert')
    expect(rootNode.classes()).toContain('text-center')
  })

  it('should not render close icon when closable is false', () => {
    const wrapper = mount(Alert, {
      props: { closable: false }
    })
    expect(wrapper.find('.px-alert__close').exists()).toBe(false)
  })

  it('should toggle visibility when open and close methods are called', async () => {
    const wrapper = mount(Alert, {
      props: { title, closable: false }
    })
    await wrapper.vm.close()
    expect(wrapper.find('.px-alert').attributes().style).toBe('display: none;')
    await wrapper.vm.open()
    expect(wrapper.find('.px-alert').attributes().style).toBe('')
  })

  // icon 覆盖
  it('should apply rotation style when rotation is provided', () => {
    const wrapper = mount(Icon, {
      props: {
        icon: 'test-icon',
        rotation: 90,
        size: 24
      }
    })

    const style = (wrapper.element as HTMLElement).style
    expect(style.transform || style.rotate || '').toContain('90deg')
  })
})

describe('Alert/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxAlert.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxAlert).toBe(Alert)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Alert component', () => {
    const enhancedAlert = withInstall(Alert)
    expect(enhancedAlert).toBe(PxAlert)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedAlert = withInstall(Alert)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedAlert).toHaveProperty('install')
  })
})
