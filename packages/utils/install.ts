import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'

type SFCWithInstall<T> = T & Plugin

// installer
export const makeInstaller = (components: Plugin[]) => {
  const installer = (app: App) =>
    each(components, (component) => app.use(component))

  return installer as Plugin
}

// component install function
export const withInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name
    app.component(name, component as Plugin)
  }

  return component as SFCWithInstall<T>
}
