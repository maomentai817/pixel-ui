import { createApp } from 'vue'
import App from './App.vue'
import PixelUI from '@mmt817/pixel-ui'
import '@mmt817/pixel-ui/dist/index.css'
import 'virtual:uno.css'

const app = createApp(App)

// install pixel-ui components
app.use(PixelUI)

app.mount('#app')
