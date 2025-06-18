---
title: Config Provider
description: ConfigProvider 组件文档

next:
  link: /components/input
  text: Input 输入框

prev:
  link: /components/text
  text: Text 文本
---

# ConfigProvider 全局配置

Config Provider 被用来提供全局的配置选项, 让你的配置能够在全局都能够被访问到。

## i18n 配置

通过 Config Provider 来配置多语言, 让你的应用可以随时切换语言。

语言包文件存放在 `packages/locale/lang` 目录下, 默认语言为 `en`, 当前支持的语言包有`en`、`zhCN`、`zhTW`、`ja`

:::tip
Config Provider 还支持拓展翻译文本对象, 通过配置一个类型为 `TranslatePair` 的属性 `extendsI18nMsg` 实现, 具体格式参考语言包文件解构
:::

:::preview
demo-preview=../demo/ConfigProvider/I18n.vue
:::

## 实验性功能

在本节中, 您可以学习如何使用 Config Provider 来提供实验性功能。 现在, 我们还没有添加任何实验性功能, 但在未来的规划中, 我们将添加一些实验性功能。 您可以使用此配置来管理这些功能。

## API_Table插件测试

:::danger
该插件基于 `markdown-it` 开发, 解析组件 `types.ts` 文件生成 API 表格, 测试中
:::

::: api-table src=components/ConfigProvider/types.ts
:::

