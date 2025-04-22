import { type App, watch } from "vue"
import { type Router } from "vitepress"
import { ElementPlusContainer } from "vitepress-preview-component"
import DefaultTheme from "vitepress/theme"
import PixelUI from "@mmt817/pixel-ui"

import "vitepress-preview-component/style.css"
import '@hackernoon/pixel-icon-library/fonts/iconfont.css'
import '@mmt817/pixel-ui/dist/index.css'
import 'virtual:uno.css'
import './index.css'

let homePageStyle: HTMLStyleElement | undefined

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }: { app: App, router: Router }) {
    app.component("demo-preview", ElementPlusContainer)
    app.use(PixelUI)

    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/pixel-ui/'),
        { immediate: true },
      )
    }
  },
}

// 彩虹背景动画样式控制
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle)
      return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  }
  else {
    if (!homePageStyle)
      return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
