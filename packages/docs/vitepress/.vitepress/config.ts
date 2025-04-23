import { defineConfig } from "vitepress"
import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin"
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
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
    logo: '/images/homelogo.png',
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
          { text: "Badge 徽章", link: "components/badge" },
          { text: "Card 卡片", link: "components/card" },
          { text: "Collapse 折叠面板", link: "components/collapse" },
          { text: "Progress 进度条", link: "components/progress" },
        ]
      },
      {
        text: "Feedback 反馈组件",
        collapsed: false,
        items: [
          { text: "Alert 提示", link: "components/alert" },
        ]
      },
      {
        text: "Fantastic 奇思妙想",
        collapsed: false,
        items: [
          { text: "AnimationFrame", link: "components/animationFrame" },
        ]
      },
    ],
    outline: {
      level: [2, 3],
      label: "CONTENTS",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/maomentai817/pixel-ui" },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview)
      md.use(componentPreview)
      // md.use(apiTable)
      md.use(groupIconMdPlugin)
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
      groupIconVitePlugin()
    ]
  }
});