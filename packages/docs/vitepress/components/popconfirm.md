---
title: Popconfirm
description: Popconfirm 组件文档

next:
  link: /components/tooltip
  text: Tooltip 文字提示

prev:
  link: /components/message
  text: Message 消息提示
---

# Popconfirm 气泡确认框

点击某个元素弹出一个简单的气泡确认框

## 展示位置

Popconfirm 提供了 9 种展示位置

使用 `title` 属性来设置点击参考元素时显示的信息, 由 `placement` 属性来决定展示的方向: `[方向]-[对齐位置]`; 四个方向: `top`, `bottom`, `left`, `right`; 三种对齐位置: `start`, `end`, `null`, 默认为 null。 如 `placement="left-end"`, 则气泡确认框出现在目标元素左侧, 且气泡确认框的底部与目标元素底部对齐。

::: preview
demo-preview=../demo/Popconfirm/Placement.vue
:::

## 基础用法

Popconfirm 属性同 Tooltip 类似, 是基于 Tooltip 封装的拓展

在 Popconfirm 中, 只有 `title` 可用, `content` 属性无效。

::: preview
demo-preview=../demo/Popconfirm/Basic.vue
:::

## 自定义弹出框内容

可以在 Popconfirm 中自定义内容

::: preview
demo-preview=../demo/Popconfirm/Custom.vue
:::

## 多种让 Popconfirm 出现的方法

点击按钮触发事件

::: preview
demo-preview=../demo/Popconfirm/Callback.vue
:::

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Popconfirm/types.ts
:::
