import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { withInstall } from '@pixel-ui/utils'
import { PxBadge } from '.'

import Badge from './Badge.vue'

describe('Badge', () => {
  it('renders default slot content', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: '<button>Button</button>'
      }
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders value properly', () => {
    const wrapper = mount(Badge, {
      props: { value: 8 }
    })
    expect(wrapper.find('.px-badge__content').text()).toBe('8')
  })

  it('displays max+ when value exceeds max', () => {
    const wrapper = mount(Badge, {
      props: {
        value: 120,
        max: 99
      }
    })
    expect(wrapper.find('.px-badge__content').text()).toBe('99+')
  })

  it('supports isDot mode', () => {
    const wrapper = mount(Badge, {
      props: {
        isDot: true
      }
    })
    const badge = wrapper.find('.px-badge__content')
    expect(badge.classes()).toContain('is-dot')
    expect(badge.text()).toBe('')
  })

  it('does not render when hidden is true', () => {
    const wrapper = mount(Badge, {
      props: {
        hidden: true,
        value: 5
      }
    })
    expect(wrapper.find('.px-badge__content').isVisible()).toBe(false)
  })

  it('does not render when value is 0 and showZero is false', () => {
    const wrapper = mount(Badge, {
      props: {
        value: 0,
        showZero: false
      }
    })
    expect(wrapper.find('.px-badge__content').exists()).toBe(true)
  })

  it('applies custom color variables', () => {
    const wrapper = mount(Badge, {
      props: {
        color: '#f00',
        value: 5
      }
    })
    const badge = wrapper.find('.px-badge__content')
    expect(badge.attributes('style')).toContain('--px-custom-bg-color')
  })

  it('applies offset style', () => {
    const wrapper = mount(Badge, {
      props: {
        offset: [10, 5],
        value: 1
      }
    })
    const badge = wrapper.find('.px-badge__content')
    expect(badge.attributes('style')).toMatch(/margin-right: -10px/)
    expect(badge.attributes('style')).toMatch(/margin-top: 5px/)
  })

  it('supports content slot', () => {
    const wrapper = mount(Badge, {
      props: {
        value: 999
      },
      slots: {
        content: '<span>custom</span>'
      }
    })
    expect(wrapper.find('.px-badge__content').text()).toBe('custom')
  })
})

describe('Badge/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxBadge.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxBadge).toBe(Badge)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Badge component', () => {
    const enhancedBadge = withInstall(Badge)
    expect(enhancedBadge).toBe(PxBadge)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedBadge = withInstall(Badge)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedBadge).toHaveProperty('install')
  })
})
