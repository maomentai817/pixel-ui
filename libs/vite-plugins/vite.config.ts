import { defineConfig } from "vite"
import { resolve } from "path"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    dts({
      include: ["./**/*.ts"],
      exclude: ["./vite.config.ts"],
    }),
  ],
  build: {
    minify: false,
    outDir: ".dist",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "vitePlugins",
    },
    rollupOptions: {
      external: ["shelljs", "lodash-es"],
      output: [
        {
          format: "esm",
          entryFileNames: "index.mjs",
        },
        {
          format: "cjs",
          entryFileNames: "index.cjs",
        },
      ],
    },
  },
})
