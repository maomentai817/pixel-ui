import { describe, test, expect, it, beforeEach, vi } from 'vitest'
import { nextTick, h } from 'vue'
import { mount } from '@vue/test-utils'
import notification, { closeAll } from './methods'
import { withInstallFunction } from '@pixel-ui/utils'
import { PxNotification } from '.'

import Notification from './Notification.vue'

export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}
function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue('top')
  return Number.parseFloat(topValue)
}

describe('Notification component', () => {
  beforeEach(() => {
    // 全部关闭
    closeAll()
  })
  // 插件式调用
  test('notification() function', async () => {
    const handler = notification({
      title: 'test',
      message: 'hello notify',
      duration: 0,
      position: 'top-right'
    })
    await rAF()
    expect(document.querySelector('.px-notification')).toBeTruthy()

    handler.close()
    await rAF()
    expect(document.querySelector('.px-notification')).toBeFalsy()
  })

  // 多次调用, closeAll() 测试
  test('call notification() function more than once', async () => {
    notification({
      title: 'test',
      message: 'hello notify1',
      duration: 0,
      position: 'top-right'
    })
    notification({
      title: 'test',
      message: 'hello notify2',
      duration: 0,
      position: 'top-right'
    })

    await rAF()
    expect(document.querySelectorAll('.px-notification').length).toBe(2)

    // 全部关闭
    notification.closeAll()
    await rAF()
    expect(document.querySelectorAll('.px-notification').length).toBe(0)
  })

  // 多次调用, 偏移量计算
  test('notification offset', async () => {
    notification({
      title: 'test',
      message: 'hello notify1',
      duration: 0,
      offset: 100,
      position: 'top-right'
    })
    notification({
      title: 'test',
      message: 'hello notify2',
      duration: 0,
      offset: 50,
      position: 'top-right'
    })

    await rAF()
    const elements = document.querySelectorAll('.px-notification')
    expect(elements.length).toBe(2)

    expect(getTopValue(elements[0])).toBe(100)
    expect(getTopValue(elements[1])).toBe(150)
  })

  // notification 挂载自动关闭
  it('notification auto close', async () => {
    notification({
      title: 'test',
      message: 'hello msg1',
      duration: 1000,
      offset: 100,
      position: 'top-right'
    })
    await rAF()
    expect(document.querySelectorAll('.px-notification').length).toBe(1)
  })

  // 鼠标进出行为
  it('pause and resume timer on hover', async () => {
    notification({
      title: 'test',
      message: 'pause on hover',
      duration: 1000,
      type: 'undefined' as any,
      position: 'top-right'
    })
    await rAF()

    const el = document.querySelector('.px-notification')!
    el.dispatchEvent(new Event('mouseenter'))
  })

  // VNode 测试
  it('should render VNode notification', async () => {
    notification({
      title: 'test',
      message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
        h('span', null, 'Notification can be '),
        h('i', { style: 'color: teal' }, 'VNode')
      ])
    })

    await rAF()
  })

  test('closeAll with specific type', async () => {
    notification({
      title: 'test',
      message: 'info',
      type: 'info',
      duration: 0,
      position: 'top-right'
    })
    notification({
      title: 'test',
      message: 'error',
      type: 'error',
      duration: 0,
      position: 'top-right'
    })
    await rAF()
    expect(document.querySelectorAll('.px-notification').length).toBe(2)

    closeAll('info')
    await rAF()
    const msgs = [...document.querySelectorAll('.px-notification')]
    expect(msgs.some((el) => el.textContent?.includes('info'))).toBe(false)
  })

  test('notification.error shortcut works', async () => {
    notification.error('error msg')
    await rAF()
    expect(document.querySelector('.px-notification')?.textContent).toContain(
      'error msg'
    )
  })

  it('RenderVNode works when vNode is undefined', async () => {
    mount(Notification, {
      props: {
        title: 'test',
        id: 'test',
        position: '' as any,
        zIndex: 1000,
        message: undefined,
        duration: 0,
        showClose: false,
        offset: 0,
        transitionName: '',
        icon: '',
        onClick: () => {
          // noop
        },
        onClose: () => {
          // noop
        },
        onDestory: () => {
          // noop
        }
      }
    })
  })

  // onClick 回调
  it('should trigger onClick callback', async () => {
    const onClick = vi.fn()
    notification({
      title: 'test',
      message: 'click me',
      duration: 0,
      position: 'top-right',
      onClick
    })

    await rAF()
    const el = document.querySelector('.px-notification') as HTMLElement
    el.click()
    expect(onClick).toHaveBeenCalled()
  })

  // onClose 回调
  it('should trigger onClose callback when closed', async () => {
    const onClose = vi.fn()
    const handler = notification({
      title: 'test',
      message: 'close test',
      duration: 0,
      position: 'top-right',
      onClose
    })
    await rAF()
    handler.close()
    await rAF()
    expect(onClose).toHaveBeenCalled()
  })
})

// Notification 指令式挂载测试
describe('Notification/index', () => {
  // 测试 withInstallFunction 函数是否被正确应用
  it('should be exported with withInstallFunction()', () => {
    expect(PxNotification.install).toBeDefined()
  })

  // 可选: 如果 withInstallFunction 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedNotification = withInstallFunction(Notification, '$notify')
    // eg: withInstallFunction 增加了一个特定的方法或属性
    expect(enhancedNotification).toHaveProperty('install')
  })
})
