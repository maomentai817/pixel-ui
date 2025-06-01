---
title: Progress
description: Progress 组件文档

next:
  link: /components/tag
  text: Tag 标签

prev:
  link: /components/collapse
  text: Collapse 折叠面板
---

# Progress 进度条

用于展示操作进度, 告知用户当前状态和预期。

## 直线进度条

Progress 组件设置 `percentage` 属性即可, 表示进度条对应的百分比。该属性**必填**, 并且必须在 `0-100` 的范围内。你可以设置 `format` 来自定义文字显示的格式。

:::preview
demo-preview=../demo/Progress/Line.vue
:::

## 进度条内显示百分比标识

百分比不占用额外控件， 适用于文件上传等场景

Progress 组件可通过 `stroke-width` 属性更改进度条的高度, 并可通过 `text-inside` 属性来改变进度条内部的文字。

:::preview
demo-preview=../demo/Progress/Inside.vue
:::

## 自定义进度条颜色

可以通过 `color` 属性来设置进度条颜色。该属性当前仅支持十六进制颜色值

:::preview
demo-preview=../demo/Progress/Color.vue
:::

## 自定义内容

通过默认插槽添加自定义内容

:::preview
demo-preview=../demo/Progress/Content.vue
:::

## 动画进度条

使用 `indeterminate` 属性来设置不确定的进度, `duration` 来控制动画持续时间。

:::preview
demo-preview=../demo/Progress/Indeterminate.vue
:::

## 条纹进度条

通过设置 `striped` 属性来获取条纹进度条, 也可以使用 `striped-flow` 属性获取条纹进度条流动效果, 使用 `duration` 属性控制流速

:::preview
demo-preview=../demo/Progress/Striped.vue
:::

## 棋盘进度条

通过设置 `checker` 属性来获取棋盘进度条

:::preview
demo-preview=../demo/Progress/Checker.vue
:::

## 环形进度条

通过设置 `type="circle"` 属性来显示环形进度条。你还可以设置 `width` 和 `stroke-width` 属性来自定义环形进度条的大小和宽度。

:::preview
demo-preview=../demo/Progress/Circle.vue
:::

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Progress/types.ts
:::
