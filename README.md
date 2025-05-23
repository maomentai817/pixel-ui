# 🐱 Pixel UI

> 🧱 A Retro Pixel-Style Component Library for Vue 3, Powered by TypeScript & CSS Houdini

<div align="center">

[![npm](https://img.shields.io/npm/v/@mmt817/pixel-ui)](https://www.npmjs.com/package/@mmt817/pixel-ui)
[![node](https://img.shields.io/badge/node-%20%3E%3D%2018-47c219)](https://github.com/maomentai817/pixel-ui)
[![downloads](https://img.shields.io/npm/dw/@mmt817/pixel-ui)](https://www.npmcharts.com/compare/@mmt817/pixel-ui)

</div>

<p align="center">Pixel UI - A Vue 3 UI library</p>

Pixel UI 是一个基于 **Vue 3** + **TypeScript** + **CSS Houdini** 打造的像素风组件库。  
从像素边框到复古字体, 力求还原游戏机时代的像素艺术，  
为现代 Web 应用注入复古科技感 🎮✨。

---
## 🌐 浏览器支持

Pixel UI 基于 CSS Houdini 实现像素风格渲染, 因此要求浏览器支持 Paint Worklet (`CSS.paintWorklet`) 能力

[![caniuse](https://img.shields.io/badge/caniuse-orange)](https://caniuse.com/?search=paint)

[![兼容表格](https://img.shields.io/badge/兼容表格-orange)](https://ishoudinireadyyet.com/?mode=light)

> **⚠️ 实验性警告**  
> `CSS.paintWorklet` 静态属性是一项**实验性技术**，在将其用于生产之前，请仔细检查[浏览器兼容性表格](https://ishoudinireadyyet.com/?mode=light)

> **🚨 安全上下文要求**  
> 此项功能仅在一些支持的浏览器的安全上下文 (HTTPS、localhost) 中可用。

## 📦 安装 Installation

```bash
# 使用 npm
npm i @mmt817/pixel-ui

# 或使用 pnpm / yarn
pnpm add @mmt817/pixel-ui
yarn add @mmt817/pixel-ui
```

## 🚀 项目启动 Quick Start

```bash
# 1. 安装依赖
pnpm i 

# 2. 项目打包
# 注意: 这里是对 hooks 及 components 分包进行打包, 请预先检查 libs 下插件是否已有打包
pnpm build

# 3. 项目运行
pnpm dev  # 启动 playground
pnpm docs:dev # 启动 vitepress 文档
pnpm docs:storybook # 启动 storybook

# 其他
pnpm test # 对 utils, hooks, components 分包进行单元测试
```

---

## ✨ 特性 Highlights

- 🎨 **Pixel-Art 风格渲染**  
  使用 CSS Houdini Paint Worklet 实现像素化边框、阴影、装饰等复古风格特效

- 🧩 **Vue 3 + TypeScript 全面支持**  
  使用 Composition API 与类型推导提升 DX，支持智能提示与类型校验

- 💡 **CSS 自定义属性调控**  
  可动态配置像素大小、颜色主题、边角样式，打造专属 UI 风格

- 🧪 **100% 覆盖率的单元测试**  
  每个组件都经过 Vitest 驱动的严格测试，保障稳定性与可维护性

- 📦 **Tree-shakable 与按需加载**  
  支持全量引入与 ES Module 按需加载，极致优化打包体积

- 📖 **双文档系统：VitePress + Storybook**  
  Markdown 文档 + 组件交互演示，一站式了解与使用

## 🔗 链接 Links

- [首页](https://maomentai817.github.io/pixel-ui/)
- [图标库](https://pixeliconlibrary.com/)
- [部分样式参考](https://nostalgic-css.github.io/NES.css/#)
- [paintWorklet 学习](https://jerosoler.github.io/css-houdini-pixel-box/)
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS/paintWorklet_static)

| 副产物 | 状态 | 描述 |
| --- | --- | --- |
| super-gif | [![npm](https://img.shields.io/npm/v/@mmt817/super-gif)](https://github.com/maomentai817/super-gif) | GIF 帧控制器 |


## 🖋️ 字体 Fonts

Pixel UI 采用以下字体

| Language  | Font                                                               |
| --------- | ------------------------------------------------------------------ |
| English   | [![PS2P](https://img.shields.io/badge/PS2P-n)](https://fonts.google.com/specimen/Press+Start+2P) |
| Chinese   | [![Zpix(最像素)](https://img.shields.io/badge/Zpix(最像素)-n)](https://github.com/SolidZORO/zpix-pixel-font)      |
