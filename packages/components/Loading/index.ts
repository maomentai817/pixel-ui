import Loading from './service'
import vLoading from './directive'
import type { App } from 'vue'

export const PxLoading = {
  name: 'PxLoading',
  install(app: App) {
    // 指令式调用 v-loading
    app.directive('loading', vLoading)
    // 全局方法 $loading
    app.config.globalProperties.$loading = Loading
  },
  // 指令式调用
  directive: vLoading,
  // 函数式调用
  service: Loading
}

export default PxLoading

export { vLoading, vLoading as PxLoadingDirective, Loading as PxLoadingService }

export * from './types'
