import {
  ref,
  getCurrentInstance,
  inject,
  computed,
  provide,
  unref,
  watch
} from 'vue'
import { createI18n, i18nSymbol } from 'vue3-i18n'
import English from '@pixel-ui/locale/lang/en'
import { merge } from 'lodash-es'
import { debugWarn } from '@pixel-ui/utils'
import {
  ConfigProviderContextKey,
  type ConfigProviderContext
} from './constants'
import type { MaybeRef, Ref, App } from 'vue'
import type { TranslatePair } from '@pixel-ui/locale'

const globalConfig = ref<ConfigProviderContext>()

// 获取某个配置项,类型推断
export function useGlobalConfig<
  K extends keyof ConfigProviderContext,
  D extends ConfigProviderContext[K]
>(_key: K, _defaultVal?: D): Ref<Exclude<ConfigProviderContext[K], void>>
// 获取整个全局配置对象
export function useGlobalConfig(): Ref<ConfigProviderContext>

export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultVal = void 0
) {
  // 如果在组件上下文中, 优先使用注入的 config; 否则 fallback 到全局默认值
  const config = getCurrentInstance()
    ? inject(ConfigProviderContextKey, globalConfig)
    : globalConfig
  // 如果传入 key, 返回对应配置项的 computed 值
  // 否则直接返回整个 config ref
  return key ? computed(() => config.value?.[key] ?? defaultVal) : config
}

const _createI18n = (opts?: ConfigProviderContext) => {
  const mergeMsg = (msg: TranslatePair) =>
    merge(msg, opts?.extendsI18nMsg ?? {})

  if (!opts?.locale) {
    return createI18n({
      locale: 'en',
      messages: mergeMsg({
        en: English
      })
    })
  }

  return createI18n({
    locale: opts.locale?.name || 'en',
    messages: mergeMsg({
      en: English,
      [opts.locale?.name]: opts.locale ?? {}
    })
  })
}

// hook
export function provideGlobalConfig(
  config: MaybeRef<ConfigProviderContext> = { locale: English },
  app?: App,
  global = false
) {
  const instance = getCurrentInstance()
  const oldConfig = instance ? useGlobalConfig() : void 0
  const provideFn = app?.provide ?? (instance ? provide : void 0)

  if (!provideFn) {
    debugWarn(
      'provideGlobalConfig',
      'provideGlobalConfig() can only be used inside setup()'
    )
    return
  }

  const context = ref(unref(config))
  watch(
    () => config,
    (val) => {
      const cfg = unref(val)
      if (!oldConfig?.value) return cfg
      context.value = merge(oldConfig.value, cfg)
    },
    { deep: true }
  )

  const i18n = ref(_createI18n(context.value))
  watch(
    () => context.value,
    (val) => (i18n.value = _createI18n(val)),
    { deep: true }
  )

  provideFn(ConfigProviderContextKey, context)
  provideFn(i18nSymbol, i18n)

  if (app) app.use(i18n.value)
  if (global || !globalConfig.value) globalConfig.value = context.value

  return context
}
