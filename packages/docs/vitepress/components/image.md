---
title: Image 图片像素滤镜
description: Image 组件文档

next:
  link: /components/pixelit
  text: Pixelit 图片像素化

prev:
  link: /components/eyeDropper
  text: EyeDropper 取色器
---

# Image 图片像素滤镜

一张图片, 为其提供像素滤镜效果, 支持颜色数量压缩、抗锯齿去除、背景色保留、网格线绘制等功能

## 基础功能

通过 `src` 属性指定图片路径, 组件会在 Canvas 上渲染像素滤镜效果

:::tip
当前组件提供 `width`、`height` 来设置 Canvas 及组件盒子的宽高, 默认为图片的宽高。但由于缩放渲染问题, 宽高设置过小可能会导致图片模糊, 请酌情使用或按比例缩放

新增 `scale` 属性来设置图片缩放比例, 当原图尺寸过大时, 强烈建议设置 `scale` 控制
:::

:::preview
demo-preview=../demo/Image/Basic.vue
:::

## 自定义参数

你可以通过调整 `block-size`、`color-count` 等属性来自定义像素滤镜的效果

:::preview
demo-preview=../demo/Image/Custom.vue
:::

## 网格模式

通过设置 `showGrid` 控制是否显示 canvas 网格

:::preview
demo-preview=../demo/Image/Grid.vue
:::

## 在线体验

提供在线演练场, 上传图片, 快速体验

:::preview
demo-preview=../demo/Image/Playground.vue
:::

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Image/types.ts
:::