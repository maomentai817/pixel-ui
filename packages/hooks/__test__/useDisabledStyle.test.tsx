import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { describe, it, expect } from 'vitest'
import useDisabledStyle from '../useDisabledStyle'

describe('useDisabledStyle', () => {
  it('applies disabled style to all children when disabled=true', async () => {
    const Comp = defineComponent({
      props: { disabled: Boolean },
      setup(_props, { slots }) {
        useDisabledStyle()
        return () => h('div', {}, slots.default?.())
      }
    })

    mount(Comp, {
      props: { disabled: true },
      slots: {
        default: () => [h('span', { style: { fontSize: '14px' } }, 'Text')]
      }
    })
  })

  it('restores styles when disabled changes from true to false', async () => {
    const Comp = defineComponent({
      props: { disabled: Boolean },
      setup(_props, { slots }) {
        useDisabledStyle()
        return () => h('div', {}, slots.default?.())
      }
    })

    const wrapper = mount(Comp, {
      props: { disabled: true }, // 初始状态为disabled=true
      slots: {
        default: () => [h('span', { style: { fontSize: '14px' } }, 'Text')]
      }
    })

    // 先将disabled设为true，确保样式被应用
    await nextTick()
    let spanVNode = wrapper.vm.$slots.default?.()[0]

    // 更新props，将disabled设为false
    await wrapper.setProps({ disabled: false })
    await nextTick()

    spanVNode = wrapper.vm.$slots.default?.()[0]
    // 验证样式已恢复，禁用样式被移除
    expect(spanVNode?.props?.style).toMatchObject({
      fontSize: '14px'
    })
    expect(spanVNode?.props?.style?.cursor).toBeUndefined()
    expect(spanVNode?.props?.style?.color).toBeUndefined()
  })

  it('handles empty children when disabled=true', async () => {
    const Comp = defineComponent({
      props: { disabled: Boolean },
      setup() {
        useDisabledStyle()
        return () => h('div') // 无子节点
      }
    })

    const wrapper = mount(Comp, {
      props: { disabled: true }
    })

    // 验证不会抛出错误
    expect(wrapper.html()).toMatchInlineSnapshot(`"<div></div>"`)
  })

  it('handles empty children when disabled=false', async () => {
    const Comp = defineComponent({
      props: { disabled: Boolean },
      setup() {
        useDisabledStyle()
        return () => h('div') // 无子节点
      }
    })

    const wrapper = mount(Comp, {
      props: { disabled: false }
    })

    // 验证不会抛出错误
    expect(wrapper.html()).toMatchInlineSnapshot(`"<div></div>"`)
  })

  it('restores original style when disabled=false', async () => {
    const Comp = defineComponent({
      props: { disabled: Boolean },
      setup(_props, { slots }) {
        useDisabledStyle()
        return () => h('div', {}, slots.default?.())
      }
    })

    const wrapper = mount(Comp, {
      props: { disabled: false },
      slots: {
        default: () => [h('span', { style: { fontSize: '14px' } }, 'Text')]
      }
    })

    const spanVNode = wrapper.vm.$slots.default?.()[0]

    expect(spanVNode?.props?.style).toMatchObject({
      fontSize: '14px'
    })
    expect(spanVNode?.props?.style?.cursor).toBeUndefined()
    expect(spanVNode?.props?.style?.color).toBeUndefined()
  })
})
