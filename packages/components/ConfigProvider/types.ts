import type { Language, TranslatePair } from '@pixel-ui/locale'

export interface ConfigProviderProps {
  /**
   * @property locale
   * @type Object - {name: string, el: TranslatePair}
   * @description 翻译文本对象
   * @default en
   */
  locale?: Language
  /**
   * @property extendsI18nMsg
   * @type {TranslatePair}
   * @description 扩展翻译文本对象
   * @default {}
   */
  extendsI18nMsg?: TranslatePair
}

export interface ConfigProviderSlots {
  /**
   * @property default
   * @description 自定义默认内容,提供全局配置
   */
  default: () => string
}
