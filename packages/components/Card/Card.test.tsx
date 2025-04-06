import { mount } from '@vue/test-utils'
import { describe, it, expect, test, vi, afterEach } from 'vitest'
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

// css houdini paint worklet test
describe('PxCard - CSS Houdini Paint Worklet', () => {
  const originalCSS = (globalThis as any).CSS

  afterEach(() => {
    ;(globalThis as any).CSS = originalCSS
    vi.restoreAllMocks()
  })

  it('should register the Paint Worklet pixelpanel when supported', async () => {
    ;(globalThis as any).CSS = {
      paintWorklet: {
        addModule: vi.fn()
      }
    }

    mount(Card)

    expect((globalThis as any).CSS.paintWorklet.addModule).toHaveBeenCalledWith(
      expect.stringContaining('pixelbox.js')
    )
  })

  it('should warn if CSS Houdini Paint Worklet is not supported', () => {
    console.warn = vi.fn()

    globalThis.CSS = {} as any

    mount(Card)

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        'CSS Houdini Paint Worklet API is not supported in this browser.'
      )
    )
  })

  it('should log an error if loading the Paint Worklet fails', () => {
    const error = new Error('Mock addModule error')
    console.error = vi.fn()
    ;(globalThis as any).CSS = {
      paintWorklet: {
        addModule: vi.fn(() => {
          throw error
        })
      }
    }

    mount(Card)

    expect(console.error).toHaveBeenCalledWith(
      'Error loading Paint Worklet:',
      error
    )
  })
})
