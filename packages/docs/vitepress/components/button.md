---
title: Button
description: Button 组件文档

next:
  link: /components/icon
  text: Icon 图标

prev:
  link: /get-started
  text: 快速开始
---

# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`plain`、 `round`和 `circle` 来定义按钮的样式。

::: preview
demo-preview=../demo/Button/Basic.vue
:::

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

::: preview
demo-preview=../demo/Button/Disabled.vue
:::

## 图标按钮

使用 `icon` 属性来定义按钮的图标。

::: preview
demo-preview=../demo/Button/Icon.vue
:::

## 按钮组

使用 `<px-button-group>` 对多个按钮分组。

::: preview
demo-preview=../demo/Button/Group.vue
:::

## 加载状态

使用 `loading` 属性来定义按钮的加载状态。

::: tip
您可以使用 `loading` 插槽或 `loadingIcon` 属性自定义您的 loading 图标

ps: `loading` 插槽优先级高于 `loadingIcon` 属性
:::

::: preview
demo-preview=../demo/Button/Loading.vue
:::

## 按钮尺寸

使用 `size` 属性来定义按钮的尺寸。

::: preview
demo-preview=../demo/Button/Size.vue
:::

## Tag

可以自定义元素标签。例如，按钮，div，路由链接，nuxt 链接。

::: preview
demo-preview=../demo/Button/Tag.vue
:::

## 自定义颜色

您可以自定义按钮的颜色。

组件库将自动计算按钮各状态的颜色。

:::tip
由于技术力问题, 请勿对此功能抱有太高期望, 如果希望实现自定义主题, 更加推荐直接修改 `@property` 属性, 详情见下述
:::

:::preview
demo-preview=../demo/Button/CustomColor.vue
:::

## 节流模式

可以通过 `useThrottle` 属性来定义按钮是否使用节流模式 默认为 true。

::: preview
demo-preview=../demo/Button/Throttle.vue
:::

## 新圆角样式

对 `pixelbox.worklet` 进行修改, 支持一种新的圆角样式, 同时限定圆角种类为 3 种, 通过修改 `--px-border-radius` 值控制, 当前展示值大于 3 的情况, 提供属性 `chubby` 控制

:::warning
由于算法不够完善, 普适性不高, 提供属性 `chubby` 限制样式基础模板, 该圆角样式对 `--px-border`, `--px-border-[position]`, `--px-border-radius-[postion]`, `--px-bg-shadow-border`, 元素宽高都有一定要求, 请合理使用
:::

::: preview
demo-preview=../demo/Button/Chubby.vue
:::

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Button/types.button.ts
:::

::: api-table src=components/Button/types.buttonGroup.ts
:::
