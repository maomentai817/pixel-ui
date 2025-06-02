---
title: Notification
description: Notification 组件文档

next:
  link: /components/popconfirm
  text: Popconfirm 气泡确认框

prev:
  link: /components/message
  text: Message 消息提示
---

# Notification 通知

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基础用法

Pixel UI 注册了 `$notify` 方法并且它接受一个 `Object` 作为其参数。在最简单的情况下, 你可以通过设置 `title` 和 `message` 属性来设置通知的标题和正文内容。默认情况下, 通知在 3000 毫秒后自动关闭, 但你可以通过设置 `duration` 属性来自定义通知的展示时间。如果你将它设置为 0, 那么通知将不会自动关闭。需要注意的是 `duration` 接收一个 `Number`, 单位为毫秒。

:::preview
demo-preview=../demo/Notification/Basic.vue
:::

## 不同状态

用来显示「成功、警告、消息、错误」等类的操作反馈。

当需要自定义更多属性时, Notification 也可以接收一个对象为参数。比如, 设置 `type` 字段可以定义不同的状态，默认为 `info`。此时正文内容以 `message` 的值传入。同时，我们也为 Notification 的各种 type 注册了方法, 可以在不传入 type 字段的情况下像 `open4` 那样直接调用。形式同 Message 组件。

:::preview
demo-preview=../demo/Notification/Types.vue
:::

## 自定义弹出位置

可以让 Notification 从屏幕四角中的任意一角弹出

使用 `position` 属性设置 Notification 的弹出位置, 支持四个选项: `top-right`、`top-left`、`bottom-right` 和 `bottom-left`, 默认为 `top-right`。

:::preview
demo-preview=../demo/Notification/Position.vue
:::

## 自定义偏移量

Notification 提供设置偏移量的功能, 通过设置 `offset` 字段, 可以使弹出的消息距屏幕边缘偏移一段距离。 注意在同一时刻, 每一个的 Notification 实例应当具有一个相同的偏移量。

:::preview
demo-preview=../demo/Notification/Offset.vue
:::

## 隐藏关闭按钮

可以通过设置 `closable` 属性来隐藏关闭按钮。

:::preview
demo-preview=../demo/Notification/Closable.vue
:::

## 全局方法​

`Pixel UI` 为 `app.config.globalProperties` 添加了全局方法 `$notify`。因此在 Vue 实例中可以作为 `this.$notify` 使用。

::: preview
demo-preview=../demo/Notification/Global.vue
:::

## 单独引用

```ts
import { PxNotification } from '@mmt817/pixel-ui'
```

> 此时调用方法为 `PxNotification(options)`。

> 我们也为每个 type 定义了各自的方法，
> 如 `PxNotification.success(options)`。

> 并且可以调用 `PxNotification.closeAll()` 手动关闭所有实例。

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Notification/types.ts
:::
