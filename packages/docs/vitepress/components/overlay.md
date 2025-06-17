---
title: Overlay
description: Overlay 组件文档

next:
  link: /components/text
  text: Text 文本

prev:
  link: /components/icon
  text: Icon 图标
---

# Overlay 遮罩层

向指定元素添加遮罩层, 常用于模态框、抽屉等组件背景。

## 基础用法

通过 `mask` 属性控制遮罩层**样式上的**显示隐藏, 通过 `zIndex` 属性设置遮罩层层级

设置在 `px-overlay` 上的 `attrs` 会被拦截, 自定义类名列表可通过 `overlayClass` 添加

:::warning
`mask` 属性仅控制**遮罩层显示**, 仅属于样式上的区分, 对于插槽内容不做处理

页面滚动的锁定与 `px-overlay` 卸载挂载关联, 建议使用 `v-if` 控制实例创建销毁
:::

::: preview
demo-preview=../demo/Overlay/Basic.vue
:::

## 自定义颜色

通过 `color` 设置默认遮罩层颜色

:::tip
`grid`, `preset` 等预设装饰性遮罩层优先级高于 `color` 自定义颜色

其颜色通过 `--px-grid-color-1` 等属性修改
:::

::: preview
demo-preview=../demo/Overlay/Color.vue
:::

## 网格背景-默认

通过 `grid` 属性设置网格背景

::: preview
demo-preview=../demo/Overlay/Grid.vue
:::

## 网格背景-预设1

通过 `preset1` 预设网格背景-1, 同时可通过 `matte` 属性设置遮罩层 **哑光** 效果

::: preview
demo-preview=../demo/Overlay/Preset1.vue
:::


## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Overlay/types.ts
:::