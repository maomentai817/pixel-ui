import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/experimental-addon-test'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      // docgen: 'vue-component-meta'
    }
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@pixel-ui/components': fileURLToPath(
            new URL('../../../components', import.meta.url)
          )
        }
      },
      define: {
        ...(config.define || {}),
        TEST: false // 在 Storybook 环境中显式定义 TEST
      }
    })
  }
}
export default config
