import dts from "vite-plugin-dts";
import noBundlePlugin from "vite-plugin-no-bundle";

import { config, defineConfig } from "@schoero/vite-config";

import type { UserConfig } from "vitest";


export default defineConfig(<UserConfig>{
  ...config,
  build: {
    emptyOutDir: true,
    lib: {
      entry: ["/src/api/browser.entry.ts"],
      formats: ["es"]
    },
    minify: false,
    outDir: "lib/browser",
    rollupOptions: {
      external: [
        "minimatch",
        "typescript",
        /node_modules/,
        /^node:.*/
      ]
    },
    target: "es6"
  },
  plugins: [
    ...config.plugins ?? [],
    noBundlePlugin(),
    dts({
      entryRoot: "./src",
      exclude: ["src/**/*.test.ts", "test/**"],
      pathsToAliases: true,
      strictOutput: true
    })
  ]
});
