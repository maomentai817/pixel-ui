---
search: false
next:
  link: /components/button
  text: PxButton 按钮
---

# 🐱 PixelUI 像素风Vue3组件库

一个基于 Vue3 + TypeScript + CSS Houdini 的像素风格组件库，支持复古像素样式渲染、自定义像素字体和像素边框，致力于打造独特的 Web UI 体验。

## 📦 安装

```bash
npm i @mmt817/pixel-ui --save
# 或者使用 pnpm / yarn
pnpm add @mmt817/pixel-ui
```

## 🚀 快速开始

### 全局注册组件

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// 引入 Pixel UI
import PixelUI from '@mmt817/pixel-ui'
import '@hackernoon/pixel-icon-library/fonts/iconfont.css'
import '@mmt817/pixel-ui/dist/index.css'

createApp(App).use(PixelUI).mount('#app')
```

```vue
<template>
  <px-button>START</px-button>
</template>
```

### 按需引入组件

Pixel-UI 提供了 ESModule 构建，支持 TreeShaking，推荐按需引入以减少打包体积。

```vue
<script setup lang="ts">
import { PxButton } from '@mmt817/pixel-ui'
</script>

<template>
  <px-button>START</px-button>
</template>
```

## 🧰 使用示例

```vue
<template>
  <px-card style="width: 300px">
    <p>Welcome to PixelUI</p>
  </px-card>
</template>
```

::: api-table src=components/Button/types.ts
:::

## ✨ 组件亮点

::: details

- 🧩 **像素风格渲染**：基于 CSS Houdini Paint Worklet 实现像素边框、阴影等复古视觉效果。
- 💡 **高度可配置**：支持通过 CSS 自定义属性调整像素大小、颜色、圆角等参数。
- 🎮 **内置像素字体**：内置复古像素风字体，兼容多语言渲染，也支持自定义注册字体。
- 📦 **支持全量与按需引入**：具备良好 Tree Shaking 支持，适用于大型项目精细引入。
- 🧪 **Vitest 测试驱动开发**：每个组件都具备高覆盖率测试，确保稳定性。
- 📖 **VitePress + Storybook 文档系统**：既有 API 说明，也有交互示例，学习曲线低。
- 🛠 **Monorepo 架构**：分包构建清晰独立，便于扩展、维护与管理。
- ⚙️ **CI/CD 自动化部署**：结合 GitHub Actions 实现发布流程自动化。
- 🤖 **AI 辅助设计与构建**：结合 AI 助手完成部分设计与工程流程，提升效率。
:::
