import { defineConfig } from "vitepress"
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin"
import UnoCSS from 'unocss/vite'
// import apiTable from "vitepress-api-table"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Pixel UI",
  description: "基于CSS_Houdini的像素风组件库🐱",
  base: "/pixel-ui/",
  appearance: false,
  head: [
    ['link', { rel: 'icon', href: 'images/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "开始使用", link: "/get-started" },
      { text: "组件", link: "/components/button" },
    ],
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "指南",
        collapsed: false,
        items: [{ text: "快速开始", link: "/get-started" }],
      },
      {
        text: "Basic 基础组件",
        collapsed: false,
        items: [
          { text: "Button 按钮", link: "components/button" },
          { text: "Icon 图标", link: "components/icon" },
          { text: "Text 文本", link: "components/text" },
        ],
      },
      {
        text: "Data 数据展示",
        collapsed: false,
        items: [
          { text: "Card 卡片", link: "components/card" }
        ]
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/maomentai817/pixel-ui" },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
      // md.use(apiTable)
    },
  },
  transformHead({ assets }) { 
    // 字体匹配
    const fontFiles = assets.filter(file => /(PS2P|Zpix)\.\w+\.ttf$/.test(file))

    return fontFiles.map(file => [
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
  vite: {
    plugins: [
      UnoCSS(),
    ]
  }
});