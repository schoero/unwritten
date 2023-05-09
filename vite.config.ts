import noBundlePlugin from "vite-plugin-no-bundle";

import { config, defineConfig } from "@schoero/vite-config";

import { vitePluginShebang } from "./src/utils/vite-plugin-shebang.js";


export default defineConfig({
  ...config,
  build: {
    emptyOutDir: true,
    lib: {
      entry: "/src/bin/index.ts",
      formats: ["es"]
    },
    minify: false,
    outDir: "lib",
    rollupOptions: {
      external: [
        "cac",
        "typescript",
        "minimatch",
        "node:path",
        "node:fs",
        "node:url",
        "node:os",
        "node:process"
      ]
    },
    target: "es6"
  },
  plugins: [...config.plugins ?? [], noBundlePlugin(), vitePluginShebang()]
});
