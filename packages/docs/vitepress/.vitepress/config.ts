import { defineConfig } from 'vitepress'
import { nav, sidebar, mdPlugin, viteConfig, head } from './configs'

export default defineConfig({
  title: 'Pixel UI',
  description: '基于CSS_Houdini的像素风组件库🐱',
  base: '/pixel-ui/',
  appearance: false,
  head,
  themeConfig: {
    // 导航栏
    nav,
    // 侧边栏
    sidebar,
    logo: '/images/homelogo.png',
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: 'CONTENTS'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/maomentai817/pixel-ui' }
    ]
  },
  markdown: {
    config: (md) => mdPlugin(md)
  },
  transformHead({ assets }) {
    // 字体匹配
    const fontFiles = assets.filter((file) =>
      /(PS2P|Zpix)\.\w+\.ttf$/.test(file)
    )

    return fontFiles.map((file) => [
      'link',
      {
        rel: 'preload',
        href: file,
        as: 'font',
        type: 'font/woff2',
        crossorigin: ''
      }
    ])
  },
  vite: viteConfig
})
