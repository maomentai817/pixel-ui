import { ComponentPublicInstance, createApp } from 'vue'

import MessageNotice from './message-notice.vue'

const messageNoticeInstanceList: ComponentPublicInstance[] = []

const MessageNoticeService = {
  open: () => {
    // 创建一个div元素
    const messageBox = document.createElement('div')
    // 创建一个应用实例
    const messageApp = createApp(MessageNotice, {
      content: '复制成功！',
      close: () => {
        document.body.removeChild(messageBox)
        messageNoticeInstanceList.pop()
        messageApp.unmount()
      }
    })
    const messageInstance = messageApp.mount(messageBox)
    document.body.appendChild(messageBox)
    const messageNoticeInstanceListLength = messageNoticeInstanceList.length
    const topHeight =
      messageNoticeInstanceListLength === 0
        ? 10
        : (messageNoticeInstanceListLength + 1) * 10 + messageNoticeInstanceListLength * 42
    // @ts-ignore
    messageInstance.setTopHeight(topHeight)
    // @ts-ignore
    messageInstance.setVisible(true)
    messageNoticeInstanceList.push(messageInstance)
  }
}

export { MessageNotice, MessageNoticeService }
