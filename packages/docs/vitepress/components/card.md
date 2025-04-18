---
title: Card
description: Card 组件文档

next:
  link: /components/collapse
  text: Collapse 折叠面板

prev:
  link: /components/badge
  text: Badge 徽章
---

# Card 卡片

将信息聚合在卡片容器中展示

## 基础用法

卡片包含标题, 内容以及操作区域

Card 组件由 `header` `body` `footer` 及 `prepend` `append` 组成, `body` 为默认插槽, 其余内容取决于一个具名 slot

:::tip
`prepend` 插槽本意为 `px-icon`, 如需更多内容, 请自行设置样式穿透
:::

:::preview
demo-preview=../demo/Card/Basic.vue
:::

## 简单卡片

卡片可以只包含内容区域

:::warning
这里文档待补充, `px-list` 组件待开发
:::

:::preview
demo-preview=../demo/Card/Simple.vue
:::

## 卡片圆角

通过 `round` `circle` 属性设置卡片的圆角

:::preview
demo-preview=../demo/Card/Round.vue
:::

## Hover 卡片

通过 `hoverable` 属性设置卡片的 Hover 效果

:::preview
demo-preview=../demo/Card/Hover.vue
:::

## 更多配置

:::danger
由于组件采用 `CSS Houdini Paint Worklets` 绘制像素边框, 普通 CSS 无法设置边框颜色, 背景颜色等, 需要通过 `CSS Custom Properties` 设置, 具体参考 xxx 文档待补充
:::

:::preview
demo-preview=../demo/Card/More.vue
:::

## Card API

### Props

| Name     | Description          | Type                                                             | Default |
| -------- | -------------------- | ---------------------------------------------------------------- | ------- |
| hoverable| 是否启用Hover效果      | `boolean`                                                        | false   |
| round    | 是否启用圆角效果                 | `boolean`        | false    |
| circle | 是否启用圆形效果 | `boolean`                                                           | false   |

### Slots

| Name    | Description        |
| ------- | ------------------ |
| default | 默认插槽, 卡片内容   |
| header |   卡片标题内容     |
| footer |   卡片底部内容     |
| prepend |   卡片前置内容     |
| append |   卡片后置内容     |