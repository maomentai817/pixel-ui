import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { withInstall } from '@pixel-ui/utils'
import { PxProgress } from '.'

import Progress from './Progress.vue'

describe('Progress/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxProgress.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxProgress).toBe(Progress)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Progress component', () => {
    const enhancedProgress = withInstall(Progress)
    expect(enhancedProgress).toBe(PxProgress)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedProgress = withInstall(Progress)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedProgress).toHaveProperty('install')
  })
})

// css houdini paint worklet test
describe('PxProgress - CSS Houdini Paint Worklet', () => {
  const originalCSS = (globalThis as any).CSS

  afterEach(() => {
    ; (globalThis as any).CSS = originalCSS
    vi.restoreAllMocks()
  })

  it('should register the Paint Worklet pixelbox when supported', async () => {
    ; (globalThis as any).CSS = {
      paintWorklet: {
        addModule: vi.fn()
      }
    }

    mount(Progress)

    expect((globalThis as any).CSS.paintWorklet.addModule).toHaveBeenCalledWith(
      expect.stringContaining('/worklets/dist/pixelbox.worklet.js')
    )
  })

  it('should register the Paint Worklet pixelstripe when supported', async () => {
    ; (globalThis as any).CSS = {
      paintWorklet: {
        addModule: vi.fn()
      }
    }

    mount(Progress)

    expect((globalThis as any).CSS.paintWorklet.addModule).toHaveBeenCalledWith(
      expect.stringContaining('/worklets/dist/pixelstripe.worklet.js')
    )
  })

  it('should warn if CSS Houdini Paint Worklet is not supported', () => {
    console.warn = vi.fn()

    globalThis.CSS = {} as any

    mount(Progress)

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
      ; (globalThis as any).CSS = {
        paintWorklet: {
          addModule: vi.fn(() => {
            throw error
          })
        }
      }

    mount(Progress)

    expect(console.error).toHaveBeenCalledWith(
      'Error loading Paint Worklet:',
      error
    )
  })
})

describe('Progress.vue', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders correct percentage and outer/inner styles', () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 42,
        strokeWidth: 24
      }
    })

    const outer = wrapper.find('.px-progress-bar__outer')
    const inner = wrapper.find('.px-progress-bar__inner')

    expect(outer.attributes('style')).toContain('--px-progress-bar-height: 24px')
    expect(inner.attributes('style')).toContain('width: 42%')
  })

  it('renders correct percentage text outside by default', () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 66
      }
    })

    expect(wrapper.find('.px-progress__text').text()).toContain('66%')
  })

  it('renders percentage text inside when textInside is true', () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 75,
        textInside: true
      }
    })

    expect(wrapper.find('.px-progress-bar__inner-text').text()).toContain('75%')
  })

  it('applies striped and stripedFlow classes correctly', () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 50,
        striped: true,
        stripedFlow: true
      }
    })

    const inner = wrapper.find('.px-progress-bar__inner')
    expect(inner.classes()).toContain('is-striped')
    expect(inner.classes()).toContain('is-striped-flow')
  })

  it('applies indeterminate and checker classes correctly', () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 50,
        indeterminate: true,
        checker: true
      }
    })

    const inner = wrapper.find('.px-progress-bar__inner')
    expect(inner.classes()).toContain('is-indeterminate')
    expect(inner.classes()).toContain('is-checker')
  })

  it('applies correct status class', () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 50,
        status: 'success'
      }
    })

    expect(wrapper.find('.px-progress-bar__inner').classes()).toContain('is-success')
  })

  it('should format content with custom format function', () => {
    const formatMock = vi.fn(p => `Progress: ${p}`)
    const wrapper = mount(Progress, {
      props: {
        percentage: 75,
        format: formatMock
      }
    })

    expect(formatMock).toHaveBeenCalledWith(75)
    expect(wrapper.text()).toContain('Progress: 75')
  })

  it('renders custom content via slot', () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 80
      },
      slots: {
        default: ({ percentage }) => `<span>Custom: ${percentage}</span>`
      }
    })

    expect(wrapper.html()).toContain('Custom: 80')
  })

  it('renders with custom color style', () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 60,
        color: '#ff00ff'
      }
    })

    const inner = wrapper.find('.px-progress-bar__inner')
    expect(inner.attributes('style')).toContain('--px-progress-bar-bg-color')
    expect(inner.attributes('style')).toContain('--px-progress-bar-bg-shadow-color')
  })

  it('should cancel animation frame on unmount', () => {
    const cancelSpy = vi.spyOn(globalThis, 'cancelAnimationFrame')

    const wrapper = mount(Progress, {
      props: {
        percentage: 50,
        stripedFlow: true // 触发 updateStripeFlow
      }
    })

    wrapper.unmount()

    expect(cancelSpy).toHaveBeenCalled()
  })
})
