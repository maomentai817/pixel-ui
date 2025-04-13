---
title: AnimationFrame
description: AnimationFrame 组件文档

next:
  link: /components/alert
  text: 不知道喵

prev:
  link: /components/alert
  text: Alert 提示
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

## AnimationFrame API

### Props

| Name     | Description          | Type                                                             | Default |
| -------- | -------------------- | ---------------------------------------------------------------- | ------- |
| src| 图片地址      | `string`                                                        |    |
| stages    | 动画帧控制器                 | `AnimationFrameStage[]`-`{start: number; end: number; type: loop \| once }`        | []    |
| loop    | 是否循环播放                 | `boolean`                                     | false    |
| width    | 图片宽度                 | `number`                                     | 320    |
| height    | 图片高度                 | `number`                                     | 320    |

### Events
| Name     | Description          | Type                                                             |
| -------- | -------------------- | ---------------------------------------------------------------- |
| click | 点击事件 | `(event: MouseEvent) => void`                                      |
