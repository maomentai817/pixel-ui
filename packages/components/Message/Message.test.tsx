import { describe, test, expect, it, beforeEach } from 'vitest'
import { h } from 'vue'
import message, { closeAll } from './methods'
import { withInstallFunction, rAF } from '@pixel-ui/utils'
import { PxMessage } from '.'

import Message from './Message.vue'
import { mount } from '@vue/test-utils'

const getTopValue = (el: Element): number => {
  const styles = window.getComputedStyle(el)
  const topValue = styles.getPropertyValue('top')
  return Number.parseFloat(topValue)
}

describe('Message component', () => {
  beforeEach(() => {
    // 全部关闭
    closeAll()
  })
  // 插件式调用
  test('message() function', async () => {
    const handler = message({ message: 'hello msg', duration: 0 })
    await rAF()
    expect(document.querySelector('.px-message')).toBeTruthy()

    handler.close()
    await rAF()
    expect(document.querySelector('.px-message')).toBeFalsy()
  })

  // 多次调用, closeAll() 测试
  test('call message() function more than once', async () => {
    message({ message: 'hello msg1', duration: 0 })
    message({ message: 'hello msg2', duration: 0 })
    await rAF()
    expect(document.querySelectorAll('.px-message').length).toBe(2)

    // 全部关闭
    closeAll()
    await rAF()
    expect(document.querySelector('.px-message')).toBeFalsy()
  })

  // 多次调用, 偏移量计算
  test('message offset', async () => {
    message({ message: 'hello msg1', duration: 0, offset: 100 })
    message({ message: 'hello msg2', duration: 0, offset: 50 })

    await rAF()
    const elements = document.querySelectorAll('.px-message')
    expect(elements.length).toBe(2)

    expect(getTopValue(elements[0])).toBe(100)
    expect(getTopValue(elements[1])).toBe(150)
  })

  // message 挂载自动关闭
  it('message auto close', async () => {
    message({ message: 'hello msg1', duration: 1000, offset: 100 })
    await rAF()
    expect(document.querySelectorAll('.px-message').length).toBe(1)
  })

  // ESC 键关闭
  it('should close message on Escape key press', async () => {
    message({ message: 'press ESC', duration: 0 })
    await rAF()

    expect(document.querySelector('.px-message')).toBeTruthy()

    const escEvent = new KeyboardEvent('keydown', { code: 'Escape' })
    document.dispatchEvent(escEvent)
    await rAF()

    expect(document.querySelector('.px-message')).toBeFalsy()
  })

  // 鼠标进出行为
  it('pause and resume timer on hover', async () => {
    message({
      message: 'pause on hover',
      duration: 1000,
      type: 'undefined' as any
    })
    await rAF()

    const el = document.querySelector('.px-message')!
    el.dispatchEvent(new Event('mouseenter'))
  })

  // VNode 测试
  it('should render VNode message', async () => {
    message({
      message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
        h('span', null, 'Message can be '),
        h('i', { style: 'color: teal' }, 'VNode')
      ])
    })

    await rAF()
  })

  test('closeAll with specific type', async () => {
    message({ message: 'info', type: 'info', duration: 0 })
    message({ message: 'error', type: 'error', duration: 0 })
    await rAF()
    expect(document.querySelectorAll('.px-message').length).toBe(2)

    closeAll('info')
    await rAF()
    const msgs = [...document.querySelectorAll('.px-message')]
    expect(msgs.some((el) => el.textContent?.includes('info'))).toBe(false)
  })

  test('message.error shortcut works', async () => {
    message.error('error msg')
    await rAF()
    expect(document.querySelector('.px-message')?.textContent).toContain(
      'error msg'
    )
  })

  it('RenderVNode works when vNode is undefined', async () => {
    mount(Message, {
      props: {
        id: 'test',
        zIndex: 1000,
        onDestory: () => {
          // noop
        }
      }
    })
  })
})

// Message 指令式挂载测试
describe('Message/index', () => {
  // 测试 withInstallFunction 函数是否被正确应用
  it('should be exported with withInstallFunction()', () => {
    expect(PxMessage.install).toBeDefined()
  })

  // 可选: 如果 withInstallFunction 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedMessage = withInstallFunction(Message, '$message')
    // eg: withInstallFunction 增加了一个特定的方法或属性
    expect(enhancedMessage).toHaveProperty('install')
  })
})
