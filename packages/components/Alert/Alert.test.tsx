import type { AlertType } from './types'

import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { withInstall } from '@pixel-ui/utils'
import { PxAlert } from './index'

import Alert from './Alert.vue'
import PxIcon from '../Icon/Icon.vue'

describe('Alert.vue', () => {
  const title = 'Test Alert' as const
  const desc = 'This is a test description' as const
  it('should render the alert with default props', () => {
    const wrapper = mount(Alert, {
      props: {
        title
      },
      slots: {
        default: desc
      },
      global: {
        stubs: ['PxIcon']
      }
    })
    expect(wrapper.text()).toContain(title)
    expect(wrapper.text()).toContain(desc)

    // close icon
    const iconElement = wrapper.findComponent(PxIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('info-circle')

    const wrapper2 = mount(() => (
      <Alert title={title} description={desc}></Alert>
    ))

    expect(wrapper2.text()).toContain(title)
    expect(wrapper2.text()).toContain(desc)
  })

  it.each([
    ['info', 'info-circle'],
    ['success', 'check-circle'],
    ['warning', 'exclamation-triangle'],
    ['danger', 'times-circle'],
    ['error', 'times-circle'],
    ['non-compliance', 'info-circle'] // 不符合 type 定义的
  ])('should has the correct icon when props type is %s', (type, iconName) => {
    const wrapper = mount(Alert, {
      props: {
        title,
        closable: false,
        showIcon: true,
        type: type as AlertType
      },
      slots: {
        default: desc
      },
      global: {
        stubs: ['PxIcon']
      }
    })

    const iconElement = wrapper.findComponent(PxIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe(iconName)
  })

  it('should emit close event when close icon is clicked', () => {
    const onClose = vi.fn()

    const wrapper = mount(Alert, {
      props: {
        title,
        closable: true,
        showIcon: false,
        onClose
      },
      slots: {
        default: desc
      },
      global: {
        stubs: ['PxIcon']
      }
    })
    wrapper.find('.px-alert__close-icon').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('should allow custom content via slots', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'test title'
      },
      slots: {
        default: desc,
        title
      }
    })
    expect(wrapper.text()).toContain(desc)
    expect(wrapper.text()).toContain(title)
    expect(wrapper.text()).not.toContain('test title')
  })

  it('should support centering text', () => {
    const wrapper = mount(Alert, {
      props: {
        title,
        description: desc,
        center: true
      }
    })
    //class
    const rootNode = wrapper.find('.px-alert')
    expect(rootNode.classes()).toContain('text-center')
  })

  it('should not render close icon when closable is false', () => {
    const wrapper = mount(Alert, {
      props: { closable: false }
    })
    expect(wrapper.find('.px-alert__close').exists()).toBe(false)
  })

  it('should toggle visibility when open and close methods are called', async () => {
    const wrapper = mount(Alert, {
      props: { title, closable: false }
    })
    await wrapper.vm.close()
    expect(wrapper.find('.px-alert').attributes().style).toBe('display: none;')
    await wrapper.vm.open()
    expect(wrapper.find('.px-alert').attributes().style).toBe('')
  })

  // icon 覆盖
  it('should apply rotation style when rotation is provided', () => {
    const wrapper = mount(PxIcon, {
      props: {
        icon: 'test-icon',
        rotation: 90,
        size: 24
      }
    })

    const style = (wrapper.element as HTMLElement).style
    expect(style.transform || style.rotate || '').toContain('90deg')
  })
})

describe('Alert/index', () => {
  it('should be exported with withInstall()', () => {
    expect(PxAlert.install).toBeDefined()
  })
  it('component should be exported', () => {
    expect(PxAlert).toBe(Alert)
  })

  // 可选
  it('should enhance Alert component', () => {
    const enhancedAlert = withInstall(Alert)
    expect(enhancedAlert).toBe(PxAlert)
  })

  // 可选
  it('should apply specific enhance', () => {
    const enhancedAlert = withInstall(Alert)
    expect(enhancedAlert).toHaveProperty('install')
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

    mount(Alert)

    expect((globalThis as any).CSS.paintWorklet.addModule).toHaveBeenCalledWith(
      expect.stringContaining('pixelbox.js')
    )
  })

  it('should warn if CSS Houdini Paint Worklet is not supported', () => {
    console.warn = vi.fn()

    globalThis.CSS = {} as any

    mount(Alert)

    expect(console.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining(
          'CSS Houdini Paint Worklet API is not supported in this browser.'
        )
      })
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

    mount(Alert)

    expect(console.error).toHaveBeenCalledWith(
      'Error loading Paint Worklet:',
      error
    )
  })
})
