import { describe, expect, vi, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { withInstall } from '@pixel-ui/utils'
import { DropdownItemProps, PxDropdown, PxDropdownItem } from '.'

import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

describe('Dropdown/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxDropdown.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxDropdown).toBe(Dropdown)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Dropdown component', () => {
    const enhancedDropdown = withInstall(Dropdown)
    expect(enhancedDropdown).toBe(PxDropdown)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedDropdown = withInstall(Dropdown)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedDropdown).toHaveProperty('install')
  })
})

describe('DropdownItem/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxDropdownItem.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxDropdownItem).toBe(DropdownItem)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance DropdownItem component', () => {
    const enhancedDropdownItem = withInstall(DropdownItem)
    expect(enhancedDropdownItem).toBe(PxDropdownItem)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedDropdownItem = withInstall(DropdownItem)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedDropdownItem).toHaveProperty('install')
  })
})

describe('Dropdown.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  it('should render slots corrently', () => {
    const items: DropdownItemProps[] = [
      { label: 'Item 1', command: 1 },
      { label: 'Item 2', command: 2 }
    ]

    const wrapper = mount(Dropdown, {
      props: {
        trigger: 'click'
      },
      slots: {
        default: () => <div>Default Slot</div>,
        dropdown: () => items.map((item) => <DropdownItem {...item} />)
      }
    })

    expect(wrapper.text()).toContain('Default Slot')
    expect(wrapper.find('.px-dropdown').exists()).toBeTruthy()
  })

  it('should emit command event when item is clicked', async () => {
    const items: DropdownItemProps[] = [
      { label: 'Item 1', disabled: true },
      { label: 'Item 2', command: 'item2', divided: true }
    ]
    const onCommand = vi.fn()
    const wrapper = mount(Dropdown, {
      props: {
        trigger: 'click',
        onCommand
      },
      slots: {
        default: () => <button id="trigger">Default slot content</button>,
        dropdown: () => items.map((item) => <DropdownItem {...item} />)
      }
    })

    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()

    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.px-dropdown__menu').exists()).toBeTruthy()

    const listItems = wrapper.findAll('li')
    expect(listItems.length).toBe(3) // 1 disabled item + 1 divider + 1 enabled item

    // disabled item
    await listItems.at(0)?.trigger('click')
    expect(onCommand).toBeCalledTimes(0)

    // divider (non-interactive)
    await listItems.at(1)?.trigger('click')
    expect(onCommand).toBeCalledTimes(0)

    // real interactive item
    await listItems.at(2)?.trigger('click')
    expect(onCommand).toBeCalledTimes(1)
    expect(onCommand).toBeCalledWith('item2')
  })

  it('should toggle visibility when split btn is clicked', async () => {
    const items: DropdownItemProps[] = [
      { label: 'Item 1' },
      { label: 'Item 2', command: 'item2' }
    ]
    const onClick = vi.fn()
    const wrapper = mount(Dropdown, {
      props: {
        trigger: 'click',
        splitButton: true,
        items,
        onClick
      },
      slots: {
        default: () => <div id="trigger">Default slot content</div>
      }
    })

    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()

    triggerArea.trigger('click')
    await vi.runAllTimers()

    expect(wrapper.find('.px-dropdown__menu').exists()).toBeFalsy()
    expect(onClick).toBeCalled()
  })

  it('should expose open/close methods', async () => {
    const wrapper = mount(Dropdown, {
      props: {
        trigger: 'click'
      },
      slots: {
        default: () => <div>Trigger</div>,
        dropdown: () => <DropdownItem label="Test" />
      },
      globals: { components: { DropdownItem } }
    })

    // 调用暴露的方法
    wrapper.vm.open?.()
    wrapper.vm.close?.()

    // 简单断言，确保不会抛错
    expect(wrapper.vm.open).toBeDefined()
    expect(wrapper.vm.close).toBeDefined()
  })
})
