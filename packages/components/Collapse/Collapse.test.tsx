import { beforeAll, describe, expect, test, vi, it } from 'vitest'
import { DOMWrapper, mount, type VueWrapper } from '@vue/test-utils'

import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

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
})

describe('PxCollapse - CSS Houdini Paint Worklet', () => {
  it('should register the Paint Worklet pixelpanel when supported', async () => {
    global.CSS = {
      paintWorklet: {
        addModule: vi.fn()
      }
    } as any

    mount(CollapseItem)

    expect(global.CSS.paintWorklet.addModule).toHaveBeenCalledWith(
      expect.stringContaining('pixelpanel.js')
    )
  })

  it('should register the Paint Worklet pixelcontent when supported', async () => {
    global.CSS = {
      paintWorklet: {
        addModule: vi.fn()
      }
    } as any

    mount(CollapseItem)

    expect(global.CSS.paintWorklet.addModule).toHaveBeenCalledWith(
      expect.stringContaining('pixelcontent.js')
    )
  })

  it('should warn if CSS Houdini Paint Worklet is not supported', () => {
    console.warn = vi.fn() // 监听 console.warn
    global.CSS = {} as any // 移除 paintWorklet，模拟不支持的情况

    mount(CollapseItem)

    expect(console.warn).toHaveBeenCalledWith(
      'CSS Houdini Paint Worklet API is not supported in this browser.'
    )
  })
})
