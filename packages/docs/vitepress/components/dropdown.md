---
title: Dropdown
description: Dropdown 组件文档

next:
  link: /components/alert
  text: Alert 提示

prev:
  link: /components/progress
  text: Progress 进度条
---

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

悬停在下拉菜单上以展开更多操作。

通过组件 `slot` 来设置下拉触发的元素以及需要通过具名插槽 `dropdown` 来设置下拉菜单内容。默认情况下, 只需要悬停在触发菜单的元素上即可, 无需点击也会显示下拉菜单。

:::preview
demo-preview=../demo/Dropdown/Basic.vue
:::

## 位置

属性继承自 `Tooltip` 组件, 支持 12 个方向, 详情请查看 [`Tooltip`](/components/tooltip) 组件。

:::preview
demo-preview=../demo/Dropdown/Placement.vue
:::

## 触发对象

可使用按钮触发下拉菜单。

设置 `split-button` 属性来让触发下拉元素呈现为按钮组, 左边是功能按钮, 右边是触发下拉菜单的按钮, 设置为 `true` 即可。如果你想要在第三和第四个选项之间添加一个分隔符，你只需要为第四个选项添加一个 `divided` 的属性。

:::preview
demo-preview=../demo/Dropdown/SplitButton.vue
:::

## 触发方式

可以配置点击激活或者悬停激活。

将 `trigger` 属性设置为 `click` 即可, 默认为 `hover`。

:::preview
demo-preview=../demo/Dropdown/Trigger.vue
:::

## 禁用状态

可以通过设置 `disabled` 属性来禁用下拉菜单。

:::preview
demo-preview=../demo/Dropdown/Disabled.vue
:::

## 菜单隐藏方式

可以通过 `hide-on-click` 属性来配置。

下拉菜单默认在点击菜单项后会被隐藏, 将 `hide-on-click` 设置为 `false` 即可关闭此功能。

:::preview
demo-preview=../demo/Dropdown/HideOnClick.vue
:::

## 指令事件

点击菜单项后会触发事件, 用户可以通过相应的菜单项 key 进行不同的操作。

:::warning
此处触发回调等待后续 `px-message` 组件开发完成后再完善。
:::

:::preview
demo-preview=../demo/Dropdown/Event.vue
:::

## 下拉方式

您可以手动使用 `手动打开` 或 `手动关闭下拉菜单以打开或关闭`

:::preview
demo-preview=../demo/Dropdown/Manual.vue
:::

## 尺寸

Dropdown 组件提供除了默认值以外的三种尺寸, 可以在不同场景下选择合适的尺寸。

使用 `size` 属性配置尺寸, 可选的尺寸大小有: `large`, `default`, `small`, `mini`

:::preview
demo-preview=../demo/Dropdown/Size.vue
:::

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Dropdown/types.dropdown.ts
:::

::: api-table src=components/Dropdown/types.dropdownItem.ts
:::