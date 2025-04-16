import { beforeAll, describe, expect, test, vi, it, afterEach } from 'vitest'
import { DOMWrapper, mount, type VueWrapper } from '@vue/test-utils'
import { withInstall } from '@pixel-ui/utils'
import { PxCollapse, PxCollapseItem } from '.'

import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
import Icon from '../Icon/Icon.vue'
import transitionEvents from './transitionEvents'

const onChange = vi.fn()

let wrapper: VueWrapper,
  headers: DOMWrapper<Element>[],
  contents: DOMWrapper<Element>[]

let firstHeader: DOMWrapper<Element>,
  secondHeader: DOMWrapper<Element>,
  disabledHeader: DOMWrapper<Element>,
  firstContent: DOMWrapper<Element>,
  secondContent: DOMWrapper<Element>,
  disabledContent: DOMWrapper<Element>

describe('Collapse/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxCollapse.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxCollapse).toBe(Collapse)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Collapse component', () => {
    const enhancedCollapse = withInstall(Collapse)
    expect(enhancedCollapse).toBe(PxCollapse)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedCollapse = withInstall(Collapse)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedCollapse).toHaveProperty('install')
  })
})

describe('CollapseItem/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxCollapseItem.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxCollapseItem).toBe(CollapseItem)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance CollapseItem component', () => {
    const enhancedCollapseItem = withInstall(CollapseItem)
    expect(enhancedCollapseItem).toBe(PxCollapseItem)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedCollapseItem = withInstall(CollapseItem)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedCollapseItem).toHaveProperty('install')
  })
})

describe('Collapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(
      () => (
        <Collapse modelValue={['a']} {...{ onChange }}>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
          <CollapseItem name="c" title="title c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ['PxIcon']
        },
        attachTo: document.body
      }
    )

    headers = wrapper.findAll('.px-collapse-item__header')
    contents = wrapper.findAll('.px-collapse-item__content')

    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]

    firstContent = contents[0]
    secondContent = contents[1]
    disabledContent = contents[2]
  })

  // test render basic dom & text content
  test('render basic dom and text content', () => {
    // length
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // title
    expect(firstHeader.text()).toBe('title a')

    // content
    expect(firstHeader.classes()).toContain('is-active')
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondHeader.classes()).not.toContain('is-active')
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
    expect(secondContent.text()).toBe('content b')
  })

  // test click on the title to expand/close the content
  test('click on the title to expand/close the content', async () => {
    // events
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondHeader.classes()).toContain('is-active')
    expect(secondHeader.isVisible()).toBeTruthy()
    expect(firstHeader.classes()).not.toContain('is-active')
    expect(firstContent.isVisible()).toBeFalsy()
  })

  // test emit change event corrently
  test('emit change event corrently', () => {
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })

  // test disabled collapse item
  test('disabled collapse item', async () => {
    // disabled
    expect(disabledHeader.classes()).toContain('is-disabled')
    onChange.mockClear()
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })

  // test the change of modelValue
  test('the change of modelValue', async () => {
    wrapper.setValue(['b'], 'modelValue')
    await wrapper.vm.$nextTick()
    expect(secondHeader.classes()).toContain('is-active')
    expect(firstHeader.classes()).not.toContain('is-active')
  })

  // test accordion mode
  test('accordion mode', async () => {
    wrapper = mount(
      () => (
        <Collapse accordion modelValue={['a']} {...{ onChange }}>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ['PxIcon']
        },
        attachTo: document.body
      }
    )

    headers = wrapper.findAll('.px-collapse-item__header')
    contents = wrapper.findAll('.px-collapse-item__content')

    firstHeader = headers[0]
    secondHeader = headers[1]

    firstContent = contents[0]
    secondContent = contents[1]

    await firstHeader.trigger('click')
    await secondHeader.trigger('click')

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(['b'])
    expect(firstHeader.classes()).not.toContain('is-active')
    expect(secondHeader.classes()).toContain('is-active')
  })

  // test accordion mode with error
  test('accordion mode with error', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {
      // eslint-disable-next-line no-empty-function
    })
    mount(
      () => (
        <Collapse accordion modelValue={['a', 'b']} {...{ onChange }}>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
          <CollapseItem name="c" title="title c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ['PxIcon']
        }
      }
    )
    expect(warn).toHaveBeenCalled()
    // expect(warn.mock.calls).toMatchInlineSnapshot(
    //   `
    //     [
    //       [
    //         [PxUIError: [PxCollapse]:accordion mode should only have one active item],
    //       ],
    //     ]
    //   `
    // )
  })

  // icon 覆盖
  it('should apply rotation style when rotation is provided', () => {
    const wrapper = mount(Icon, {
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
;(globalThis as any).CSS = {
  paintWorklet: {
    addModule: vi.fn()
  }
}

describe('PxCollapse - CSS Houdini Paint Worklet', () => {
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

    mount(CollapseItem)

    expect((globalThis as any).CSS.paintWorklet.addModule).toHaveBeenCalledWith(
      expect.stringContaining('pixelpanel.ts')
    )
  })

  it('should register the Paint Worklet pixelcontent when supported', async () => {
    ;(globalThis as any).CSS = {
      paintWorklet: {
        addModule: vi.fn()
      }
    }

    mount(CollapseItem)

    expect((globalThis as any).CSS.paintWorklet.addModule).toHaveBeenCalledWith(
      expect.stringContaining('pixelcontent.js')
    )
  })

  it('should warn if CSS Houdini Paint Worklet is not supported', () => {
    console.warn = vi.fn()

    globalThis.CSS = {} as any

    mount(CollapseItem)

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

    mount(CollapseItem)

    expect(console.error).toHaveBeenCalledWith(
      'Error loading Paint Worklet:',
      error
    )
  })
})

describe('Collapse/transitionEvents.ts', () => {
  const wrapper = mount(() => <div></div>)
  test('beforeEnter', () => {
    transitionEvents.beforeEnter(wrapper.element)
    expect(wrapper.element.style.height).toBe('0px')
    expect(wrapper.element.style.overflow).toBe('hidden')
  })
  test('enter', () => {
    transitionEvents.enter(wrapper.element)
    expect(wrapper.element.style.height).toBe(
      `${wrapper.element.scrollHeight}px`
    )
  })
  test('afterEnter', () => {
    transitionEvents.afterEnter(wrapper.element)
    expect(wrapper.element.style.height).toBe('')
    expect(wrapper.element.style.overflow).toBe('')
  })
  test('beforeLeave', () => {
    transitionEvents.beforeLeave(wrapper.element)
    expect(wrapper.element.style.height).toBe(
      `${wrapper.element.scrollHeight}px`
    )
    expect(wrapper.element.style.overflow).toBe('hidden')
  })
  test('leave', () => {
    transitionEvents.leave(wrapper.element)
    expect(wrapper.element.style.height).toBe('0px')
  })
  test('afterLeave', () => {
    transitionEvents.afterLeave(wrapper.element)
    expect(wrapper.element.style.height).toBe('')
    expect(wrapper.element.style.overflow).toBe('')
  })
})
