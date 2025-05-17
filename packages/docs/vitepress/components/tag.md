# Tag 标签

用于标记和分类。

## 基础用法

基础的标签用法，可以通过`type`属性设置不同的标签类型。

:::preview
demo-preview=../demo/Tag/Basic.vue
:::

## 可关闭标签

设置`closable`属性可以定义一个标签是否可关闭，关闭时会触发`close`事件。

:::preview
demo-preview=../demo/Tag/Closable.vue
:::

## 不同尺寸

Tag组件提供了三种不同尺寸，用于不同场景。

:::preview
demo-preview=../demo/Tag/Size.vue
:::

## 主题

Tag组件提供了两种主题：`filled`（填充）和 `plain`（描边）。

通过设置 `effect` 属性来改变主题, 默认为 `filled`。

:::preview
demo-preview=../demo/Tag/Effect.vue
:::

## 禁用状态

可以使用`disabled`属性来定义标签是否被禁用。

:::preview
demo-preview=../demo/Tag/Disabled.vue
:::

## 自定义颜色

可以通过`color`属性设置标签的自定义颜色。

:::preview
demo-preview=../demo/Tag/CustomColor.vue
:::

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Tag/types.ts
:::
