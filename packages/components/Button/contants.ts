import type { InjectionKey } from 'vue'
import type { ButtonGroupContext } from './types.buttonGroup'

export const BUTTON_GROUP_CTX_KEY: InjectionKey<ButtonGroupContext> = Symbol(
  'BUTTON_GROUP_CTX_KEY'
)
