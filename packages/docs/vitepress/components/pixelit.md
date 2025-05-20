---
title: Pixelit 图片像素化
description: Pixelit 组件文档

next:
  link: /components/pixelit
  text: Pixelit 图片像素化

prev:
  link: /components/animationFrame
  text: AniamtionFrame 动画帧
---

# Pixelit 图片像素化

Pixelit 用于将图片进行像素风格渲染。支持自定义缩放比例、灰度处理、调色板替换等

:::tip
对于复杂图片, 相较于 [PxImage](/components/image) 组件, Pixelit 组件性能更高, 但对于纯色图片处理较差, 请合理使用
:::

## 基本用法

通过设置 `src` 属性指定原始图片地址, 组件会自动进行像素化处理

:::preview
demo-preview=../demo/Pixelit/Basic.vue
:::

## 图像尺寸

通过设置 `width`、`height` 属性来设置组件的宽高, 默认为图片的宽高。

提供 `aspect-ratio` 属性来设置组件的缩放, 默认为 `1`

:::preview
demo-preview=../demo/Pixelit/Size.vue
:::

## 灰度化

设置 `grayscale` 属性来对图片进行灰度处理

:::preview
demo-preview=../demo/Pixelit/Grayscale.vue
:::

## 调色板替换

通过 `palette` 属性可设置自定义颜色调色板 (二维 RGB 数组), 对图像颜色进行替换

:::preview
demo-preview=../demo/Pixelit/Palette.vue
:::

## 在线体验

提供在线演练场, 上传图片, 快速体验

:::preview
demo-preview=../demo/Pixelit/Playground.vue
:::

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/PixelIt/types.ts
:::