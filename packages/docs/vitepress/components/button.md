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

## 节流模式

可以通过 `useThrottle` 属性来定义按钮是否使用节流模式 默认为 true。

::: preview
demo-preview=../demo/Button/Throttle.vue
:::


## ButtonGroup API

### Props

| Name     | Description          | Type                                                             | Default |
| -------- | -------------------- | ---------------------------------------------------------------- | ------- |
| size     | 尺寸                 | `enum` - `large \| default \| small`                              | —       |
| type     | 类型                 | `enum` - `primary \| success \| warning \| danger \| base`        | base    |
| disabled | 按钮组是否为禁用状态 | `boolean`                                                           | false   |

### Slots

| Name    | Description | Sub Component |
| ------- | ----------- | ------------- |
| default | 默认插槽    | Button         |

## API_TABLE PLUGIN TEST

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Button/types.ts
:::
