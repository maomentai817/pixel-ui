import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, createApp } from 'vue'

import { withInstall, withInstallFunction } from '../install'

const AppComp = defineComponent({
  setup() {
    return () => <div>App</div>
  }
})

const compA = withInstall(
  defineComponent({
    name: 'CompA',
    setup() {
      return () => <div>CompA</div>
    }
  })
)

const compB = withInstall(
  defineComponent({
    name: 'CompB',
    setup() {
      return () => <div>CompB</div>
    }
  })
)

describe('install', () => {
  it('withInstall should be worked', () => {
    const wrapper = mount(() => <div id="app"></div>)
    const app = createApp(AppComp)

    app.use(compA).mount(wrapper.element)

    expect(compA.install).toBeDefined()
    expect(compB.install).toBeDefined()
    expect(app._context.components['CompA']).toBeTruthy()
    expect(app._context.components['CompB']).toBeFalsy()
  })
})

const Message = () => 'Hello from Message'

describe('withInstallFunction', () => {
  it('should register function to app.config.globalProperties', () => {
    const app = createApp(defineComponent({}))
    const PxMessage = withInstallFunction(Message, '$message')

    expect(PxMessage.install).toBeDefined()

    // 模拟注册
    app.use(PxMessage)

    // 断言 globalProperties 上有 $message 并等于原始函数
    expect(app.config.globalProperties.$message).toBe(Message)

    // 可选：调用测试
    expect(app.config.globalProperties.$message()).toBe('Hello from Message')
  })
})
