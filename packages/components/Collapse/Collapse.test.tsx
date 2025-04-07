import { beforeAll, describe, expect, test, vi, it, afterEach } from 'vitest'
import { DOMWrapper, mount, type VueWrapper } from '@vue/test-utils'

import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
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
      expect.stringContaining('pixelpanel.js')
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
