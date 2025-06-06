import { describe, it, expect, vi } from 'vitest'
import { h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useFocusController } from '../useFocusController'

describe('useFocusController', () => {
  it('should update isFocused when focus and blur events occur', async () => {
    const Comp = {
      setup() {
        const inputRef = ref<HTMLInputElement>()
        // 回调
        const afterFocus = () => {
          // noop
        }
        const beforeBlur = () => {
          // noop
        }
        const afterBlur = () => {
          // noop
        }

        const { wrapperRef, isFocused, handleFocus, handleBlur } =
          useFocusController(inputRef, { afterFocus, beforeBlur, afterBlur })

        return () =>
          h('div', { ref: wrapperRef }, [
            h('input', {
              ref: inputRef,
              onFocus: handleFocus,
              onBlur: handleBlur,
              'data-test': 'input'
            }),
            h(
              'span',
              { 'data-test': 'status' },
              isFocused.value ? 'focused' : 'blurred'
            )
          ])
      }
    }

    const wrapper = mount(Comp)
    const input = wrapper.get('[data-test="input"]')
    const status = () => wrapper.get('[data-test="status"]').text()

    // 初始状态
    expect(status()).toBe('blurred')

    // 聚焦
    await input.trigger('focus')
    expect(status()).toBe('focused')

    // 重复聚焦
    await input.trigger('focus')
    expect(status()).toBe('focused')

    // 失焦
    await input.trigger('blur', {
      relatedTarget: null
    })
    expect(status()).toBe('blurred')

    // 点击
    await input.trigger('click')
  })

  it('should call blur logic when beforeBlur is not a function', async () => {
    const afterBlurMock = vi.fn()

    const Comp = {
      setup() {
        const inputRef = ref<HTMLInputElement>()
        // 回调

        const { wrapperRef, isFocused, handleFocus, handleBlur } =
          useFocusController(inputRef, {
            beforeBlur: undefined as any,
            afterBlur: afterBlurMock
          })

        return () =>
          h('div', { ref: wrapperRef }, [
            h('input', {
              ref: inputRef,
              onFocus: handleFocus,
              onBlur: handleBlur,
              'data-test': 'input'
            }),
            h(
              'span',
              { 'data-test': 'status' },
              isFocused.value ? 'focused' : 'blurred'
            )
          ])
      }
    }

    const wrapper = mount(Comp)
    const input = wrapper.get('[data-test="input"]')
    const status = () => wrapper.get('[data-test="status"]').text()

    // 聚焦
    await input.trigger('focus')
    expect(status()).toBe('focused')

    // blur 时因为 beforeBlur 是 undefined, 应继续执行逻辑
    await input.trigger('blur', { relatedTarget: null })
    expect(status()).toBe('blurred')
  })

  it('should cancel blur when beforeBlur returns true', async () => {
    const afterBlurMock = vi.fn()

    const Comp = {
      setup() {
        const inputRef = ref<HTMLInputElement>()

        const { wrapperRef, isFocused, handleFocus, handleBlur } =
          useFocusController(inputRef, {
            beforeBlur: () => true, // 阻止 blur
            afterBlur: afterBlurMock
          })

        return () =>
          h('div', { ref: wrapperRef }, [
            h('input', {
              ref: inputRef,
              onFocus: handleFocus,
              onBlur: handleBlur,
              'data-test': 'input'
            }),
            h(
              'span',
              { 'data-test': 'status' },
              isFocused.value ? 'focused' : 'blurred'
            )
          ])
      }
    }

    const wrapper = mount(Comp)
    const input = wrapper.get('[data-test="input"]')

    await input.trigger('focus')
    expect(wrapper.get('[data-test="status"]').text()).toBe('focused')

    await input.trigger('blur', { relatedTarget: null })
    // 因为 beforeBlur 返回 true，所以 isFocused 仍然是 true
    expect(wrapper.get('[data-test="status"]').text()).toBe('focused')
    expect(afterBlurMock).not.toHaveBeenCalled()
  })

  it('should cancel blur when relatedTarget is inside wrapperRef', async () => {
    const afterBlurMock = vi.fn()

    const Comp = {
      setup() {
        const inputRef = ref<HTMLInputElement>()
        const nextButtonRef = ref<HTMLButtonElement>()

        const { wrapperRef, isFocused, handleFocus, handleBlur } =
          useFocusController(inputRef, {
            afterBlur: afterBlurMock
          })

        return () =>
          h('div', { ref: wrapperRef }, [
            h('input', {
              ref: inputRef,
              onFocus: handleFocus,
              onBlur: handleBlur,
              'data-test': 'input'
            }),
            h(
              'button',
              {
                ref: nextButtonRef,
                'data-test': 'next'
              },
              'Next'
            ),
            h(
              'span',
              { 'data-test': 'status' },
              isFocused.value ? 'focused' : 'blurred'
            )
          ])
      }
    }

    const wrapper = mount(Comp)
    const input = wrapper.get('[data-test="input"]')
    const nextBtn = wrapper.get('[data-test="next"]')

    // 聚焦
    await input.trigger('focus')
    expect(wrapper.get('[data-test="status"]').text()).toBe('focused')

    // blur，且 relatedTarget 是 wrapperRef 内的 button
    await input.trigger('blur', {
      relatedTarget: nextBtn.element
    })

    // 不应执行 blur 操作
    expect(wrapper.get('[data-test="status"]').text()).toBe('focused')
    expect(afterBlurMock).not.toHaveBeenCalled()
  })
})
