import { mount } from '@vue/test-utils'
import { describe, it, expect, test } from 'vitest'
import { withInstall } from '@pixel-ui/utils'
import { PxIcon } from '.'

import Icon from './Icon.vue'

describe('Icon/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxIcon.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxIcon).toBe(Icon)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Icon component', () => {
    const enhancedIcon = withInstall(Icon)
    expect(enhancedIcon).toBe(PxIcon)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedIcon = withInstall(Icon)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedIcon).toHaveProperty('install')
  })
})

describe('Icon.vue', () => {
  // 渲染 icon 组件
  it('renders icon with correct class', () => {
    const wrapper = mount(Icon, {
      props: { icon: 'star' }
    })

    expect(wrapper.classes()).toContain('px-icon')
    expect(wrapper.classes()).toContain('hn')
    expect(wrapper.classes()).toContain('hn-star')
  })

  // size prop 测试
  test('applies correct size style', () => {
    const wrapper = mount(() => <Icon icon="star" size={24} />)

    expect(wrapper.element.style.fontSize).toBe('24px')
  })

  // color prop 测试
  test('applies correct color style', () => {
    const wrapper = mount(() => <Icon icon="star" color="#ff0000" />)

    expect(wrapper.element.style.color).toBe('rgb(255, 0, 0)')
  })

  // rotation prop 测试
  test('applies correct rotation style', () => {
    const wrapper = mount(() => <Icon icon="star" rotation={45} />)

    expect(wrapper.element.style.rotate).toBe('45deg')
  })

  // flip prop 测试
  test('applies correct flip class', () => {
    const wrapper = mount(() => <Icon icon="star" flip="horizontal" />)

    expect(wrapper.classes()).toContain('px-icon--horizontal')
  })

  // spin prop 测试
  test('applies spin animation when spin is true', () => {
    const wrapper = mount(() => <Icon icon="star" spin />)

    expect(wrapper.classes()).toContain('is-spin')
  })

  // bounce prop 测试
  test('applies bounce animation when bounce is true', () => {
    const wrapper = mount(() => <Icon icon="star" bounce />)

    expect(wrapper.classes()).toContain('is-bounce')
  })

  // shake prop 测试
  test('applies shake animation when shake is true', () => {
    const wrapper = mount(() => <Icon icon="star" shake />)

    expect(wrapper.classes()).toContain('is-shake')
  })

  // beat prop 测试
  test('applies beat animation when beat is true', () => {
    const wrapper = mount(() => <Icon icon="star" beat />)

    expect(wrapper.classes()).toContain('is-beat')
  })

  // type prop 测试
  test('applies correct type class', () => {
    const wrapper = mount(() => <Icon icon="star" type="success" />)

    expect(wrapper.classes()).toContain('px-icon--success')
  })
})
