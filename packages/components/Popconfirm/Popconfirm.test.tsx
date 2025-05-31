import { describe, it, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { withInstall } from '@pixel-ui/utils'
import { PxPopconfirm, type PopconfirmProps } from '.'
import { get, each } from 'lodash-es'

import Popconfirm from './Popconfirm.vue'

describe('Popconfirm/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxPopconfirm.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxPopconfirm).toBe(Popconfirm)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Popconfirm component', () => {
    const enhancedPopconfirm = withInstall(Popconfirm)
    expect(enhancedPopconfirm).toBe(PxPopconfirm)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedPopconfirm = withInstall(Popconfirm)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedPopconfirm).toHaveProperty('install')
  })
})

const onConfirm = vi.fn()
const onCancel = vi.fn()

describe('Popconfirm.vue', () => {
  const props = {
    title: 'Test Title',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    confirmButtonType: 'primary',
    cancelButtonType: 'base',
    icon: 'check-circle',
    iconColor: 'green',
    hideIcon: false,
    hideAfter: 500,
    width: 200
  } as PopconfirmProps

  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  // 测试组件的属性
  it('should accept all props', () => {
    const wrapper = mount(Popconfirm, { props })

    each(props, (val, key) => {
      expect(get(wrapper.props(), key)).toBe(val)
    })
  })

  // 插槽测试
  it('should render slot content corrently', () => {
    const slotContent = 'slot content'
    const wrapper = mount(Popconfirm, {
      slots: { default: slotContent },
      props
    })

    expect(wrapper.text()).toContain(slotContent)
  })

  // 事件测试
  test('popconfirm emits', async () => {
    const wrapper = mount(() => (
      <div>
        <div id="outside"></div>
        <Popconfirm
          title="test title"
          hideIcon={true}
          onConfirm={onConfirm}
          onCancel={onCancel}
        >
          <button id="trigger">trigger</button>
        </Popconfirm>
      </div>
    ))

    // 触发唤出弹层
    const triggerNode = wrapper.find('#trigger')
    expect(triggerNode.exists()).toBeTruthy()

    triggerNode.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.px-popconfirm').exists()).toBeTruthy()

    // confirm 测试逻辑
    const confirmBtn = wrapper.find('.px-popconfirm__confirm')
    expect(confirmBtn.exists()).toBeTruthy()

    confirmBtn.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.px-popconfirm').exists()).toBeFalsy()
    expect(onConfirm).toBeCalled()

    // 重新唤出
    triggerNode.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.px-popconfirm').exists()).toBeTruthy()

    // cancel 测试逻辑
    const cancelBtn = wrapper.find('.px-popconfirm__cancel')
    expect(cancelBtn.exists()).toBeTruthy()

    cancelBtn.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.px-popconfirm').exists()).toBeFalsy()
    expect(onCancel).toBeCalled()
  })
})
