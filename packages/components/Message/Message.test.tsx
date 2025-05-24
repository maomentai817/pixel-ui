import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
//@ts-ignore
import { message, closeAll } from './methods'

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

describe.skip('Message component', () => {
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
    expect(getTopValue(elements[1])).toBe(50)
  })
})
