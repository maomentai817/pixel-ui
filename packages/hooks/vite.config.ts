import { resolve } from 'path'
import { defineConfig } from 'vite'
import { last, split, first, includes } from 'lodash-es'
import { hooksPlugin as hooks } from '@pixel-ui/vite-plugins'

import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      include: ['./**/*.ts'],
      exclude: ['./vite.config.ts']
    }),
    hooks({
      rmFiles: ['./dist']
    })
  ],
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'hooks',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', 'lodash-es', 'vue3-i18n'],
      output: {
        manualChunks(id) {
          if (includes(id, '/packages/hooks/use'))
            return first(split(last(split(id, '/')), '.'))
        }
      }
    }
  }
})
