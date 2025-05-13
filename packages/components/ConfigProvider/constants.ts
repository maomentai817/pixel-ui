import type { ConfigProviderProps } from './types'
import type { InjectionKey, Ref } from 'vue'

// 注入上下文属性可选
export type ConfigProviderContext = Partial<ConfigProviderProps>

export const ConfigProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol()
