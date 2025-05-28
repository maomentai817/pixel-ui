// import { makeInstaller } from '@pixel-ui/utils'

import '@hackernoon/pixel-icon-library/fonts/iconfont.css'
import '@pixel-ui/theme/index.css'

import components from './components'
import printLogo from './printLogo'
import makeInstaller from './makeInstaller'

// 统一注册 paintWorklet
import { registerPaintWorklets } from '@pixel-ui/components'

printLogo()

// 注册组件之前执行 Paint Worklet 注册
registerPaintWorklets()
const installer = makeInstaller(components)

export * from '@pixel-ui/components'
// export * from '@pixel-ui/locale'
export { en, zhCN, zhTW, ja } from '@pixel-ui/locale'
export default installer
