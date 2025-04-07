import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { readdirSync } from 'fs'
import { map, filter, delay } from 'lodash-es'
import shell from 'shelljs'

import hooks from './hooksPlugin'

function getDirectoriesSync(basePath: string) { 
  const entries = readdirSync(basePath, { withFileTypes: true })

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  )
}

const TRY_MOVE_STYLES_DELAY = 800 as const
const moveStyles = () => {
  try {
    readdirSync('./dist/es/theme')
    shell.mv('./dist/es/theme', './dist')
  } catch (_) {
    delay(moveStyles, TRY_MOVE_STYLES_DELAY)
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }),
    hooks({
      rmFiles: ['./dist/es', './dist/theme', './dist/types'],
      afterBuild: moveStyles
    })

  ],
  build: {
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'PixelUI',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        "@hackernoon/pixel-icon-library",
        "@popperjs/core",
        "async-validator",
      ],
      treeshake: {
        propertyReadSideEffects: false
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css'
          if (
            assetInfo.type === "asset" &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string
        },
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('/packages/hooks')) { 
            return 'hooks'
          }
          if (id.includes('/packages/utils')) { 
            return 'utils'
          }
          for (const dirName of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName;
            }
          }
        }
      },
    }
  }
})