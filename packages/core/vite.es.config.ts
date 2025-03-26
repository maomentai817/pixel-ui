import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

const COMP_NAMES = [
  'Alert',
  'Button',
  'Collapse',
  'Dropdown',
  'Form',
  'Icon',
  'Input',
  'Loading',
  'Message',
  'MessageBox',
  'Notification',
  'Overlay',
  'Popconfirm',
  'Select',
  'Switch',
  'Tooltip',
  'Upload'
] as const

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    })
  ],
  build: {
    outDir: 'dist/es',
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
          for (const item of COMP_NAMES) { 
            if (id.includes(`/packages/components/${item}`)) { 
              return item
            }
          }
        }
      },
    }
  }
})