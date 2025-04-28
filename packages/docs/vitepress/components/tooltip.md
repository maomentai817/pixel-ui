---
title: Tooltip 文字提示
description: Tooltip 组件文档

next:
  link: /components/animationFrame
  text: AniamtionFrame 动画帧

prev:
  link: /components/alert
  text: Alert 提示
---

# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

在这里提供了 9 种不同方向的展示方式, 可以通过以下完整示例来理解, 选择需要的效果。

使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性来决定展示的方向: `[方向]-[对齐位置]`; 四个方向: `top`, `bottom`, `left`, `right`; 三种对齐位置: `start`, `end`, 默认为空。 如 `placement="left-end"`, 则提示信息出现在目标元素左侧, 且提示信息的底部与目标元素底部对齐。

::: preview
demo-preview=../demo/Tooltip/Basic.vue
:::

## 触发方式

Tooltip 默认是 `hover` 触发, 也可以通过 `trigger` 属性来设置触发方式: `hover`, `click`, `contextmenu`。

::: preview
demo-preview=../demo/Tooltip/Trigger.vue
:::

## 主题

Tooltip 组件内置了两个主题: `light` 和 `dark`。

:::tip
要使用自定义主题, 您必须知道您的工具提示在哪里渲染, 如果您的工具提示被呈现为根元素, 您将需要全局设置css规则。

设置自定义主题时, 需要同时修改弹出箭头和内容样式, 具体设置见下方 demo-preview

由于组件库祖宗之法基于 `css houdini paintWorklet`, 像素盒子大部分基于 `pixelbox` 渲染, 当前仅提供纯色主题, 如果希望渲染线性渐变, 等待后续升级
:::

通过设置 `effect` 来修改主题, 默认为 `light`。

::: preview
demo-preview=../demo/Tooltip/Theme.vue
:::

## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式

使用具名插槽 `content`, 代替 `content` 属性。

::: preview
demo-preview=../demo/Tooltip/MoreContent.vue
:::

## 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果:

`transition` 属性可以定制显隐的动画效果，默认为`fade`。

如果需要关闭 `tooltip` 功能, 可以使用 `disabled` 属性

Tooltip 是一个基于 [popperjs](https://popper.js.org/docs/v2/) 二次封装的扩展, 可以通过 `popperOptions` 属性来定制 popperjs 的配置。

::: preview
demo-preview=../demo/Tooltip/Advanced.vue
:::

## 虚拟触发

有时候我们想把 tooltip 的触发元素放在别的地方，而不需要写在一起，这时候就可以使用虚拟触发。

:::warning
设计缺陷问题, 由虚拟触发的 `popover` 元素需要光标从 `placement` 位置移出才能触发消失事件, 暂未解决。
:::

::: preview
demo-preview=../demo/Tooltip/Virtual.vue
:::

## 手动模式

通过 `manual` 属性, 可以设置 `tooltip` 的触发模式为手动模式, 调用组件暴露的 `show` 和 `hide` 方法即可。

::: preview
demo-preview=../demo/Tooltip/Manual.vue
:::

## 自定义动画

Tooltip 可以自定义动画, 通过 `transition` 属性来设置动画名称, 默认为 `fade`。

:::tip
过渡效果的更多信息可以在 [Vue 过渡效果](https://vuejs.org/guide/built-ins/transition.html#css-based-transitions) 中找到。
:::

::: preview
demo-preview=../demo/Tooltip/Transition.vue
:::

## Tooltip API

### Props

| Name        | Description  | Type                                                 | Default |
| ----------- | ------------ | ---------------------------------------------------- | ------- |
| content       | 显示内容,可被`slot#content`覆盖   | `string`                                             | —       |
| trigger        | 触发方式   | `enum` - `hover \| click \| contextmenu` | `hover`    |
| placement | 组件出现位置   | `enum`                                             | `bottom`       |
| manual    | 手动控制 | `boolean`                                            | false    |
| disabled      | 是否禁用 | `boolean`                                            | false   |
| popperOptions   | `popperjs`配置 | `Partial<Options>`                                            | {}   |
| effect      | 主题样式     | `enum` - `light \| dark \| customized`                         | `light`   |
| transition | 过渡效果 | `enum` | `fade` |
| showTimeout | 显示延时 | `number` | 0 |
| hideTimeout | 隐藏延时 | `number` | 200 |

### Events

| Name  | Description             | Type                         |
| ----- | ----------------------- | ---------------------------- |
| visible-change | Popover 可见性改变时触发 | `(_val: boolean) => void` |
| click-outside  | 点击区域外时触发               | `() => void`                |

### Slots

| Name    | Description                         |
| ------- | ----------------------------------- |
| default | Tooltip 触发 & 引用的元素 |
| content   | 自定义内容                          |

### Expose

| Name  | Description | Type         |
| ----- | ----------- | ------------ |
| show  | 展示 Popover  | `() => void` |
| hide | 关闭 Popover  | `() => void` |
