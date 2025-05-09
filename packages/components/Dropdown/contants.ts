import type { InjectionKey } from 'vue'
import type { DropdownContext } from './types.dropdown'

export const DROPDOWN_CTX_KEY: InjectionKey<DropdownContext> =
  Symbol('DROPDOWN_CTX_KEY')
