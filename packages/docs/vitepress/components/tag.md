# Tag 标签

用于标记和分类。

## 基础用法

基础的标签用法, 可以通过`type`属性设置不同的标签类型。

:::preview
demo-preview=../demo/Tag/Basic.vue
:::

## 可关闭标签

设置`closable`属性可以定义一个标签是否可关闭, 关闭时会触发`close`事件。

:::preview
demo-preview=../demo/Tag/Closable.vue
:::

## 不同尺寸

Tag组件提供了三种不同尺寸, 用于不同场景。

:::preview
demo-preview=../demo/Tag/Size.vue
:::

## 主题

Tag 组件提供了三种主题：`light` (亮色), `dark` (暗色), `plain` (描边)

通过设置 `effect` 属性来改变主题, 默认为 `light`。

:::preview
demo-preview=../demo/Tag/Effect.vue
:::

## 圆角标签

Tag 提供了圆角边框, 通过设置 `round`, `circle`, `chubby` 属性来改变标签的形状, 默认为 `false`。

:::preview
demo-preview=../demo/Tag/Round.vue
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
