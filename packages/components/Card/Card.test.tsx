import { mount } from '@vue/test-utils'
import { describe, it, expect, test, vi } from 'vitest'
import Card from './Card.vue'

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

describe('PxCard - CSS Houdini Paint Worklet', () => {
  it('should register the Paint Worklet when supported', async () => {
    global.CSS = {
      paintWorklet: {
        addModule: vi.fn()
      }
    } as any

    mount(Card)

    expect(global.CSS.paintWorklet.addModule).toHaveBeenCalledWith(
      expect.stringContaining('pixelbox.js')
    )
  })

  it('should warn if CSS Houdini Paint Worklet is not supported', () => {
    console.warn = vi.fn() // 监听 console.warn
    global.CSS = {} as any // 移除 paintWorklet，模拟不支持的情况

    mount(Card)

    expect(console.warn).toHaveBeenCalledWith(
      'CSS Houdini Paint Worklet API is not supported in this browser.'
    )
  })
})
