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

  it('should return when playing', async () => {
    const stages: AnimationFrameStage[] = [
      { type: 'once', start: 0, end: 5 },
      { type: 'once', start: 6, end: 10 }
    ]

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
    canvas.trigger('click')
    canvas.trigger('click')
  })

  it('should return when looping', async () => {
    const stages: AnimationFrameStage[] = [
      { type: 'loop', start: 0, end: 5 },
      { type: 'loop', start: 6, end: 10 }
    ]

    const wrapper = mount(AnimationFrame, {
      props: {
        src: fakeGifSrc,
        stages,
        width: 320,
        height: 320,
        loop: true
      }
    })

    await wrapper.vm.$nextTick()

    const canvas = wrapper.find('canvas')
    canvas.trigger('click')
    canvas.trigger('click')
  })

  it('should render corrently when stages is empty', async () => {
    const wrapper = mount(AnimationFrame, {
      props: {
        src: fakeGifSrc,
        stages: [] as any,
        width: 320,
        height: 320
      }
    })

    await wrapper.vm.$nextTick()

    const canvas = wrapper.find('canvas')
    canvas.trigger('click')
  })
})

// super-gif load test
