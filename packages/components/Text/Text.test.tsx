import { mount } from '@vue/test-utils'
import { describe, it, expect, test } from 'vitest'
import { withInstall } from '@pixel-ui/utils'
import { PxText } from '.'

import Text from './Text.vue'

describe('Text/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxText.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxText).toBe(Text)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Text component', () => {
    const enhancedText = withInstall(Text)
    expect(enhancedText).toBe(PxText)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedText = withInstall(Text)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedText).toHaveProperty('install')
  })
})

describe('Text.vue', () => {
  // slot content test
  it('renders slot content correctly', () => {
    const wrapper = mount(Text, {
      slots: {
        default: '<span class="text-content">Hello, World!</span>'
      }
    })

    expect(wrapper.find('.text-content').text()).toBe('Hello, World!')
  })

  // size prop test
  it('applies the correct font size', () => {
    const wrapper = mount(Text, {
      props: { size: 20 }
    })

    expect(wrapper.element.style.fontSize).toBe('20px')
  })

  // color prop test
  it('applies the correct text color', () => {
    const wrapper = mount(Text, {
      props: { color: '#ff0000' }
    })

    expect(wrapper.element.style.color).toBe('rgb(255, 0, 0)')
  })

  // bold prop test
  test('renders bold text when bold is true', () => {
    const wrapper = mount(() => <Text bold>Bold Text</Text>)

    expect(wrapper.element.style.fontWeight).toBe('bold')
  })

  // align prop test
  test('applies correct text alignment', () => {
    const wrapper = mount(() => <Text align="center">Centered Text</Text>)

    expect(wrapper.element.style.textAlign).toBe('center')
  })

  // type prop test
  test('applies correct class based on type', () => {
    const wrapper = mount(() => <Text type="success">Success Text</Text>)

    expect(wrapper.classes()).toContain('px-text--success')
  })

  // compact prop test
  test('applies compact class when compact is true', () => {
    const wrapper = mount(() => <Text compact>Compact Text</Text>)

    expect(wrapper.classes()).toContain('is-compact')
  })

  // tag prop test
  test('renders correct tag when tag prop is set', () => {
    const wrapper = mount(Text, {
      props: { tag: 'h1' },
      slots: {
        default: 'Heading 1'
      }
    })

    expect(wrapper.element.tagName).toBe('H1')
  })
})
