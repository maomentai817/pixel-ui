import { mount } from '@vue/test-utils'
import { describe, it, expect, test } from 'vitest'
import { withInstall } from '@pixel-ui/utils'
import { PxCard } from '.'

import Card from './Card.vue'

describe('Card/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxCard.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxCard).toBe(Card)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Card component', () => {
    const enhancedCard = withInstall(Card)
    expect(enhancedCard).toBe(PxCard)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedCard = withInstall(Card)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedCard).toHaveProperty('install')
  })
})

describe('Card.vue', () => {
  // slot content test
  it('renders slot content correctly', () => {
    const wrapper = mount(Card, {
      slots: {
        header: '<div class="header-test">Header</div>',
        default: '<div class="body-test">Body</div>',
        footer: '<div class="footer-test">Footer</div>'
      }
    })

    expect(wrapper.find('.header-test').text()).toBe('Header')
    expect(wrapper.find('.body-test').text()).toBe('Body')
    expect(wrapper.find('.footer-test').text()).toBe('Footer')
  })

  // hoverable prop test
  it('applies hoverable class when hoverable is true', async () => {
    const wrapper = mount(Card, {
      props: { hoverable: true }
    })
    expect(wrapper.classes()).toContain('px-card--hover')
  })

  // round prop test
  test('Card is round when round is true', () => {
    const wrapper = mount(() => (
      <Card round>
        <div>Content</div>
      </Card>
    ))

    const cardWrapper = wrapper.findComponent(Card)
    expect(cardWrapper.classes()).toContain(`is-round`)
  })

  // circle prop test
  test('Card is circle when circle is true', () => {
    const wrapper = mount(() => (
      <Card circle>
        <div>Content</div>
      </Card>
    ))

    const cardWrapper = wrapper.findComponent(Card)
    expect(cardWrapper.classes()).toContain(`is-circle`)
  })

  // slot prepend test
  test('renders prepend slot correctly', () => {
    const wrapper = mount(Card, {
      slots: {
        prepend: '<div class="prepend-test">Prepend</div>'
      }
    })

    expect(wrapper.find('.prepend-test').text()).toBe('Prepend')
  })

  // slot append test
  test('renders append slot correctly', () => {
    const wrapper = mount(Card, {
      slots: {
        append: '<div class="append-test">Append</div>'
      }
    })

    expect(wrapper.find('.append-test').text()).toBe('Append')
  })
})
