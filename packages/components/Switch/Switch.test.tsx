import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { withInstall } from '@pixel-ui/utils'
import { PxSwitch } from '.'

import Switch from './Switch.vue'

describe('Switch.vue', () => {
  it('should render correctly', () => {
    const wrapper = mount(Switch)
    expect(wrapper.find('.px-switch')).toBeTruthy()
  })

  it('should handle click event and toggle the checked state', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false
      }
    })

    const input = wrapper.find('input').element as HTMLInputElement

    await wrapper.trigger('click')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])
    expect(wrapper.emitted()['change'][0]).toEqual([true])
    expect(input.checked).toBe(true)

    await wrapper.trigger('click')
    expect(wrapper.emitted()['update:modelValue'][1]).toEqual([false])
    expect(wrapper.emitted()['change'][1]).toEqual([false])
    expect(input.checked).toBe(false)
  })

  it('should not toggle when disabled', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        disabled: true
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    expect(wrapper.emitted()).not.toHaveProperty('change')
  })

  it('should handle focus when calling instance method focus', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false
      }
    })

    wrapper.vm.focus()
  })

  it('should render correctly with custom props', () => {
    mount(Switch, {
      props: {
        modelValue: true,
        activeIcon: 'star',
        inactiveIcon: 'heart'
      }
    })
    mount(Switch, {
      props: {
        modelValue: true,
        activeText: 'Enabled',
        inactiveText: 'Disabled'
      }
    })
  })

  it('should be checked when modelValue equals activeValue', () => {
    const wrapper = mount(Switch, {
      props: { modelValue: 'on', activeValue: 'on', inactiveValue: 'off' }
    })
    expect(wrapper.classes()).toContain('is-checked')
  })

  it('should toggle switch on Enter key press', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false }
    })
    await wrapper.find('input').trigger('keydown.enter')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})

describe('Switch/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxSwitch.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxSwitch).toBe(Switch)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Switch component', () => {
    const enhancedSwitch = withInstall(Switch)
    expect(enhancedSwitch).toBe(PxSwitch)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedSwitch = withInstall(Switch)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedSwitch).toHaveProperty('install')
  })
})
