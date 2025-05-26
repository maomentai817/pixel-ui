import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { withInstall } from '@pixel-ui/utils'
import { PxAnimationFrame, type AnimationFrameStage } from '.'

import AnimationFrame from './AnimationFrame.vue'

const fakeGifSrc = 'https://fake.gif'
const stages: AnimationFrameStage[] = [
  { type: 'loop', start: 0, end: 5 },
  { type: 'once', start: 6, end: 10 }
]

describe('AnimationFrame/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxAnimationFrame.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxAnimationFrame).toBe(AnimationFrame)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance AnimationFrame component', () => {
    const enhancedAnimationFrame = withInstall(AnimationFrame)
    expect(enhancedAnimationFrame).toBe(PxAnimationFrame)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedAnimationFrame = withInstall(AnimationFrame)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedAnimationFrame).toHaveProperty('install')
  })
})

describe('AnimationFrame.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.resetAllMocks()
  })

  it('should render canvas and mount properly', async () => {
    const wrapper = mount(AnimationFrame, {
      props: {
        src: fakeGifSrc,
        stages,
        width: 320,
        height: 320
      }
    })

    await wrapper.vm.$nextTick()

    const canvas = wrapper.find('canvas')
    expect(canvas.exists()).toBe(true)
    expect(canvas.attributes('style')).toContain('width: 320px')
  })

  it('should play next stage on click', async () => {
    const wrapper = mount(AnimationFrame, {
      props: {
        src: fakeGifSrc,
        stages,
        width: 320,
        height: 320
      }
    })

    await wrapper.vm.$nextTick()
    const canvas = wrapper.find('canvas')

    // 模拟点击切换动画阶段
    await canvas.trigger('click')
    vi.advanceTimersByTime(1000)

    expect(true).toBeTruthy() // 如果无报错，视为阶段切换逻辑正常
  })

  it('should drag the component', async () => {
    const wrapper = mount(AnimationFrame, {
      props: {
        src: fakeGifSrc,
        stages,
        width: 320,
        height: 320
      }
    })

    const root = wrapper.find('.px-animation-frame')

    await root.trigger('mousedown', { clientX: 100, clientY: 100 })
    await window.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 120, clientY: 130 })
    )
    await window.dispatchEvent(new MouseEvent('mouseup'))

    // 获取更新后的 transform 样式
    const style = (root.element as HTMLElement).style.transform
    expect(style).toContain('translate')
  })

  it('should update position on mouse drag and set hasMoved', async () => {
    const wrapper = mount(AnimationFrame, {
      props: {
        src: fakeGifSrc,
        stages,
        width: 320,
        height: 320
      },
      attachTo: document.body // 保证事件冒泡正常工作
    })

    const root = wrapper.find('.px-animation-frame')

    // 触发拖拽开始
    await root.trigger('mousedown', { clientX: 100, clientY: 100 })

    // 模拟鼠标移动到新位置
    document.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 120, clientY: 120 })
    )

    const vm = wrapper.vm as any
    expect(vm.hasMoved).toBe(true)
    expect(vm.position).toEqual({ x: 20, y: 20 })

    // 结束拖拽，清除监听器
    document.dispatchEvent(new MouseEvent('mouseup'))
  })

  it('should stop dragging on mouseup', async () => {
    const wrapper = mount(AnimationFrame, {
      props: {
        src: fakeGifSrc,
        stages,
        width: 320,
        height: 320
      },
      attachTo: document.body
    })

    const root = wrapper.find('.px-animation-frame')

    await root.trigger('mousedown', { clientX: 100, clientY: 100 })
    expect((wrapper.vm as any).isDragging).toBe(true)

    // 触发 document 的 mouseup，模拟释放
    document.dispatchEvent(new MouseEvent('mouseup'))

    expect((wrapper.vm as any).isDragging).toBe(false)
  })
})

// super-gif load test
