---
title: MessageBox
description: MessageBox 组件文档

next:
  link: /components/notification
  text: Notification 通知

prev:
  link: /components/message
  text: Message 消息提示
---

# MessageBox 消息弹出框

模拟系统的消息弹出框而实现的一套模态对话框组件, 用于消息提示、消息确认和提交内容。

:::tip
从设计上来说, MessageBox 的作用是美化系统自带的 `alert`、`confirm` 和 `prompt` 方法, 因此适合展示较为简单的内容。如果需要弹出较为复杂的内容, 请使用 Dialog 组件。
:::

## 消息提示

当用户进行操作时会被触发, 该对话框中断用户操作, 直到用户确认知晓后才可关闭。

调用 `PxMessageBox.alert` 方法以打开 alert 框。它模拟了系统的 alert, 无法通过按下 ESC 或点击框外关闭。此例中接收两个参数, `message` 和`title`。值得一提的是, 窗口被关闭后, 它默认会返回一个 `Promise` 对象便于进行后续操作的处理。若不确定浏览器是否支持 `Promise`, 可自行引入第三方 `polyfill` 或像本例一样使用回调进行后续处理。

:::preview
demo-preview=../demo/MessageBox/Alert.vue
:::

## 确认消息

提示用户确认其已经触发的动作, 并询问是否进行此操作时会用到此对话框。

调用 `PxMessageBox.confirm` 方法以打开 confirm 框。它模拟了系统的 confirm, MessageBox 组件也拥有极高的定制性, 我们可以传入 `options` 作为第三个参数, 它是一个字面量对象。`type` 字段表明消息类型, 可指定消息外观及图标类型, 需要注意的是, 第二个参数 `title` 必须定义为 `String` 类型, 如果是 `Object`, 则会被当做为 `options` 使用。在这里我们返回了一个 `Promise` 来处理后续响应。

:::preview
demo-preview=../demo/MessageBox/Confirm.vue
:::

## 提交内容

当需要用户输入内容时, 可以使用 Prompt 类型的消息框。

调用 `PxMessageBox.prompt` 方法以打开 prompt 框。它模拟了系统的 prompt, 可通过 `showInput` 启用输入框, `inputType` 指定输入框类型, `inputValue` 数据绑定, `inputPlaceholder` 定义输入框的占位符。

:::preview
demo-preview=../demo/MessageBox/Prompt.vue
:::

## 使用 VNode

`message` 可以是一个 VNode, 允许你使用自定义的模板。

:::preview
demo-preview=../demo/MessageBox/VNode.vue
:::

## 个性化

消息弹框可以被定制来展示各种内容。

上面提到的三个方法都是对 `PxMessageBox` 方法的二次包装。本例直接调用 `PxMessageBox` 方法, 使用 `showCancelButton` 字段, 用于显示取消按钮。另外可用 `cancelButtonText` 来自定义取消按钮文本 (Confirm 按钮也具有相同的字段, 在文末的 API 说明中有完整的字段列表)。

此例还使用了 `beforeClose` 属性, 当 `beforeClose` 被赋值且被赋值为一个回调函数时, 在消息弹框被关闭之前将会被调用, 并且可以通过该方法来阻止弹框被关闭。它是一个接收三个参数：`action`、`instance` 和 `done` 的方法。使用它能够在关闭前对实例进行一些操作, 比如为确定按钮添加 `loading` 状态等; 此时若需要关闭实例, 可以调用 `done` 方法 (若在  `beforeClose` 中没有调用 `done`, 则弹框便不会关闭)。

:::preview
demo-preview=../demo/MessageBox/Custom.vue
:::

## 区分取消操作与关闭操作​

有些场景下, 点击取消按钮与点击关闭按钮有着不同的含义。

默认情况下, 当用户触发取消 (点击取消按钮) 和触发关闭 (点击关闭按钮或遮罩层、按下 ESC 键) 时, Promise 的 reject 回调和 `callback` 回调的参数分别为 'cancel' 和 'close'。

## 内容居中

消息弹框支持使用居中布局。

将 `center` 属性设置为 `true` 可将内容居中显示。

:::preview
demo-preview=../demo/MessageBox/Center.vue
:::

## 自定义图标

通过 `icon` 属性设置图标, 或使用任意 Vue 组件、渲染函数 (JSX) 来自定义。

:::preview
demo-preview=../demo/MessageBox/Icon.vue
:::

## 定制化风格

特殊的, 组件库当前将 `iron`, `stamp` 集成到 `type` 属性中, 可配置查看使用

:::preview
demo-preview=../demo/MessageBox/Style.vue
:::

## 全局方法

如果你完整引入了 PxielUI, 它会为 `app.config.globalProperties` 添加如下全局方法: `$msgbox`、 `$alert`、`$confirm` 和 `$prompt`。 因此在 Vue 实例中可以采用本页面中的方式来调用 MessageBox。参数如下:

- `$msgbox(options)`
- `$alert(message, title, options)` 或 `$alert(message, options)`
- `$confirm(message, title, options)` 或 `$confirm(message, options)`
- `$prompt(message, title, options)` 或 `$prompt(message, options)`

## 单独引用

如果您需要按需引入 MessageBox:

```ts
import { PxMessageBox } from '@mmt817/pixel-ui'
```

那么对应于上述四个全局方法的调用方法依次为：`PxMessageBox`、`PxMessageBox.alert`、`PxMessageBox.confirm` 和 `PxMessageBox.prompt`, 参数同上所述。

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/MessageBox/types.ts
:::
