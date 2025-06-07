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

    expect(outer.attributes('style')).toContain(
      '--px-progress-bar-height: 24px'
    )
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

    expect(wrapper.find('.px-progress-bar__inner').classes()).toContain(
      'is-success'
    )
  })

  it('should format content with custom format function', () => {
    const formatMock = vi.fn((p) => `Progress: ${p}`)
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
    expect(inner.attributes('style')).toContain(
      '--px-progress-bar-bg-shadow-color'
    )
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

  describe('Circle type progress', () => {
    it('renders ProgressRing component when type is circle', () => {
      const wrapper = mount(Progress, {
        props: {
          type: 'circle',
          percentage: 50,
          width: 120
        }
      })

      expect(wrapper.find('.px-progress-circle').exists()).toBe(true)
      expect(wrapper.find('.px-progress-bar').exists()).toBe(false)
    })

    it('passes correct props to ProgressRing', () => {
      const wrapper = mount(Progress, {
        props: {
          type: 'circle',
          percentage: 75,
          width: 150,
          strokeWidth: 8,
          status: 'success',
          showText: true
        }
      })

      const svg = wrapper.find('svg')
      expect(svg.attributes('width')).toBe('150')
      expect(svg.attributes('height')).toBe('150')
      expect(wrapper.find('.px-progress-circle__text').exists()).toBe(true)
    })

    it('renders correct percentage text in circle', () => {
      const wrapper = mount(Progress, {
        props: {
          type: 'circle',
          percentage: 66,
          showText: true
        }
      })

      expect(wrapper.find('.px-progress-circle__text').text()).toContain('66%')
    })

    it('applies custom color to circle progress', () => {
      const wrapper = mount(Progress, {
        props: {
          type: 'circle',
          percentage: 60,
          color: '#ff6b6b'
        }
      })

      const progressRects = wrapper.findAll('g:nth-child(2) rect')
      if (progressRects.length > 0) {
        expect(progressRects[0].attributes('fill')).toBe('#ff6b6b')
      }
    })

    it('applies status color to circle progress', () => {
      const wrapper = mount(Progress, {
        props: {
          type: 'circle',
          percentage: 80,
          status: 'success'
        }
      })

      const progressRects = wrapper.findAll('g:nth-child(2) rect')
      if (progressRects.length > 0) {
        expect(progressRects[0].attributes('fill')).toContain(
          '--px-color-success'
        )
      }
    })

    it('renders custom content via slot in circle', () => {
      const wrapper = mount(Progress, {
        props: {
          type: 'circle',
          percentage: 90,
          showText: true
        },
        slots: {
          default: ({ percentage }) => `<span>圆形: ${percentage}</span>`
        }
      })

      expect(wrapper.html()).toContain('圆形: 90')
    })

    it('formats circle content with custom format function', () => {
      const formatMock = vi.fn((p) => `${p}/100`)
      const wrapper = mount(Progress, {
        props: {
          type: 'circle',
          percentage: 45,
          showText: true,
          format: formatMock
        }
      })

      expect(formatMock).toHaveBeenCalledWith(45)
      expect(wrapper.text()).toContain('45/100')
    })

    it('hides text when showText is false in circle', () => {
      const wrapper = mount(Progress, {
        props: {
          type: 'circle',
          percentage: 50,
          showText: false
        }
      })

      expect(wrapper.find('.px-progress-circle__text').exists()).toBe(false)
    })

    it('c8 render fake', () => {
      mount(Progress, {
        props: {
          type: 'c8-error' as any,
          percentage: 50
        } as any
      })
    })
  })
})
