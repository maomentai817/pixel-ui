import type { Preview } from '@storybook/vue3'

import "@hackernoon/pixel-icon-library/fonts/iconfont.css"
import '@mmt817/pixel-ui/dist/theme/index.css'
import { registerPaintWorklets } from '@mmt817/pixel-ui'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

// 预加载注册 paintWorklets
registerPaintWorklets()

export default preview
