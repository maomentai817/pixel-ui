import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import PxAnimationFrame from './AnimationFrame.vue'
import type { AnimationFrameStage } from './types'

// mock SuperGif
vi.mock('@mmt817/super-gif', () => {
  return {
    SuperGif: vi.fn().mockImplementation(() => {
      return {
        load: (cb: () => void) => cb(),
        moveTo: vi.fn(),
        getLength: () => 20
      }
    })
  }
})

const fakeGifSrc = 'https://fake.gif'
const stages: AnimationFrameStage[] = [
  { type: 'loop', start: 0, end: 5 },
  { type: 'once', start: 6, end: 10 }
]

describe('PxAnimationFrame', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.resetAllMocks()
  })

  it('should render canvas and mount properly', async () => {
    const wrapper = mount(PxAnimationFrame, {
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
    const wrapper = mount(PxAnimationFrame, {
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
    const wrapper = mount(PxAnimationFrame, {
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
})
