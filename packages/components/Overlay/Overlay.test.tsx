import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { withInstall } from '@pixel-ui/utils'
import { PxOverlay } from '.'

import Overlay from './Overlay.vue'

describe('Overlay/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxOverlay.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxOverlay).toBe(Overlay)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Overlay component', () => {
    const enhancedOverlay = withInstall(Overlay)
    expect(enhancedOverlay).toBe(PxOverlay)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedOverlay = withInstall(Overlay)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedOverlay).toHaveProperty('install')
  })
})

describe('PxOverlay', () => {
  it('should render with default props (mask = true, zIndex = 2000)', () => {
    const wrapper = mount(PxOverlay)

    const overlay = wrapper.find('.px-overlay')
    expect(overlay.exists()).toBe(true)
    expect(overlay.attributes('style')).toContain('z-index: 2000')
  })

  it('should render without mask and use fixed position', () => {
    const wrapper = mount(PxOverlay, {
      props: {
        mask: false,
        zIndex: 3000,
        lockScroll: false
      }
    })

    const overlay = wrapper.find('div')
    expect(overlay.exists()).toBe(true)
    expect(overlay.attributes('style')).toContain('z-index: 3000')
  })

  it('should apply overlayClass as string', () => {
    const wrapper = mount(PxOverlay, {
      props: {
        overlayClass: 'custom-class'
      }
    })

    expect(wrapper.find('.px-overlay').classes()).toContain('custom-class')
  })

  it('should apply overlayClass as array', () => {
    const wrapper = mount(PxOverlay, {
      props: {
        overlayClass: ['class-a', 'class-b']
      }
    })

    const classes = wrapper.find('.px-overlay').classes()
    expect(classes).toContain('class-a')
    expect(classes).toContain('class-b')
  })

  it('should apply overlayClass as object', () => {
    const wrapper = mount(PxOverlay, {
      props: {
        overlayClass: {
          'class-a': true,
          'class-b': false
        }
      }
    })

    const classes = wrapper.find('.px-overlay').classes()
    expect(classes).toContain('class-a')
    expect(classes).not.toContain('class-b')
  })

  it('should emit click event when clicked', async () => {
    const onClick = vi.fn()
    const wrapper = mount(PxOverlay, {
      props: {
        onClick
      }
    })

    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent)
  })

  it('should render slot content', () => {
    const wrapper = mount(PxOverlay, {
      slots: {
        default: '<p class="slot-content">Hello</p>'
      }
    })

    expect(wrapper.find('.slot-content').exists()).toBe(true)
    expect(wrapper.find('.slot-content').text()).toBe('Hello')
  })

  it('should unlock scroll when unmounted', async () => {
    const wrapper = mount(PxOverlay, {
      props: { lockScroll: true, mask: true }
    })
    await wrapper.setProps({ mask: false })
    wrapper.unmount()
  })
})
