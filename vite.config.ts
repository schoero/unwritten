import shebang from "rollup-plugin-preserve-shebang";
import dts from "vite-plugin-dts";
import noBundlePlugin from "vite-plugin-no-bundle";

import { config, defineConfig } from "@schoero/vite-config";

/** @type {import('vitest/config').UserConfig} */
export default defineConfig({
  ...config,
  build: {
    emptyOutDir: true,
    lib: {
      entry: ["/src/bin/index.ts", "/src/api/browser.entry.ts"],
      formats: ["es"]
    },
    minify: false,
    outDir: "lib",
    rollupOptions: {
      external: [
        /node_modules/,
        /^node:.*/
      ]
    },
    target: "es6"
  },
  plugins: [
    ...config.plugins ?? [],
    noBundlePlugin(),
    shebang(),
    dts({
      entryRoot: "./src",
      exclude: ["src/**/*.test.ts", "test/**"],
      pathsToAliases: true
    })
  ]
});
