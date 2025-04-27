import { describe, test, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { withInstall } from '@pixel-ui/utils'
import { mount } from '@vue/test-utils'
import { PxTooltip } from '.'

// SFC 组件
import Tooltip from './Tooltip.vue'

describe('Tooltip/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxTooltip.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxTooltip).toBe(Tooltip)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Tooltip component', () => {
    const enhancedTooltip = withInstall(Tooltip)
    expect(enhancedTooltip).toBe(PxTooltip)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedTooltip = withInstall(Tooltip)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedTooltip).toHaveProperty('install')
  })
})

vi.mock('@popperjs/core')

const onVisibleChange = vi.fn()

describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  // tooltip 基础触发
  test('basic tooltip', async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside"></div>
          <Tooltip
            content="hello tooltip"
            trigger="click"
            {...{ onVisibleChange }}
          >
            <button id="trigger">trigger</button>
          </Tooltip>
        </div>
      ),
      { attachTo: document.body }
    )

    const triggerArea = wrapper.find('#trigger')

    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.px-tooltip__popper').exists()).toBeFalsy()

    // 弹出层是否出现
    triggerArea.trigger('click')
    await vi.runAllTimers()

    expect(wrapper.find('.px-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.px-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)

    // 再次点击
    triggerArea.trigger('click')
    await vi.runAllTimers()

    expect(wrapper.find('.px-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenCalledTimes(2)

    // 等待动画
    await vi.runAllTimers()

    triggerArea.trigger('click')
    await vi.runAllTimers()

    expect(wrapper.find('.px-tooltip__popper').exists()).toBeTruthy()

    // 区域外点击关闭 tooltip
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()

    expect(wrapper.find('.px-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenCalledTimes(4)

    // 注销流程
    wrapper.unmount()
  })

  // tooltip 悬停触发
  test('tooltip with hover trigger', async () => {
    // ... more configs
    const wrapper = mount(Tooltip, {
      props: {
        trigger: 'hover',
        content: 'hover trigger'
      }
    })

    // 悬浮测试显示
    wrapper.find('.px-tooltip__trigger').trigger('mouseenter')
    await vi.runAllTimers()

    expect(wrapper.find('.px-tooltip__popper').exists()).toBeTruthy()

    // 悬浮测试隐藏
    wrapper.find('.px-tooltip').trigger('mouseleave')
    await vi.runAllTimers()

    expect(wrapper.find('.px-tooltip__popper').exists()).toBeFalsy()
  })

  // tooltip 右键菜单触发
  test('tooltip with contextmenu trigger', async () => {
    // ... more configs
    const wrapper = mount(Tooltip, {
      props: {
        trigger: 'contextmenu',
        content: 'contextmenu trigger'
      }
    })

    // 右键测试显示
    wrapper.find('.px-tooltip__trigger').trigger('contextmenu')
    await vi.runAllTimers()

    expect(wrapper.find('.px-tooltip__popper').exists()).toBeTruthy()
    //todo 测试右键菜单隐藏 (可以模拟点击外部区域)
  })

  // 手动模式测试
  test('tooltip with manual trigger', async () => {
    // ... more configs
    const wrapper = mount(Tooltip, {
      props: { manual: true, content: 'manual mode' }
    })

    // 测试手动触发显示
    wrapper.vm.show() // 假设 show 方法可以通过某种方式访问
    await vi.runAllTimers()

    expect(wrapper.find('.px-tooltip__popper').exists()).toBeTruthy()

    // 测试手动触发隐藏
    wrapper.vm.hide()
    await vi.runAllTimers()

    expect(wrapper.find('.px-tooltip__popper').exists()).toBeFalsy()

    // 禁用测试
    wrapper.setProps({ disabled: true })
    await vi.runAllTimers()
    wrapper.vm.show()
    await vi.runAllTimers()
    expect(wrapper.find('.px-tooltip__popper').exists()).toBeFalsy()
  })

  // 禁用状态的测试
  test('disabled tooltip', async () => {
    // ... more configs
    const wrapper = mount(Tooltip, {
      props: { disabled: true, content: 'disabled tooltip' }
    })
    // 测试禁用状态下点击不会触发显示
    wrapper.find('.px-tooltip__trigger').trigger('click')
    await vi.runAllTimers()

    expect(wrapper.find('.px-tooltip__popper').exists()).toBeFalsy()
  })

  // 虚拟触发节点的测试
  test('tooltip with virtual trigger node', async () => {
    // ... 省略其他设置
    const virtualRef = document.createElement('div')
    const wrapper = mount(Tooltip, {
      props: { virtualTriggering: true }
    })
    wrapper.setProps({ virtualRef })
    await vi.runAllTimers()
    // 测试虚拟节点的事件触发
    virtualRef.dispatchEvent(new Event('mouseenter'))
    await vi.runAllTimers()
    expect(wrapper.find('.px-tooltip__popper').exists()).toBeTruthy()

    wrapper.setProps({ trigger: 'click' })
    await vi.runAllTimers()
    virtualRef.dispatchEvent(new Event('click'))
    await vi.runAllTimers()
    expect(wrapper.find('.px-tooltip__popper').exists()).toBeTruthy()

    wrapper.unmount()
  })

  // manual / trigger 改变时, 测试触发 resetEvent
  test('change trigger prop', async () => {
    const wrapper = mount(Tooltip, {
      props: { trigger: 'hover', content: 'test' }
    })

    wrapper.setProps({ trigger: 'click' })

    await vi.runAllTimers()
    wrapper.find('.px-tooltip__trigger').trigger('click')

    await vi.runAllTimers()
    expect(wrapper.find('.px-tooltip__popper').exists()).toBeTruthy()

    wrapper.find('.px-tooltip__trigger').trigger('click')

    await vi.runAllTimers()

    wrapper.find('.px-tooltip__trigger').trigger('hover')

    await vi.runAllTimers()
    expect(wrapper.find('.px-tooltip__popper').exists()).toBeFalsy()
  })

  test('change manual prop', async () => {
    const wrapper = mount(Tooltip, {
      props: { trigger: 'hover', content: 'test' }
    })

    wrapper.setProps({ manual: true })
    await vi.runAllTimers()

    wrapper.find('.px-tooltip__trigger').trigger('hover')

    await vi.runAllTimers()
    expect(wrapper.find('.px-tooltip__popper').exists()).toBeFalsy()

    wrapper.setProps({ manual: false, trigger: 'contextmenu' })

    await vi.runAllTimers()

    wrapper.find('.px-tooltip__trigger').trigger('contextmenu')

    await vi.runAllTimers()
    expect(wrapper.find('.px-tooltip__popper').exists()).toBeTruthy()
  })

  test('click-outside disabled when trigger prop is hover or manual mode', async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside"></div>
          <Tooltip
            content="hello tooltip"
            trigger="hover"
            {...{ onVisibleChange }}
          >
            <button id="trigger">trigger</button>
          </Tooltip>
        </div>
      ),
      {
        attachTo: document.body
      }
    )
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.px-tooltip__popper').exists()).toBeFalsy()

    // 弹出层是否出现
    wrapper.find('.px-tooltip__trigger').trigger('mouseenter')
    await vi.runAllTimers()
    expect(wrapper.find('.px-tooltip__popper').exists()).toBeTruthy()

    // trigger:hover外层点击不触发
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.px-tooltip__popper').exists()).toBeTruthy()
    // 注销流程
    wrapper.unmount()
  })

  test('destroy popper instance on unmount', async () => {
    const wrapper = mount(Tooltip, {
      props: { trigger: 'click', content: 'destroy test' }
    })

    await wrapper.find('.px-tooltip__trigger').trigger('click')
    await vi.runAllTimers()

    const destroySpy = vi.fn()
    ;(wrapper.vm as any).popperInstance = { destroy: destroySpy }

    wrapper.unmount()

    expect(destroySpy).toHaveBeenCalled()
  })
})

// css houdini paint worklet test
describe('PxTooltip - CSS Houdini Paint Worklet', () => {
  const originalCSS = (globalThis as any).CSS

  afterEach(() => {
    ;(globalThis as any).CSS = originalCSS
    vi.restoreAllMocks()
  })

  it('should register the Paint Worklet pixelbox when supported', async () => {
    ;(globalThis as any).CSS = {
      paintWorklet: {
        addModule: vi.fn()
      }
    }

    mount(Tooltip)

    expect((globalThis as any).CSS.paintWorklet.addModule).toHaveBeenCalledWith(
      expect.stringContaining('/worklets/dist/pixelbox.worklet.js')
    )
  })

  it('should warn if CSS Houdini Paint Worklet is not supported', () => {
    console.warn = vi.fn()

    globalThis.CSS = {} as any

    mount(Tooltip)

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

    mount(Tooltip)

    expect(console.error).toHaveBeenCalledWith(
      'Error loading Paint Worklet:',
      error
    )
  })
})
