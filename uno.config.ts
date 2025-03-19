// uno.config.ts
import { defineConfig, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno(),
    // unocss 默认rem，转成px
    presetRemToPx({
      baseFontSize: 4
    }),
  ],
  shortcuts: {
    'f-b': 'flex justify-between items-center',
    'f-c': 'flex justify-center items-center',
    'f-s': 'flex justify-start items-center',
    'f-e': 'flex justify-end items-center',
    'text-overflow': 'truncate',
    'wh-full': 'w-full h-full',
    'f-items-c': 'flex items-center',
    'fd-col': 'flex flex-col',
    'tf-0': 'top-0 left-0',
    'tf-50': 'top-50% left-50%',
    'tf-center': 'top-50% left-50% translate-x--50% translate-y--50%',
    'm-0-auto': 'm-y-0 m-x-auto'
  },
  rules: [
    [/^b-(\d+)$/, (match) => ({ 'border-width': `${match[1]}px` })],
    [
      /^b-(\d+)-#([\w]+)$/,
      (match) => ({ border: `solid ${match[1]}px #${match[2]}` })
    ],
    [
      /^bt-(\d+)-#([\w]+)$/,
      (match) => ({ 'border-top': `solid ${match[1]}px #${match[2]}` })
    ],
    [
      /^bb-(\d+)-#([\w]+)$/,
      (match) => ({ 'border-bottom': `solid ${match[1]}px #${match[2]}` })
    ],
    [
      /^bl-(\d+)-#([\w]+)$/,
      (match) => ({ 'border-left': `solid ${match[1]}px #${match[2]}` })
    ],
    [
      /^br-(\d+)-#([\w]+)$/,
      (match) => ({ 'border-right': `solid ${match[1]}px #${match[2]}` })
    ],
    [
      /^px-(\d+)$/,
      (match) => ({
        'padding-left': `${match[1]}px`,
        'padding-right': `${match[1]}px`
      })
    ],
    [
      /^py-(\d+)$/,
      (match) => ({
        'padding-top': `${match[1]}px`,
        'padding-bottom': `${match[1]}px`
      })
    ],
    [
      /^mx-(\d+)$/,
      (match) => ({
        'margin-left': `${match[1]}px`,
        'margin-right': `${match[1]}px`
      })
    ],
    [
      /^my-(\d+)$/,
      (match) => ({
        'margin-top': `${match[1]}px`,
        'margin-bottom': `${match[1]}px`
      })
    ],
    [/^pt-(\d+)$/, (match) => ({ 'padding-top': `${match[1]}px` })],
    [/^pb-(\d+)$/, (match) => ({ 'padding-bottom': `${match[1]}px` })],
    [/^pl-(\d+)$/, (match) => ({ 'padding-left': `${match[1]}px` })],
    [/^pr-(\d+)$/, (match) => ({ 'padding-right': `${match[1]}px` })],
    [/^mt-(\d+)$/, (match) => ({ 'margin-top': `${match[1]}px` })],
    [/^mb-(\d+)$/, (match) => ({ 'margin-bottom': `${match[1]}px` })],
    [/^ml-(\d+)$/, (match) => ({ 'margin-left': `${match[1]}px` })],
    [/^mr-(\d+)$/, (match) => ({ 'margin-right': `${match[1]}px` })],
    [/^bgc-#([\w]+)$/, (match) => ({ 'background-color': `#${match[1]}` })],
    [/^f-(\d+)$/, (match) => ({ flex: `${match[1]}` })],
    [
      /^hl-(\d+)$/,
      (match) => ({ height: `${match[1]}px`, 'line-height': `${match[1]}px` })
    ],
    [/^fs-(\d+)$/, (match) => ({ 'font-size': `${match[1]}px` })],
    [
      /^wh-(\d+)$/,
      (match) => ({ width: `${match[1]}px`, height: `${match[1]}px` })
    ]
  ]
})