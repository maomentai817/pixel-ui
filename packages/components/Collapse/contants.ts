import type { InjectionKey } from 'vue'
import type { CollapseContext } from './types'

export const COLLAPSE_CTX_KEY: InjectionKey<CollapseContext> =
  Symbol('COLLAPSE_CTX_KEY')
