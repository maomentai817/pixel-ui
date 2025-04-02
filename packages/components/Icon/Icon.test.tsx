import { mount } from '@vue/test-utils'
import { describe, it, expect, test } from 'vitest'
import Icon from './Icon.vue'

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
