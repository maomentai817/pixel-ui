// configs/vite.ts
import { PluginOption } from 'vite'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import UnoCSS from 'unocss/vite'

export const viteConfig = {
  plugins: [UnoCSS(), groupIconVitePlugin()]
} satisfies {
  plugins: PluginOption[]
}
