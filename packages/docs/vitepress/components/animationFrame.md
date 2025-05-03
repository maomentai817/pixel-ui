---
title: AnimationFrame
description: AnimationFrame 组件文档

next:
  link: /components/alert
  text: 不知道喵

prev:
  link: /components/tooltip
  text: Tooltip 文字提示
---

# AnimationFrame 动画帧

提供 `stages` 控制 GIF 动画播放, 默认点击进行阶段跳转

## 基础用法

提供一张 GIF 图片, 默认完整播放

:::preview
demo-preview=../demo/AnimationFrame/Basic.vue
:::

## Loop 循环播放

通过 `loop` 属性控制是否循环播放

:::preview
demo-preview=../demo/AnimationFrame/Loop.vue
:::

## Stages 跳转阶段

:::tip
`stages` 属性类型为 `AnimationFrameStage[]` 

其中 `AnimationFrameStage:{start:number;end:number;type:'loop'|'once'}`

点击切换动画阶段, 建议合理运用 GIF 分解工具查看对应帧
:::

通过 `stages` 属性控制 GIF 动画播放, 默认点击进行阶段跳转

:::preview
demo-preview=../demo/AnimationFrame/Stages.vue
:::

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/AnimationFrame/types.ts
:::

```ts
type AnimationFrameType = 'loop' | 'once'

interface AnimationFrameStage {
  start: number
  end: number
  type: AnimationFrameType
}
```
