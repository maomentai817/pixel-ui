---
title: Text
description: Text 组件文档

next:
  link: /components/badge
  text: Badge 徽章

prev:
  link: /components/icon
  text: Icon 图标
---

# Text 文本

文本的常见操作

## 基础用法

用 `type` 属性设置 Text 类型, `bold` 属性设置**粗体**

::: preview
demo-preview=../demo/Text/Basic.vue
:::

## 尺寸

使用 `size` 属性设置 Text 尺寸, 默认大小为 `16px`, 传入值默认为 `px`

::: preview
demo-preview=../demo/Text/Size.vue
:::

## 颜色

使用 `color` 属性设置 Text 颜色

::: preview
demo-preview=../demo/Text/Color.vue
:::

## 对齐方式 & 紧凑

使用 `align` 属性设置 Text 对齐方式, 可选值为 `left`, `center`, `right`, 使用 `compact` 属性设置 Text 是否紧凑

::: preview
demo-preview=../demo/Text/Align.vue
:::

## Tag

可以自定义元素标签。例如，按钮，div，路由链接，nuxt 链接。

::: preview
demo-preview=../demo/Text/Tag.vue
:::

## Text API

### Props

| Name              | Description                       | Type                                                             | Default |
| ----------------- | --------------------------------- | ---------------------------------------------------------------- | ------- |
| size              | 字体大小                           | `number`                                                         | 16      |
| type              | 字体类型                           | `enum` - `primary \| success \| warning \| danger \| base`       | base    |
| color             | 字体颜色                           | `string`                                                         | #212529 |
| bold              | 是否粗体                           | `boolean`                                                        | false   |
| align             | 对齐方式                           | `enum` - `left \| center \| right`                               | left    |
| compact           | 是否紧凑                           | `boolean`                                                        | false   |
| tag               | 自定义元素标签                      | `string`\/`Component`                                            | span    |