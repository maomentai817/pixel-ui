import type { App } from "vue";
import { ElementPlusContainer } from "vitepress-preview-component";
import DefaultTheme from "vitepress/theme-without-fonts";
import PixelUI from "@mmt817/pixel-ui";

import "vitepress-preview-component/style.css";
import '@hackernoon/pixel-icon-library/fonts/iconfont.css'
import '@mmt817/pixel-ui/dist/index.css'
import './index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(PixelUI);
  },
};