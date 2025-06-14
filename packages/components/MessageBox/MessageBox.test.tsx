import { describe, it, expect, vi } from 'vitest'
import { h, createApp, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { rAF } from '@pixel-ui/utils'

import type { MessageBoxType } from './types'
import MessageBox from './methods'
import PxMessageBox from '.'
import MessageBoxSFC from './MessageBox.vue'

describe('MessageBox Component', () => {
  it('renders correctly', async () => {
    const props = {
      title: 'Test Title',
      message: 'Test Message',
      showClose: true,
      closeOnClickModal: true,
      showConfirmButton: true
    }

    MessageBox(props)
    await rAF()
    const header = document.querySelector('.px-message-box__header')
    const title = document.querySelector('.px-message-box__title')
    const message = document.querySelector('.px-message-box__message')

    expect(title).toBeTruthy()
    expect(header).toBeTruthy()
    expect(message).toBeTruthy()

    MessageBox.close()
  })

  it('closes on close button click', async () => {
    const props = {
      title: 'Test Title',
      message: 'Test Message',
      showClose: true
    }

    const doAction = vi.fn()
    MessageBox(props).catch((action) => doAction(action))
    await rAF()

    const closeBtn = document.querySelector(
      '.px-message-box__header-btn'
    ) as HTMLButtonElement
    closeBtn.click()

    await rAF()

    expect(doAction).toHaveBeenCalledWith('close')
  })

  it('triggers confirm action on confirm button click', async () => {
    const props = {
      title: 'Test Title',
      message: 'Test Message',
      showConfirmButton: true,
      showCancelButton: false
    }

    const doAction = vi.fn()
    MessageBox(props).then((action) => doAction(action))
    await rAF()

    const confirmBtn = document.querySelector(
      '.px-message-box__confirm-btn'
    ) as HTMLButtonElement
    confirmBtn.click()
    await rAF()

    expect(doAction).toBeCalledWith('confirm')
  })

  it('triggers cancel action on cancel button click', async () => {
    const props = {
      title: 'Test Title',
      message: 'Test Message',
      showConfirmButton: true,
      showCancelButton: true
    }

    const doAction = vi.fn()
    MessageBox(props).catch((action) => doAction(action))
    await rAF()

    const cancelBtn = document.querySelector(
      '.px-message-box__cancel-btn'
    ) as HTMLButtonElement
    cancelBtn.click()

    await rAF()

    expect(doAction).toHaveBeenCalledWith('cancel')
  })

  it('handles input in prompt mode', async () => {
    const props = {
      title: 'Test Title',
      message: 'Test Message',
      boxType: 'prompt' as MessageBoxType,
      showInput: true
    }

    const doAction = vi.fn()
    MessageBox(props).then((res) => doAction(res))
    await rAF()

    const input = document.querySelector('input') as HTMLInputElement
    input.value = 'Test Input'
    input.dispatchEvent(new Event('input'))

    const confirmBtn = document.querySelector(
      '.px-message-box__confirm-btn'
    ) as HTMLButtonElement
    confirmBtn.click()

    await rAF()

    expect(doAction).toHaveBeenCalledWith({
      value: 'Test Input',
      action: 'confirm'
    })
  })

  it('click mask to close it', async () => {
    const props = {
      title: '',
      message: '',
      showClose: false,
      closeOnClickModal: true,
      showConfirmButton: true,
      confirmButtonType: 'warning' as const,
      beforeClose: null as any
    }

    const res = MessageBox(props)
    await rAF()

    const outside = document.querySelector(
      '.px-overlay-message-box'
    ) as HTMLElement
    outside.click()

    await expect(res).rejects.toThrow('close')
  })

  it('enter to submit form', async () => {
    const props = {
      title: null as any,
      message: 'Test Message',
      showClose: true,
      closeOnClickModal: true,
      showConfirmButton: false,
      showCancelButton: true,
      showInput: true,
      inputType: 'textarea' as const
    }

    MessageBox(props)
    await rAF()

    MessageBox.close()
  })

  it('handleInputEnter triggers confirm action on Enter key', async () => {
    const wrapper = mount(MessageBoxSFC, {
      props: {
        visible: ref(true),
        showInput: true,
        inputType: 'text',
        doAction: vi.fn(),
        doClose: vi.fn(),
        destroy: vi.fn()
      }
    })

    const input = wrapper.find('input')
    await input.trigger('keyup.enter')

    // 断言 doAction 被调用，且参数是 'confirm'
    expect(wrapper.props().doAction).toHaveBeenCalledWith('confirm', '')
  })

  it('should do nothing when press enter with textarea', async () => {
    const wrapper = mount(MessageBoxSFC, {
      props: {
        visible: ref(true),
        showInput: true,
        inputType: 'textarea',
        doAction: vi.fn(),
        doClose: vi.fn(),
        destroy: vi.fn()
      }
    })

    const textarea = wrapper.find('textarea')
    await textarea.trigger('keyup.enter')
  })

  it('should be prevented when press enter on button', async () => {
    const wrapper = mount(MessageBoxSFC, {
      props: {
        visible: ref(true),
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonType: null as any,
        beforeClose: () => false,
        doAction: vi.fn(),
        doClose: vi.fn(),
        destroy: vi.fn()
      }
    })

    const cancelBtn = wrapper.find('.px-message-box__cancel-btn')
    const confirmBtn = wrapper.find('.px-message-box__confirm-btn')

    await cancelBtn.trigger('keydown.enter')
    await confirmBtn.trigger('keydown.enter')
  })

  it('mount SFC component', async () => {
    MessageBox({
      title: 'Message',
      message: h('p', null, [
        h('span', null, 'Message can be '),
        h('i', { style: 'color: teal' }, 'VNode')
      ]),
      showInput: true,
      inputValue: 'test'
    })
    MessageBox({
      title: 'Message',
      message: () => h('span', null, 'Message can be ')
    })
    MessageBox.prompt('Place input your name', 'Tip', {
      type: 'info'
    })
      .then(({ value }) => {
        alert(`your name is: ${value}`)
      })
      .catch((action) => {
        alert(`action: ${action}`)
      })
    MessageBox.alert('This is a message', 'Title')
    MessageBox.alert('This is a message')
    MessageBox.alert('This is a message', {})
    MessageBox('test')
    MessageBox({
      callback: (action) => {
        alert(`action: ${action}`)
      }
    })

    MessageBox.confirm(
      'proxy will permanently delete the file. Continue?',
      'Warning',
      {
        type: 'warning',
        center: true,
        showCancelButton: false,
        showConfirmButton: true,
        // 这里展示一下 不用 Promise 写法的时候
        callback(action) {
          if (action === 'confirm') {
            alert(action)
          } else {
            alert(action as string)
          }
        }
      }
    )
  })
})

describe('PxMessageBox Plugin', () => {
  it('should install and provide global methods', () => {
    const app = createApp({})
    app.use(PxMessageBox)

    expect(app.config.globalProperties.$msgbox).toBe(PxMessageBox)
    expect(app.config.globalProperties.$messagebox).toBe(PxMessageBox)
    expect(app.config.globalProperties.$alert).toBe(PxMessageBox.alert)
    expect(app.config.globalProperties.$confirm).toBe(PxMessageBox.confirm)
    expect(app.config.globalProperties.$prompt).toBe(PxMessageBox.prompt)
  })

  it('should export the correct API', () => {
    expect(PxMessageBox).toHaveProperty('alert')
    expect(PxMessageBox).toHaveProperty('confirm')
    expect(PxMessageBox).toHaveProperty('prompt')
    expect(typeof PxMessageBox.alert).toBe('function')
  })
})
