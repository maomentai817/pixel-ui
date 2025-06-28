// configs/sidebar.ts
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = [
  {
    text: '指南',
    collapsed: false,
    items: [{ text: '快速开始', link: '/get-started' }]
  },
  {
    text: 'Basic 基础组件',
    collapsed: false,
    base: '/components/',
    items: [
      { text: 'Button 按钮', link: 'button' },
      { text: 'Icon 图标', link: 'icon' },
      { text: 'Overlay 遮罩层', link: 'overlay' },
      { text: 'Text 文本', link: 'text' }
    ]
  },
  {
    text: '配置组件',
    collapsed: false,
    base: '/components/',
    items: [{ text: 'ConfigProvider 全局配置', link: 'configProvider' }]
  },
  {
    text: 'Form 表单组件',
    collapsed: false,
    base: '/components/',
    items: [
      { text: 'Input 输入框', link: 'input' },
      { text: 'Switch 开关', link: 'switch' }
    ],
  },
  {
    text: 'Data 数据展示',
    collapsed: false,
    base: '/components/',
    items: [
      { text: 'Badge 徽章', link: 'badge' },
      { text: 'Card 卡片', link: 'card' },
      { text: 'Collapse 折叠面板', link: 'collapse' },
      { text: 'Progress 进度条', link: 'progress' },
      { text: 'Tag 标签', link: 'tag' }
    ]
  },
  {
    text: 'Navigation 导航',
    collapsed: false,
    base: '/components/',
    items: [{ text: 'Dropdown 下拉菜单', link: 'dropdown' }]
  },
  {
    text: 'Feedback 反馈组件',
    collapsed: false,
    base: '/components/',
    items: [
      { text: 'Alert 提示', link: 'alert' },
      { text: 'Loading 加载', link: 'loading' },
      { text: 'Message 消息提示', link: 'message' },
      { text: 'MessageBox 消息弹出框', link: 'messageBox' },
      { text: 'Notification 通知', link: 'notification' },
      { text: 'Popconfirm 气泡确认框', link: 'popconfirm' },
      { text: 'Tooltip 文字提示', link: 'tooltip' }
    ]
  },
  {
    text: 'Fantastic 奇思妙想',
    collapsed: false,
    base: '/components/',
    items: [
      { text: 'AnimationFrame 动画帧', link: 'animationFrame' },
      { text: 'EyeDropper 取色器', link: 'eyeDropper' },
      { text: 'Image 像素滤镜', link: 'image' },
      { text: 'PixelIt 像素化', link: 'pixelit' }
    ]
  }
]
