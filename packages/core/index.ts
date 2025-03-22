import { makeInstaller } from "@pixel-ui/utils"
import components from "./components"
import "@hackernoon/pixel-icon-library/fonts/iconfont.css"
import '@pixel-ui/theme/index.css'

const installer = makeInstaller(components)

export * from '@pixel-ui/components'
export default installer