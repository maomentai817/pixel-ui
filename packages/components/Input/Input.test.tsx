import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Input from './Input.vue'

describe('Input.vue', () => {
  test('render', () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        size: 'small',
        modelValue: 'test'
      },
      slots: {
        prepend: 'prepend',
        append: 'append',
        suffix: 'suffix',
        prefix: 'prefix'
      }
    })
    // 针对动态 class 的测试
    expect(wrapper.classes()).toContain('px-input')
    expect(wrapper.classes()).toContain('px-input--small')
    expect(wrapper.classes()).toContain('px-input--text')

    expect(wrapper.classes()).toContain('is-prefix')
    expect(wrapper.classes()).toContain('is-prepend')

    // 正确的标签和节点
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')

    // 针对 slots 的测试
    expect(wrapper.find('.px-input__prepend').exists()).toBeTruthy()
    expect(wrapper.get('.px-input__prepend').text()).toBe('prepend')

    expect(wrapper.find('.px-input__prefix').exists()).toBeTruthy()
    expect(wrapper.get('.px-input__prefix').text()).toBe('prefix')

    // 针对 v-if 的测试
    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea' as const,
        modelValue: 'test'
      }
    })

    expect(wrapper2.find('textarea').exists()).toBeTruthy()

    wrapper.unmount()
    wrapper2.unmount()
  })

  test('v-model', async () => {
    const wrapper: any = mount(Input, {
      props: {
        modelValue: 'test',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
        type: 'text'
      }
    })
    const input = wrapper.get('input')

    // 初始值
    expect(input.element.value).toBe('test')

    // 更新值
    // setValue 会触发 input 和 change 事件
    await input.setValue('test2')
    expect(wrapper.props('modelValue')).toBe('test2')
    expect(input.element.value).toBe('test2')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')

    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')

    expect(inputEvent![0]).toEqual(['test2'])
    expect(changeEvent![0]).toEqual(['test2'])

    // v-model 异步更新
    await wrapper.setProps({ modelValue: 'test3' })
    expect(input.element.value).toBe('test3')

    wrapper.unmount()
  })

  test('clearable', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })

    // 不应该出现 Icon 区域
    expect(wrapper.find('.px-input__clear').exists()).toBeFalsy()

    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')

    // 出现 Icon 区域
    expect(wrapper.find('.px-input__clear').exists()).toBeTruthy()

    // 点击 Icon 区域，触发 clear 事件
    await wrapper.get('.px-input__clear').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('clear')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')

    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')

    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])
    expect(input.element.value).toBe('')

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')

    wrapper.unmount()
  })

  test('toggle password', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        type: 'password',
        showPassword: true
      },
      global: {
        stubs: ['Icon']
      }
    })

    // 不应该出现 Icon 区域
    expect(wrapper.find('.px-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')

    expect(input.element.type).toBe('password')
    await input.setValue('123')

    const eyeIcon = wrapper.find('.px-input__password')
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.classes()).toContain('hn-eye-cross')

    // 点击 切换
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    // 缓存 Icon
    expect(wrapper.find('.px-input__password').classes()).toContain('hn-eye')

    wrapper.unmount()
  })

  // 事件触发测试
  test('should emit events', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        size: 'small',
        modelValue: 'test'
      },
      slots: {
        prepend: 'prepend',
        append: 'append',
        suffix: 'suffix',
        prefix: 'prefix'
      }
    })

    const vm = wrapper.vm

    await vm.focus()
    await vm.blur()
    await vm.select()

    wrapper.unmount()
  })

  test('textarea form and focus/blur', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'textarea', // 初始值
        type: 'textarea' as const,
        form: 'my-form' // 设置 form 属性
      }
    })

    // 检查 form 属性是否正确绑定
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('form')).toBe('my-form')

    // 测试 v-model 更新
    await textarea.setValue('new text')

    // 测试 focus 事件
    await textarea.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')

    // 测试 blur 事件
    await textarea.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')

    // 清理
    wrapper.unmount()
  })
})
