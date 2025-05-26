import Message from './methods'
import { withInstallFunction } from '@pixel-ui/utils'

export const PxMessage = withInstallFunction(Message, '$message')

export * from './types'
