---
title: Input
description: Input 组件文档

next:
  link: /components/switch
  text: Switch 开关

prev:
  link: /components/configProvider
  text: ConfigProvider 全局配置
---

# Input 输入框

通过鼠标或键盘输入字符

:::danger
Input 为受控组件, 它 **总会显示 Vue 绑定值**。

在正常情况下, `input` 的输入事件应该被正常响应。它的处理程序应该更新组件的绑定值 (或使用 `v-model`)。否则, 输入框的值将不会改变。
:::

## 基础用法

:::preview
demo-preview=../demo/Input/Basic.vue
:::

## 禁用状态

通过 `disabled` 属性设置禁用状态

:::preview
demo-preview=../demo/Input/Disabled.vue
:::

## 一键清空

使用 `clearable` 属性即可得到一个可一键清空的输入框

:::preview
demo-preview=../demo/Input/Clearable.vue
:::

## 密码框

使用 `showPassword` 属性即可得到一个可切换显示隐藏的密码框

:::preview
demo-preview=../demo/Input/Password.vue
:::

## 带图标的输入框

带有图标标记输入类型

要在输入框中添加图标, 可通过 `prefix` 和 `suffix` 具名插槽来实现。

:::preview
demo-preview=../demo/Input/Icon.vue
:::

## 文本域​

用于输入多行文本信息可缩放的输入框。添加 `type="textarea"` 属性来将 `input` 元素转换为原生的 `textarea` 元素。

文本域高度可通过 `rows` 属性控制

:::preview
demo-preview=../demo/Input/Textarea.vue
:::

## 复合型输入框​

可以在输入框中前置或后置一个元素, 通常是标签或按钮。

可通过 `slot` 来指定在 Input 中分发的前置或者后置的内容。

:::warning
待 `px-select` 组件开发完成后补充
:::

:::preview
demo-preview=../demo/Input/Complex.vue
:::

## 尺寸

通过 `size` 属性设置 Input 的尺寸。

:::preview
demo-preview=../demo/Input/Size.vue
:::

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Input/types.ts
:::
