---
title: Progress
description: Progress 组件文档

next:
  link: /components/alert
  text: Alert 提示

prev:
  link: /components/collapse
  text: Collapse 折叠面板
---

# Progress 进度条

用于展示操作进度, 告知用户当前状态和预期。

## 直线进度条

Progress 组件设置 `percentage` 属性即可, 表示进度条对应的百分比。该属性**必填**, 并且必须在 `0-100` 的范围内。你可以设置 `format` 来自定义文字显示的格式。

:::preview
demo-preview=../demo/Progress/Line.vue
:::

## 进度条内显示百分比标识

百分比不占用额外控件， 适用于文件上传等场景

Progress 组件可通过 `stroke-width` 属性更改进度条的高度, 并可通过 `text-inside` 属性来改变进度条内部的文字。

:::preview
demo-preview=../demo/Progress/Inside.vue
:::

## 自定义进度条颜色

可以通过 `color` 属性来设置进度条颜色。该属性当前仅支持十六进制颜色值

:::preview
demo-preview=../demo/Progress/Color.vue
:::

## 自定义内容

通过默认插槽添加自定义内容

:::preview
demo-preview=../demo/Progress/Content.vue
:::

## 动画进度条

使用 `indeterminate` 属性来设置不确定的进度, `duration` 来控制动画持续时间。

:::preview
demo-preview=../demo/Progress/Indeterminate.vue
:::

## 条纹进度条

通过设置 `striped` 属性来获取条纹进度条, 也可以使用 `striped-flow` 属性获取条纹进度条流动效果, 使用 `duration` 属性控制流速

:::preview
demo-preview=../demo/Progress/Striped.vue
:::

## 棋盘进度条

通过设置 `checker` 属性来获取棋盘进度条

:::preview
demo-preview=../demo/Progress/Checker.vue
:::

## Progress API

### Props

| Name        | Description  | Type                                                 | Default |
| ----------- | ------------ | ---------------------------------------------------- | ------- |
| percentage  | 进度条百分比   | `number`                                             | 0       |
| status        | 进度条类型   | `enum` - `primary \| success \| warning \| danger`   | primary |
| stroke-width | 进度条宽度   | `number`                                              | 16      |
| text-inside    | 文字显示内置在进度条内 | `boolean`                                   | false   |
| indeterminate      | 是否为动画进度条 | `boolean`                                    | false   |
| duration   | 动画/流动速度 | `number`                                                | 4      |
| color      | 自定义颜色     | `string`                                              | -       |
| show-text  | 是否显示进度条文字     | `boolean`                                      | true    |
| striped    | 是否为条纹进度条 | `boolean`                                            | false   |
| striped-flow | 是否为条纹进度条流动 | `boolean`                                        | false   |
| checker   | 是否为棋盘进度条 | `boolean`                                            | false   |
| format    | 进度条文字显示格式 | `function`                                          | -       |

### Slots

| Name    | Description                         |
| ------- | ----------------------------------- |
| default | 默认插槽，用于设置 Progress 的内容描述 |