// import { makeInstaller } from '@pixel-ui/utils'

import '@hackernoon/pixel-icon-library/fonts/iconfont.css'
import '@pixel-ui/theme/index.css'

import components from './components'
import printLogo from './printLogo'
import makeInstaller from './makeInstaller'

printLogo()
const installer = makeInstaller(components)

export * from '@pixel-ui/components'
export * from '@pixel-ui/locale'
export default installer
