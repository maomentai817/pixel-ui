// configs/sidebar.ts
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = [
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
]