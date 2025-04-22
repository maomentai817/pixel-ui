---
title: Collapse
description: Collapse 组件文档

next:
  link: /components/progress
  text: Progress 进度条

prev:
  link: /components/card
  text: Card 卡片
---

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板, 面板之间互不影响

::: preview
demo-preview=../demo/Collapse/Basic.vue
:::

## 手风琴效果

每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示

:::preview
demo-preview=../demo/Collapse/Accordion.vue
:::

## 自定义面板标题

除了可以通过 `title` 属性来设置标题内容，也可以通过具名 `title` 插槽来自定义标题内容

:::preview
demo-preview=../demo/Collapse/Title.vue
:::

## 禁用面板

通过 `disabled` 属性来设置是否禁用面板

:::preview
demo-preview=../demo/Collapse/Disabled.vue
:::

## 自定义展开图标

通过 `icon` 属性来设置自定义展开图标

:::preview
demo-preview=../demo/Collapse/Icon.vue
:::

## Collapse API

### Props

| Name     | Description          | Type                                                             | Default |
| -------- | -------------------- | ---------------------------------------------------------------- | ------- |
| modelValue| 当前激活面板      | `string[]`\/`number[]`                                                        | []   |
| accordion    | 是否启用手风琴莫模式                 | `boolean`        | false    |

### Events

| Name  | Description  | Type                         |
| ----- | ------------ | ---------------------------- |
| change | 切换当前活动面板 | `(val: CollapseItemName[]) => void`   |

### Slots

| Name  | Description  | Children                      |
| ----- | ------------ | ------------------------------ |
| default | 自定义默认内容 |  CollapseItem |


## CollapseItem API

### Props

| Name     | Description          | Type                                                             | Default |
| -------- | -------------------- | ---------------------------------------------------------------- | ------- |
| name    | 唯一标识符                 | `string`\/`number`                              | -   |
| title    | 标题                 | `string`        | ''    |
| disabled    | 是否禁用                 | `boolean`        | false    |
| icon    | 自定义展开图标                 | `string`        | ''    |

### Slots

| Name  | Description  |
| ----- | ------------ |
| default | CollapseItem 内容 |
| title | CollapseItem 标题 |
