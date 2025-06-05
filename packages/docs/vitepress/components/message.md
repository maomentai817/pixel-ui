---
title: Message
description: Message 组件文档

next:
  link: /components/notification
  text: Notification 通知

prev:
  link: /components/alert
  text: Alert 提示
---

# Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基础用法

从顶部出现，3 秒后自动消失。

Message 在配置上与 Notification 非常类似, 所以部分 options 在此不做详尽解释。文末有 options 列表, 可以结合 Notification 的文档理解它们。`Pixel UI` 注册了一个全局的 `$message` 方法用于调用。Message 可以接收一个字符串或一个 VNode 作为参数，它会被显示为正文内容。

::: preview
demo-preview=../demo/Message/Basic.vue
:::

## 不同状态

用来显示「成功、警告、消息、错误」等类的操作反馈。

当需要自定义更多属性时, Message 也可以接收一个对象为参数。比如, 设置 `type` 字段可以定义不同的状态, 默认为 `info`。此时正文内容以 `message` 的值传入。同时，我们也为 Message 的各种 type 注册了方法, 可以在不传入 type 字段的情况下像 `open4` 那样直接调用。

:::tip
`type="stamp"` 默认白色背景, 建议搭配深色底色使用。
:::

:::preview
demo-preview=../demo/Message/Types.vue
:::

## 可关闭的消息提示

可以添加关闭按钮。

默认的 Message 是不可以被手动关闭的。如果你需要手动关闭功能，除可以把 `showClose` 设置为 true 外, 和 Notification 一样, Message 拥有可控的 `duration`， 默认的关闭时间为 3000 毫秒，当把这个属性的值设置为`0`便表示该消息不会被自动关闭。

:::preview
demo-preview=../demo/Message/Close.vue
:::

## 文字居中

可以通过设置 `center` 属性来使 Message 文本内容居中。

:::preview
demo-preview=../demo/Message/Center.vue
:::

## 自定义图标

可以通过设置 `icon` 属性来自定义图标。该属性会覆盖 `type` 的默认图标。

:::preview
demo-preview=../demo/Message/Icon.vue
:::

## 全局方法​

`Pixel UI` 为 `app.config.globalProperties` 添加了全局方法 `$message`。因此在 Vue 实例中可以作为 `this.$message` 使用。

::: preview
demo-preview=../demo/Message/Global.vue
:::

## 单独引用

```ts
import { PxMessage } from '@mmt817/pixel-ui'
```

> 此时调用方法为 `PxMessage(options)`。

> 我们也为每个 type 定义了各自的方法，
> 如 `PxMessage.success(options)`。

> 并且可以调用 `PxMessage.closeAll()` 手动关闭所有实例。

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Message/types.ts
:::
