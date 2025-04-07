import { makeInstaller } from "@pixel-ui/utils"

import "@hackernoon/pixel-icon-library/fonts/iconfont.css"
import '@pixel-ui/theme/index.css'

import components from "./components"
import printLogo from "./printLogo"

printLogo()
const installer = makeInstaller(components)

export * from '@pixel-ui/components'
// export * from '../components'
export default installer