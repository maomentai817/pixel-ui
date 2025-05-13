import ConfigProvider from './ConfigProvider.vue'
import { withInstall } from '@pixel-ui/utils'

export const PxConfigProvider = withInstall(ConfigProvider)

export * from './types'
export * from './hooks'
