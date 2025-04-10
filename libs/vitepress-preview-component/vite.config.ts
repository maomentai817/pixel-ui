import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    outDir: ".dist",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "previewComponent",
      fileName: "preview-component",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue(), dts({ insertTypesEntry: true })],
});
