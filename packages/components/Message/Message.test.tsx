import { describe, test, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { message, closeAll } from './methods'
import { withInstallFunction } from '@pixel-ui/utils'
import { PxMessage } from '.'

import Message from './Message.vue'

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

const getTopValue = (el: Element): number => {
  const styles = window.getComputedStyle(el)
  const topValue = styles.getPropertyValue('top')
  return Number.parseFloat(topValue)
}

describe('Message component', () => {
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
