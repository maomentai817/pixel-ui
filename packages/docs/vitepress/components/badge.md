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

## 自定义颜色

您可以自定义徽章的颜色。

组件库将自动计算徽章的颜色。

:::tip
由于技术力问题, 请勿对此功能抱有太高期望, 如果希望实现自定义主题, 更加推荐直接修改 `@property` 属性, 详情见下述
:::

:::preview
demo-preview=../demo/Badge/CustomColor.vue
:::

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Badge/types.ts
:::
