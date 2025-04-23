// configs/plugins.ts
import type { MarkdownRenderer } from 'vitepress'
import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin"
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
// import apiTable from "vitepress-api-table"

export const mdPlugin = (md: MarkdownRenderer) => { 
  md.use(containerPreview)
  md.use(componentPreview)
  // md.use(apiTable)
  md.use(groupIconMdPlugin)
}
