import { makeInstaller } from "@pixel-ui/utils"
import components from "./components"
import "@hackernoon/pixel-icon-library/fonts/iconfont.css"
import printLogo from "./printLogo"
import '@pixel-ui/theme/index.css'

printLogo()
const installer = makeInstaller(components)

export * from '@pixel-ui/components'
// export * from '../components'
export default installer