---
title: Loading
description: Loading 组件文档

next:
  link: /components/message
  text: Message 消息提示

prev:
  link: /components/alert
  text: Alert 提示
---

# Loading 加载

加载数据时显示动效。

## 区域加载

在需要的时候展示加载动画, 防止页面失去响应提高用户体验。

Pixel UI 提供了两种调用 Loading 的方法: 指令和服务。对于自定义指令 `v-loading`, 只需要绑定 `boolean` 值即可。默认状况下, Loading 遮罩会插入到绑定元素的子节点。通过添加 `body` 修饰符, 可以使遮罩插入至 Dom 中的 body 上。

:::preview
demo-preview=../demo/Loading/Basic.vue
:::

## 自定义组件内容​

你可以自定义加载中组件的文字, 图标, 以及背景颜色。

在绑定了 `v-loading` 指令的元素上添加 `px-loading-text` 属性, 其值会被渲染为加载文案, 并显示在加载图标的下方。类似地, `px-loading-spinner`、`px-loading-background` 和 `px-loading-customClass` 属性分别用来设定加载图标、背景色值、自定义类名。

:::preview
demo-preview=../demo/Loading/Custom.vue
:::

## 自定义遮罩层

同 [Overlay](/components/overlay) 组件类似, 提供了 `grid`, `matte`, `preset1` 属性, 用于设置遮罩层的样式。

:::preview
demo-preview=../demo/Loading/Overlay.vue
:::

## 全屏加载

加载数据时显示全屏动画。

当使用指令方式时, 全屏遮罩需要添加 `fullscreen` 修饰符 (遮罩会插入至 body 上) 此时若需要锁定屏幕的滚动, 可以使用 `lock` 修饰符; 当使用服务方式时, 遮罩默认即为全屏, 无需额外设置。

:::preview
demo-preview=../demo/Loading/Fullscreen.vue
:::

## 服务方式调用

Loading 还可以通过服务的方式调用。可以这样引入 Loading 服务:

```ts
import { PxLoading } from '@mmt817/pixel-ui'
```

在需要时通过下面的方式调用: 

```ts
PxLoading.service(options)
```

其中 `options` 参数为 Loading 的配置项, 具体见下表。`LoadingService` 会返回一个 Loading 实例, 可以通过调用该实例的 `close` 方法来关闭当前 Loading:

```ts
const loadingInstance = PxLoading.service(options)
nextTick(() => {
  // loading should be closed asynchronously
  loadingInstance.close()
})
```

需要注意的是, 以服务的方式调用的全屏 Loading 是单例的。若在前一个全屏 Loading 关闭前再次调用全屏 Loading, 并不会创建一个新的 Loading 实例, 而是返回现有全屏 Loading 的实例

```ts
const loadingInstance1 = PxLoading.service({ fullscreen: true })
const loadingInstance2 = PxLoading.service({ fullscreen: true })
console.log(loadingInstance1 === loadingInstance2) // true
```

此时调用它们中任意一个的 `close` 方法都能关闭这个全屏 Loading。

如果完整引入了 Pixel UI, 那么 `app.config.globalProperties` 上会有一个全局方法 `$loading`, 它的调用方式为: `this.$loading(options)`, 同样会返回一个 Loading 实例。

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/Loading/types.ts
:::
