---
title: Alert
description: Alert 组件文档

next:
  link: /components/animationFrame
  text: AnimationFrame 动画帧

prev:
  link: /components/collapse
  text: Collapse 折叠面板
---

# Alert 提示

用于页面中展示重要的提示信息

## 基础用法

Alert 组件不属于浮层元素, 不会自动消失或关闭

Alert 组件提供四种类型, 由 `type` 指定, 默认为 `info`

:::preview
demo-preview=../demo/Alert/Basic.vue
:::

## 主题

Alert 组件提供了两个主题: `light` 和 `dark`

通过设置 `effect` 属性来改变主题, 默认为 `light`

:::preview
demo-preview=../demo/Alert/Effect.vue
:::

## 不可关闭

可以设置 Alert 组件是否为可关闭状态, `closable` 属性决定 Alert 组件是否可关闭, 该属性接受一个 `Boolean`, 默认为 `false`

:::preview
demo-preview=../demo/Alert/Closable.vue
:::

## 使用图标

通过设置 `show-icon` 属性来显示 Alert 组件的 icon, 这能更有效地向用户展示你的显示意图

:::preview
demo-preview=../demo/Alert/Icon.vue
:::

## 文字居中

使用 `center` 属性使文字水平居中

:::preview
demo-preview=../demo/Alert/Center.vue
:::

## 文字描述

为 Alert 组件添加一个更加详细的描述来使用户了解更多信息

除了 required 的 `title` 属性外, 可以设置 `description` 属性来添加描述, 称之为辅助性文字, 只能用于存放文本内容

:::preview
demo-preview=../demo/Alert/Description.vue
:::

## 带图标和描述

这里提供一个带有图标和描述的例子

:::preview
demo-preview=../demo/Alert/IconDescription.vue
:::

## Alert API

### Props

| Name        | Description  | Type                                                 | Default |
| ----------- | ------------ | ---------------------------------------------------- | ------- |
| title       | Alert 标题   | `string`                                             | —       |
| type        | Alert 类型   | `enum` - `success \| warning \| danger \| info` | info    |
| description | 描述性文本   | `string`                                             | —       |
| closable    | 是否可以关闭 | `boolean`                                            | true    |
| center      | 文字是否居中 | `boolean`                                            | false   |
| show-icon   | 是否展示图标 | `boolean`                                            | false   |
| effect      | 主题样式     | `enum` - `light \| dark`                         | light   |

### Events

| Name  | Description             | Type                         |
| ----- | ----------------------- | ---------------------------- |
| close | 关闭 Alert 时触发的事件 | `(event: MouseEvent) => void` |

### Slots

| Name    | Description                         |
| ------- | ----------------------------------- |
| default | 默认插槽，用于设置 Alert 的内容描述 |
| title   | 标题的内容                          |

### Expose

| Name  | Description | Type         |
| ----- | ----------- | ------------ |
| open  | 打开 Alert  | `() => void` |
| close | 关闭 Alert  | `() => void` |
