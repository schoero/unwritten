import shebang from "rollup-plugin-preserve-shebang";
import noBundlePlugin from "vite-plugin-no-bundle";

import { config, defineConfig } from "@schoero/vite-config";


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
  plugins: [...config.plugins ?? [], noBundlePlugin(), shebang()]
});
