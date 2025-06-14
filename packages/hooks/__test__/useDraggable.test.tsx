import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { h, ref, nextTick, computed } from 'vue'
import { mount } from '@vue/test-utils'
import { useDraggable } from '../useDraggable'

const getBoundingClientRectMock = vi.fn()

// mock document size
Object.defineProperty(document.documentElement, 'clientWidth', {
  value: 800,
  configurable: true
})
Object.defineProperty(document.documentElement, 'clientHeight', {
  value: 600,
  configurable: true
})

describe('useDraggable', () => {
  let wrapper: any
  let targetEl: HTMLElement
  let dragEl: HTMLElement

  beforeEach(() => {
    getBoundingClientRectMock.mockReturnValue({
      left: 100,
      top: 100,
      width: 200,
      height: 100,
      right: 300,
      bottom: 200,
      x: 100,
      y: 100,
      toJSON: () => {
        // noop
      }
    })

    wrapper = mount({
      setup() {
        const targetRef = ref<HTMLElement>()
        const dragRef = ref<HTMLElement>()
        const draggable = ref(true)
        const overflow = ref(false)

        // mock targetRef's getBoundingClientRect
        nextTick(() => {
          if (targetRef.value) {
            targetRef.value.getBoundingClientRect = getBoundingClientRectMock
          }
        })

        const { resetPosition, updatePosition } = useDraggable(
          targetRef,
          dragRef,
          computed(() => draggable.value),
          computed(() => overflow.value)
        )

        return () =>
          h('div', {}, [
            h(
              'div',
              {
                ref: targetRef,
                'data-test': 'target',
                style: 'width: 200px; height: 100px; position: absolute;'
              },
              [
                h(
                  'div',
                  {
                    ref: dragRef,
                    'data-test': 'drag',
                    style:
                      'width: 100%; height: 20px; cursor: move; background: #ccc;'
                  },
                  'Drag Here'
                )
              ]
            ),
            h(
              'button',
              {
                'data-test': 'reset',
                onClick: resetPosition
              },
              'Reset'
            ),
            h(
              'button',
              {
                'data-test': 'update',
                onClick: updatePosition
              },
              'Update'
            )
          ])
      }
    })

    mount({
      setup() {
        const targetRef = ref<HTMLElement>()
        const dragRef = ref<HTMLElement>()
        const draggable = ref(false)
        const overflow = ref(true)

        // mock targetRef's getBoundingClientRect
        nextTick(() => {
          if (targetRef.value) {
            targetRef.value.getBoundingClientRect = getBoundingClientRectMock
          }
        })

        const { resetPosition, updatePosition } = useDraggable(
          targetRef,
          dragRef,
          computed(() => draggable.value),
          computed(() => overflow.value)
        )

        return () =>
          h('div', {}, [
            h(
              'div',
              {
                ref: targetRef,
                'data-test': 'target',
                style: 'width: 200px; height: 100px; position: absolute;'
              },
              [
                h(
                  'div',
                  {
                    ref: dragRef,
                    'data-test': 'drag',
                    style:
                      'width: 100%; height: 20px; cursor: move; background: #ccc;'
                  },
                  'Drag Here'
                )
              ]
            ),
            h(
              'button',
              {
                'data-test': 'reset',
                onClick: resetPosition
              },
              'Reset'
            ),
            h(
              'button',
              {
                'data-test': 'update',
                onClick: updatePosition
              },
              'Update'
            )
          ])
      }
    })

    targetEl = wrapper.get('[data-test="target"]').element
    dragEl = wrapper.get('[data-test="drag"]').element
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should apply transform style on drag', async () => {
    const mousedown = new MouseEvent('mousedown', {
      clientX: 100,
      clientY: 100,
      bubbles: true
    })

    const mousemove = new MouseEvent('mousemove', {
      clientX: 150,
      clientY: 150,
      bubbles: true
    })

    const mouseup = new MouseEvent('mouseup', {
      bubbles: true
    })

    dragEl.dispatchEvent(mousedown)
    document.dispatchEvent(mousemove)
    document.dispatchEvent(mouseup)

    await nextTick()

    expect(targetEl.style.transform).toBe('translate(50px, 50px)')
  })

  it('should reset transform on resetPosition', async () => {
    // 模拟一次拖拽
    dragEl.dispatchEvent(
      new MouseEvent('mousedown', { clientX: 100, clientY: 100, bubbles: true })
    )
    document.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 200, clientY: 200, bubbles: true })
    )
    document.dispatchEvent(new MouseEvent('mouseup'))

    await nextTick()

    // transform 应被设置
    expect(targetEl.style.transform).not.toBe('')

    // 点击 reset 按钮
    await wrapper.get('[data-test="reset"]').trigger('click')

    expect(targetEl.style.transform).toBe('')
  })

  it('should respect overflow = false and limit movement within viewport', async () => {
    dragEl.dispatchEvent(
      new MouseEvent('mousedown', { clientX: 100, clientY: 100, bubbles: true })
    )
    // 大幅拖动到边界之外
    document.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 1000,
        clientY: 1000,
        bubbles: true
      })
    )
    document.dispatchEvent(new MouseEvent('mouseup'))

    await nextTick()

    // 最大 X 偏移应为 500 (800 - 100 - 200)
    expect(targetEl.style.transform).toBe('translate(500px, 400px)')
  })

  it('should clamp Y movement correctly when target is taller than viewport', async () => {
    getBoundingClientRectMock.mockReturnValueOnce({
      left: 0,
      top: 0,
      width: 200,
      height: 700, // taller than viewport (600)
      right: 200,
      bottom: 700,
      x: 0,
      y: 0,
      toJSON: () => {
        // noop
      }
    })

    // 强制更新 DOM Rect
    await wrapper.get('[data-test="update"]').trigger('click')

    dragEl.dispatchEvent(
      new MouseEvent('mousedown', { clientX: 100, clientY: 100, bubbles: true })
    )
    document.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 150,
        clientY: 1000,
        bubbles: true
      })
    )
    document.dispatchEvent(new MouseEvent('mouseup'))

    await nextTick()

    expect(targetEl.style.transform).toBe('translate(50px, 400px)')
  })

  it('should update position correctly on window resize', async () => {
    dragEl.dispatchEvent(
      new MouseEvent('mousedown', { clientX: 100, clientY: 100, bubbles: true })
    )
    document.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 200, clientY: 200, bubbles: true })
    )
    document.dispatchEvent(new MouseEvent('mouseup'))

    await nextTick()

    expect(targetEl.style.transform).toBe('translate(100px, 100px)')

    await wrapper.get('[data-test="update"]').trigger('click')
    expect(targetEl.style.transform).toBe('translate(100px, 100px)')
  })
})
