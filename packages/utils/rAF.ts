import { nextTick } from 'vue'

export const rAF = async () => {
  return new Promise((res) => {
    // 等待一帧, js 清空当前执行栈
    requestAnimationFrame(() => {
      // 等待下一帧, 确保渲染完成
      requestAnimationFrame(async () => {
        res(null)
        // 确保 Vue 的 DOM 响应式更新完成
        await nextTick()
      })
    })
  })
}
