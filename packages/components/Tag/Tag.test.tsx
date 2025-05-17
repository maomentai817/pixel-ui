import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { withInstall } from '@pixel-ui/utils'
import { PxTag, TagEffect, TagSize, TagType } from '.'

import Tag from './Tag.vue'

describe('Tag', () => {
  it('should render default slot content', () => {
    const wrapper = mount(Tag, {
      slots: {
        default: 'Tag Text'
      }
    })
    expect(wrapper.text()).toBe('Tag Text')
  })

  it('should render different types of tags', () => {
    const types: TagType[] = [
      'primary',
      'success',
      'warning',
      'danger',
      'info',
      'sakura'
    ]

    types.forEach((type) => {
      const wrapper = mount(Tag, {
        props: { type },
        slots: { default: 'Tag' }
      })
      expect(wrapper.classes()).toContain(`px-tag--${type}`)
    })
  })

  it('should render different sizes of tags', () => {
    const sizes: TagSize[] = ['large', 'default', 'small']

    sizes.forEach((size) => {
      const wrapper = mount(Tag, {
        props: { size },
        slots: { default: 'Tag' }
      })
      expect(wrapper.classes()).toContain(`px-tag--${size}`)
    })
  })

  it('should render different effects of tags', () => {
    const effects: TagEffect[] = ['plain', 'filled']

    effects.forEach((effect) => {
      const wrapper = mount(Tag, {
        props: { effect },
        slots: { default: 'Tag' }
      })
      expect(wrapper.classes()).toContain(`px-tag--${effect}`)
    })
  })

  it('should render disabled tag', () => {
    const wrapper = mount(Tag, {
      props: { disabled: true },
      slots: { default: 'Disabled Tag' }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('should render closable tag', () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
      slots: { default: 'Closable Tag' }
    })
    expect(wrapper.find('.px-tag__close').exists()).toBe(true)
  })

  it('should trigger close event', async () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
      slots: { default: 'Closable Tag' }
    })

    await wrapper.find('.px-tag__close-icon').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('should not trigger close event when disabled', async () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true,
        disabled: true
      },
      slots: { default: 'Disabled Close Button' }
    })

    await wrapper.find('.px-tag__close-icon').trigger('click')
    expect(wrapper.emitted().close).toBeFalsy()
  })

  it('should not trigger click event when disabled', async () => {
    const wrapper = mount(Tag, {
      props: {
        disabled: true
      },
      slots: { default: 'Disabled Close Button' }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('should apply custom color', () => {
    const wrapper = mount(Tag, {
      props: {
        color: '#ff0000',
        slots: { default: 'Custom Color' }
      }
    })

    expect(wrapper.classes()).toContain('is-custom')
    expect(wrapper.attributes('style')).toContain('--px-custom-bg-color')
  })

  it('should apply custom color with plain effect', () => {
    const wrapper = mount(Tag, {
      props: {
        color: '#00ff00',
        slots: { default: 'Custom Color' },
        effect: 'plain'
      }
    })

    expect(wrapper.classes()).toContain('is-custom')
    expect(wrapper.attributes('style')).toContain('--px-custom-bg-color')
  })

  it('should trigger click event', async () => {
    const wrapper = mount(Tag, {
      slots: { default: 'Clickable Tag' }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('should apply multiple attributes', () => {
    const wrapper = mount(Tag, {
      props: {
        type: 'primary',
        size: 'large',
        effect: 'plain',
        disabled: true
      },
      slots: { default: 'Combined Attributes' }
    })

    expect(wrapper.classes()).toContain('px-tag--primary')
    expect(wrapper.classes()).toContain('px-tag--large')
    expect(wrapper.classes()).toContain('px-tag--plain')
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('should dynamically update tag attributes', async () => {
    const wrapper = mount(Tag, {
      props: { type: 'primary' },
      slots: { default: 'Dynamic Tag' }
    })

    expect(wrapper.classes()).toContain('px-tag--primary')

    await wrapper.setProps({ type: 'success' })
    expect(wrapper.classes()).toContain('px-tag--success')
    expect(wrapper.classes()).not.toContain('px-tag--primary')
  })

  it('should use default value for invalid type', () => {
    const wrapper = mount(Tag, {
      props: { type: 'invalid-type' as any },
      slots: { default: 'Invalid Type' }
    })

    // Should use default type
    expect(wrapper.classes()).not.toContain('px-tag--invalid-type')
    expect(wrapper.classes()).toContain('px-tag--default')
  })

  it('should apply custom class name', () => {
    const wrapper = mount(Tag, {
      props: { class: 'custom-class' },
      slots: { default: 'Custom Class' }
    })

    expect(wrapper.classes()).toContain('custom-class')
  })
})

describe('Tag/index', () => {
  it('should be exported with withInstall()', () => {
    expect(PxTag.install).toBeDefined()
  })

  it('component should be exported', () => {
    expect(PxTag).toBe(Tag)
  })

  it('should enhance Tag component', () => {
    const enhancedTag = withInstall(Tag)
    expect(enhancedTag).toBe(PxTag)
  })

  it('should apply specific enhancements', () => {
    const enhancedTag = withInstall(Tag)
    expect(enhancedTag).toHaveProperty('install')
  })
})

// CSS Houdini Paint Worklet测试
describe('PxTag - CSS Houdini Paint Worklet', () => {
  const originalCSS = (globalThis as any).CSS

  afterEach(() => {
    ;(globalThis as any).CSS = originalCSS
    vi.restoreAllMocks()
  })

  it('should register Paint Worklet pixelbox when supported', async () => {
    ;(globalThis as any).CSS = {
      paintWorklet: {
        addModule: vi.fn()
      }
    }

    mount(Tag)

    expect((globalThis as any).CSS.paintWorklet.addModule).toHaveBeenCalledWith(
      expect.stringContaining('/worklets/dist/pixelbox.worklet.js')
    )
  })

  it('should emit warning when CSS Houdini Paint Worklet is not supported', () => {
    console.warn = vi.fn()

    globalThis.CSS = {} as any

    mount(Tag)

    expect(console.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining(
          'CSS Houdini Paint Worklet API is not supported in this browser.'
        )
      })
    )
  })

  it('should log error when loading Paint Worklet fails', () => {
    const error = new Error('Mock addModule error')
    console.error = vi.fn()
    ;(globalThis as any).CSS = {
      paintWorklet: {
        addModule: vi.fn(() => {
          throw error
        })
      }
    }

    mount(Tag)

    expect(console.error).toHaveBeenCalledWith(
      'Error loading Paint Worklet:',
      error
    )
  })
})
