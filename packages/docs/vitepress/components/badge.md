---
title: Badge
description: Badge 组件文档

next:
  link: /components/card
  text: Card 卡片

prev:
  link: /components/text
  text: Text 文本
---

# Badge 徽章

按钮和图标上的数字或状态标记。

## 基础用法

可以用来展示新消息的数量

数量值可接受 `Number` 或 `String`

:::preview
demo-preview=../demo/Badge/Basic.vue
:::

## 最大值

通过 `max` 属性设置最大值，超过最大值会显示 `{max}+`, 仅当 `value`  为 `Number` 时生效

:::preview
demo-preview=../demo/Badge/Max.vue
:::

## 自定义显示内容

除数字外, 还支持显示任何值, 或者通过 `content` 插槽自定义显示内容

:::preview
demo-preview=../demo/Badge/Content.vue
:::

## 小红点

通过一个小红点标记告知用户有新内容

使用 `is-dot` 属性设置

:::preview
demo-preview=../demo/Badge/Dot.vue
:::

## 偏移量

设置徽章点的偏移量, 格式为 `[left, top]`, 表示状态点从左侧和默认位置顶部的偏移

使用 `offset` 属性设置

:::preview
demo-preview=../demo/Badge/Offset.vue
:::

## Card API

### Props

| Name     | Description          | Type                                                             | Default |
| -------- | -------------------- | ---------------------------------------------------------------- | ------- |
| value    | 显示值               | `number` \| `string`                                             | -       |
| max      | 最大值               | `number`                                                         | 99       |
| is-dot   | 是否显示小红点       | `boolean`                                                        | false   |
| hidden   | 是否隐藏            | `boolean`                                                        | false   |
| type     | 颜色类型            | `enum` - `primary \| success \| warning \| danger \| info` | danger |
| show-zero | 值为零时是否显示 Badge          | `boolean`                                            | true   |
| color    | 自定义颜色          | `string`                                                         | -       |
| offset   | 偏移量              | `[number, number]`                                                | -  |


### Slots

| Name    | Description        |
| ------- | ------------------ |
| default | 自定义默认内容       |
| content | 自定义显示内容       |
