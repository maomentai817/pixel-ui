import type { Preview } from '@storybook/vue3'

import "@hackernoon/pixel-icon-library/fonts/iconfont.css"
import '@mmt817/pixel-ui/dist/theme/index.css'

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

export default preview
