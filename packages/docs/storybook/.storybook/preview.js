import "@hackernoon/pixel-icon-library/fonts/iconfont.css"
import '@mmt817/pixel-ui/dist/theme/index.css'
/** @type { import('@storybook/vue3').Preview } */
const preview = {
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
