import { config, defineConfig } from "@schoero/configs/vite";
import shebang from "rollup-plugin-preserve-shebang";
import dts from "vite-plugin-dts";
import noBundlePlugin from "vite-plugin-no-bundle";

import type { UserConfig } from "vitest";


export default defineConfig(<UserConfig>{
  ...config,
  build: {
    emptyOutDir: true,
    lib: {
      entry: ["/src/bin/index.ts"],
      formats: ["es"]
    },
    minify: false,
    outDir: "lib/node",
    rollupOptions: {
      external: [
        /node_modules/,
        /^node:.*/
      ]
    },
    target: "ES2020"
  },
  plugins: [
    ...config.plugins ?? [],
    noBundlePlugin(),
    shebang(),
    dts({
      entryRoot: "./src",
      exclude: ["src/**/*.test.ts", "test/**"],
      pathsToAliases: true,
      strictOutput: true
    })
  ]
});
