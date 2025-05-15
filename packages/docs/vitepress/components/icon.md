---
title: Icon
description: Icon 组件文档

next:
  link: /components/text
  text: Text 文本

prev:
  link: /components/button
  text: Button 按钮
---

# Icon 图标

PixelUI 组件库的图标集合来自 [pixel-icon-library](https://pixeliconlibrary.com/). 提供 400+ 独特的像素化矢量图标, 且各自拥有 4 种变体

## 使用图标

* 如果你想像用例一样**直接使用**, 你需要全局引入第三方图标库, 才能在项目里直接使用。 

## 安装

:::tip
方便使用, 已将 pixel-icon-library 集成到 PixelUI 组件库里, 你可以不用引入第三方图标库及其样式。
:::

### 使用包管理器

选择一个你喜欢的包管理器

::: code-group

```shell [npm]
$ npm install @hackernoon/pixel-icon-library
```

```shell [yarn]
$ yarn add @hackernoon/pixel-icon-library
```

```shell [pnpm]
$ pnpm install @hackernoon/pixel-icon-library
```

```shell [bun]
$ bun add @hackernoon/pixel-icon-library
```

```shell [deno]
$ 别用 deno, 会变得不幸
```

:::

### 引入图标库样式

```ts
import '@hackernoon/pixel-icon-library/fonts/iconfont.css'
```

## 基础用法

查阅 [图标库](https://pixeliconlibrary.com/) icon 名称, 通过 `icon` 属性传入即可, 使用 `type`、`color`、`size` 修改图标样式

::: preview
demo-preview=../demo/Icon/Basic.vue
:::

## 图标翻转

通过 `flip` 和 `rotation` 属性控制图标翻转

::: preview
demo-preview=../demo/Icon/Flip.vue
:::

## 图标动画

通过 `spin`、`bounce`、`shake`、`beat` 属性控制图标动画

::: preview
demo-preview=../demo/Icon/Animation.vue
:::

## 图标集合

<IconList />

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Icon/types.ts
:::
