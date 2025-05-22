import type { App, Plugin } from 'vue'

type SFCWithInstall<T> = T & Plugin

// component install function
export const withInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name
    app.component(name, component as Plugin)
  }

  return component as SFCWithInstall<T>
}
