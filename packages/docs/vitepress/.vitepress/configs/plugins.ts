// configs/plugins.ts
import type { MarkdownRenderer } from 'vitepress'
import {
  containerPreview,
  componentPreview
} from '@vitepress-demo-preview/plugin'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import tooltip from '../plugins/tooltip'
import apiTable from 'vitepress-api-table'

export const mdPlugin = (md: MarkdownRenderer) => {
  md.use(containerPreview)
  md.use(componentPreview)
  md.use(apiTable)
  md.use(tooltip)
  //@ts-ignore 这里报错需要重新装包, 依赖本身问题
  md.use(groupIconMdPlugin)
}
