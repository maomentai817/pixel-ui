import { each } from 'lodash-es'
import type { App, Plugin } from 'vue'
import {
  provideGlobalConfig,
  type ConfigProviderProps
} from '@pixel-ui/components'

export function makeInstaller(componets: Plugin[]) {
  const installer = (app: App, opts?: ConfigProviderProps) => {
    each(componets, (c) => app.use(c))
    if (opts) provideGlobalConfig(opts, app, true)
  }

  return installer as Plugin
}

export default makeInstaller
