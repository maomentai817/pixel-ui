import { computed, inject, ref, unref, type Ref } from 'vue'
import { omit } from 'lodash-es'
import { createI18n, i18nSymbol, type I18nInstance } from 'vue3-i18n'
import English from '@pixel-ui/locale/lang/en'

import type { Language } from '@pixel-ui/locale'

// const omitInstall = (i18n: I18nInstance) => omit(i18n, ['install'])
const omitInstall = (i18n: I18nInstance): Omit<I18nInstance, 'install'> =>
  omit(i18n, ['install']) as Omit<I18nInstance, 'install'>

export const useLocale = (localeOverrides?: Ref<Language>) => {
  if (!localeOverrides) {
    const i18n: Ref<I18nInstance> =
      inject(i18nSymbol) ??
      ref(createI18n({ locale: English.name, messages: { en: English } }))

    return computed(() => omitInstall(unref(i18n)))
  }

  return computed(() =>
    omitInstall(
      createI18n({
        locale: localeOverrides.value.name,
        messages: {
          en: English,
          [localeOverrides.value.name]: localeOverrides.value
        }
      })
    )
  )
}

export default useLocale
