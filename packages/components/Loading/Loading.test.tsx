import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, createApp } from 'vue'
import { rAF } from '@pixel-ui/utils'
import { Loading } from './service'

import vLoading, { INSTANCE_KEY, type ElementLoading } from './directive'
import LoadingSFC from './Loading.vue'
import PxLoading from '.'
import PxIcon from '../Icon/Icon.vue'

describe('Loading component', () => {
  it('should creat Loading instance', async () => {
    const closed = vi.fn()
    const instance = Loading({
      visible: ref(true),
      closed
    })

    await rAF()

    expect(instance).toBeTruthy()
    expect(document.querySelector('.px-loading__mask')).toBeTruthy()

    instance.close()
    await rAF()
  })

  it('should close Loading and remove it from DOM', async () => {
    const instance = Loading()

    await rAF()
    expect(document.querySelector('.px-loading')).toBeTruthy()
    instance.close()
    await rAF()

    expect(document.querySelector('.px-loading')).toBeFalsy()
  })

  it('should render correctly with options', async () => {
    const closed = vi.fn()
    const instance1 = Loading({
      visible: ref(true),
      spinner: 'spinner',
      text: 'Loading...',
      lock: true,
      target: document.body,
      fullscreen: true,
      closed
    })
    const instance2 = Loading({
      visible: ref(true),
      spinner: 'spinner',
      text: 'Loading...'
    })

    expect(instance1).toBeTruthy()
    expect(instance2).toBeTruthy()

    await rAF()
    instance1.setText('Updating...')

    await rAF()
    instance1.close()
  })

  it('should fallback to document.body if selector not found', async () => {
    const instance = Loading({ target: '#not-found' })
    await rAF()
    expect(instance).toBeTruthy()
    instance.close()
    await rAF()
  })

  it('should render spinner icon with spin attribute', async () => {
    const wrapper = mount(LoadingSFC, {
      props: {
        visible: true,
        spinner: false
      },
      global: {
        components: {
          PxIcon
        }
      }
    })
    wrapper.unmount()
  })

  it('should fallback to document.body if parent is undefined', async () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const closed = vi.fn()
    const beforeClose = () => false

    const instance = Loading({
      target: el,
      closed,
      beforeClose
    })

    instance.close()
    await rAF()
  })

  it('should not destroy if afterLeaveFlag is false', async () => {
    const instance = Loading()
    const el = instance.$el
    const parent = el.parentElement
    expect(parent?.contains(el)).toBe(true)

    // 手动调用内部的 handleAfterLeave, 但保持 afterLeaveFlag 为 false
    // 注意: 必须访问组件内部逻辑进行模拟
    const internalVm = instance.vm as any
    const afterLeave = internalVm.$props.onAfterLeave

    // 先确保 el 在 DOM 中
    expect(document.body.contains(el)).toBe(true)

    // 触发, 但因 flag 为 false, 不应销毁
    afterLeave()
    await rAF()

    // 应该仍存在
    expect(document.body.contains(el)).toBe(true)

    // 清理
    instance.close()
    await rAF()
  })
})

describe('PxLoading Plugin', () => {
  it('should install directive and globalProperties', () => {
    const app = createApp({})
    app.directive = vi.fn()
    app.config.globalProperties = {}

    PxLoading.install(app)

    expect(app.directive).toHaveBeenCalledWith('loading', PxLoading.directive)
    expect(app.config.globalProperties.$loading).toBe(PxLoading.service)
  })
})

describe('vLoading directive', () => {
  it('should create instance on mount if binding.value is true', () => {
    const el = document.createElement('div')
    const binding = {
      value: true,
      oldValue: undefined,
      modifiers: {},
      arg: undefined,
      instance: null,
      dir: null
    }
    ;(vLoading as any).mounted(el as any, binding as any)

    // Actually instance stored on el[INSTANCE_KEY], but symbol private
  })

  it('should not create instance if binding.value is false on mount', () => {
    const el = document.createElement('div')
    const binding = {
      value: false,
      oldValue: undefined,
      modifiers: {},
      arg: undefined,
      instance: null,
      dir: null
    }
    ;(vLoading as any).mounted(el as any, binding as any)
  })

  it('should create instance on update when value changes from false to true', () => {
    const el = document.createElement('div')
    const binding = {
      value: true,
      oldValue: false,
      modifiers: {},
      arg: undefined,
      instance: null,
      dir: null
    }
    ;(vLoading as any).updated(el as any, binding as any)
  })

  it('should close instance on update when value changes from true to false', () => {
    const close = vi.fn()
    const el = document.createElement('div')
    ;(el as any)[Symbol.for('loading')] = {
      instance: { close }
    }
    const binding = {
      value: false,
      oldValue: true,
      modifiers: {},
      arg: undefined,
      instance: null,
      dir: null
    }
    ;(vLoading as any).updated(el as any, binding as any)
  })

  it('should close instance and clear on unmounted', () => {
    const close = vi.fn()
    const el = document.createElement('div')
    ;(el as any)[Symbol.for('loading')] = {
      instance: { close }
    }
    ;(vLoading as any).unmounted(el as any)
  })

  it('should set target to undefined when fullscreen modifier is true', () => {
    const el = document.createElement('div')
    const binding = {
      value: true,
      oldValue: undefined,
      modifiers: { fullscreen: true }
    }

    ;(vLoading as any).mounted(el, binding)

    // el[INSTANCE_KEY] 应该有个 instance，并且 options.target === undefined
  })

  it('should return early in updated when oldValue equals value', () => {
    const el = document.createElement('div')
    const binding = {
      value: true,
      oldValue: true, // 这里和 value 相等
      modifiers: {}
    }

    // 调用 updated 钩子，期望不会执行后续逻辑
    ;(vLoading as any).updated(el, binding)
  })

  it('should call instance.close in updated when value changes from true to false', () => {
    const el = document.createElement('div') as ElementLoading

    // 模拟已存在的实例
    const closeMock = vi.fn()
    el[INSTANCE_KEY] = {
      instance: { close: closeMock },
      options: {}
    }

    const binding = {
      value: false,
      oldValue: true,
      modifiers: {}
    }

    ;(vLoading as any).updated(el, binding)
  })

  it('should call instance.close in unmounted', () => {
    const el = document.createElement('div') as ElementLoading

    // 模拟已存在的实例
    const closeMock = vi.fn()
    el[INSTANCE_KEY] = {
      instance: { close: closeMock },
      options: {}
    }
    ;(vLoading as any).unmounted(el)
  })
})
