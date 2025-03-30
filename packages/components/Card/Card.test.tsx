import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Card from './Card.vue'

describe('Card.vue', () => {
  it('renders slot content correctly', () => {
    const wrapper = mount(Card, {
      slots: {
        header: '<div class="header-test">Header</div>',
        default: '<div class="body-test">Body</div>',
        footer: '<div class="footer-test">Footer</div>',
      },
    })

    expect(wrapper.find('.header-test').text()).toBe('Header')
    expect(wrapper.find('.body-test').text()).toBe('Body')
    expect(wrapper.find('.footer-test').text()).toBe('Footer')
  })

  it('applies hoverable class when hoverable is true', async () => {
    const wrapper = mount(Card, {
      props: { hoverable: true },
    })
    expect(wrapper.classes()).toContain('px-card--hover')
  })
})
