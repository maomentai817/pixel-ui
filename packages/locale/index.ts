export { default as en } from './lang/en'
export { default as zhCN } from './lang/zh-cn'
export { default as zhTW } from './lang/zh-tw'
export { default as ja } from './lang/ja'

export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair
}

export type Language = {
  name: string
  el: TranslatePair
}
