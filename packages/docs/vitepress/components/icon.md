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

## Icon API

### Props

| Name              | Description                       | Type                                                             | Default |
| ----------------- | --------------------------------- | ---------------------------------------------------------------- | ------- |
| icon              | 图标名称                           | `string`                                                         | -       |
| size              | 图标大小                           | `number`\/`string`                                               | 14      |
| type              | 图标类型                           | `enum` - `primary \| success \| warning \| danger \| base`       | base    |
| color             | 图标颜色                           | `string`                                                         | #212529 |
| flip              | 图标翻转                           | `enum` - `horizontal \| vertical \| both`                        | -       |
| rotation          | 图标旋转角度                       | `number`\/`string`                                               | -       |
| spin              | 图标旋转动画                       | `boolean`                                                        | false   |
| bounce            | 图标上下弹动动画                   | `boolean`                                                        | false   |
| shake             | 图标左右摇晃动画                   | `boolean`                                                        | false   |
| beat              | 图标心跳动画                       | `boolean`                                                        | false   |