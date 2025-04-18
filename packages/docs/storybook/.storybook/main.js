/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../stories/*.mdx', '../stories/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/experimental-addon-test'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  }
}
export default config
