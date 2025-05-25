import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { RenderVNode } from '../'

describe('RenderVNode', () => {
  it('renders a string vnode', () => {
    const wrapper = mount(RenderVNode, {
      props: {
        vNode: 'Hello Pixel UI'
      }
    })
    expect(wrapper.text()).toBe('Hello Pixel UI')
  })

  it('renders a VNode object', () => {
    const wrapper = mount(RenderVNode, {
      props: {
        vNode: h('span', { class: 'custom' }, 'Inside Span')
      }
    })
    const span = wrapper.find('span')
    expect(span.exists()).toBe(true)
    expect(span.text()).toBe('Inside Span')
    expect(span.classes()).toContain('custom')
  })

  it('renders from a function returning vnode', () => {
    const wrapper = mount(RenderVNode, {
      props: {
        vNode: () => h('div', { class: 'dynamic' }, 'Generated VNode')
      }
    })
    const div = wrapper.find('div.dynamic')
    expect(div.exists()).toBe(true)
    expect(div.text()).toBe('Generated VNode')
  })
})
