---
title: EyeDropper 取色器
description: EyeDropper 组件文档

next:
  link: /components/image
  text: Image 像素滤镜

prev:
  link: /components/animationFrame
  text: AnimationFrame 动画帧
---

# EyeDropper 取色器

EyeDropper 允许用户从屏幕中选择颜色

## 基础用法

通过 `onChange` 监听颜色选择, 通常搭配 `v-slot` 插槽暴露的方法使用

:::preview
demo-preview=../demo/EyeDropper/Basic.vue
:::

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/EyeDropper/types.ts
:::

```ts
/**
 * EyeDropper 支持的 open 方法参数
 */
export interface EyeDropperOpenOptions {
  /**
   * @property signal
   * @description 可选的 AbortSignal, 用于中止操作
   * @type AbortSignal
   * @default undefined
   */
  signal?: AbortSignal
}

/**
 * EyeDropper open 方法返回值
 */
export interface EyeDropperResult {
  /**
   * @property sRGBHex
   * @description 返回的选中颜色值（十六进制）
   * @type string
   */
  sRGBHex: string
}
```
