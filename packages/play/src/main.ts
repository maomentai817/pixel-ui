import { createApp } from 'vue'
import App from './App.vue'
import PixelUI from 'pixel-ui'
import 'virtual:uno.css'

const app = createApp(App)

// install pixel-ui components
app.use(PixelUI)

app.mount('#app')
