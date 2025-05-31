import Notification from './methods'
import { withInstallFunction } from '@pixel-ui/utils'

export const PxNotification = withInstallFunction(Notification, '$notify')

export * from './types'
