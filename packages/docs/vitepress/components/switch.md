---
title: Switch
description: Switch 组件文档

next:
  link: /components/badge
  text: Badge 徽章

prev:
  link: /components/input
  text: Input 输入框
---

# Switch 开关

表示两种相互对立的状态间的切换, 多用于触发「开/关」。

## 基础用法

绑定 `v-model` 到一个 `Boolean` 类型的变量。可以使用 `--px-switch-on-color` 属性与 `--px-switch-off-color` 属性来设置开关的背景色, `--px-switch-on-border-color`、`--px-switch-off-border-color` 属性设置开关边框颜色, `--px-switch-on-action-color`、`--px-switch-off-action-color` 属性设置滑块颜色。

:::preview
demo-preview=../demo/Switch/Basic.vue
:::

## 尺寸

通过 `size` 改变尺寸, 可选值为 `small`、`default`、`large`

:::preview
demo-preview=../demo/Switch/Size.vue
:::

## 文字描述​
使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述。使用 `inline-prompt` 属性来控制文本是否显示在点内。

使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述。

:::preview
demo-preview=../demo/Switch/Text.vue
:::

## 自定义图标

:::tip
使用 `inactive-icon` 和 `active-icon` 属性来添加图标。这里的图标是滑块外图标, 注意区分。Pixel UI 提供了一组图标, 您可以在 [icon component](/components/icon#图标集合) 查看。
:::

使用 `inactive-icon` 和 `active-icon` 属性来添加图标。使用 `inline-prompt` 属性来控制图标显示在点内。

:::preview
demo-preview=../demo/Switch/CustomIcon.vue
:::

## 自定义动作图标

使用 `inactive-action-icon` 和 `active-action-icon` 属性来添加图标。

:::preview
demo-preview=../demo/Switch/CustomActionIcon.vue
:::

## 扩展的 value 类型​

你可以设置 `active-value` 和 `inactive-value` 属性, 它们接受 `Boolean`、`String` 或 `Number` 类型的值。

:::preview
demo-preview=../demo/Switch/ExtendedValue.vue
:::

## 禁用状态​

设置 `disabled` 属性, 接受一个 `Boolean`, 设置 `true` 即可禁用。

:::preview
demo-preview=../demo/Switch/Disabled.vue
:::

## 加载状态​

设置 `loading` 属性, 接受一个 `Boolean`, 设置 `true` 即加载中状态。

:::preview
demo-preview=../demo/Switch/Loading.vue
:::

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Switch/types.ts
:::
