import type { NormalizedOutputOptions, OutputBundle } from "rollup";


export function vitePluginShebang() {
  const shebang = "#!/usr/bin/env node";
  return {
    async generateBundle(_: NormalizedOutputOptions, bundle: OutputBundle) {
      for(const fileName in bundle){
        const file = bundle[fileName];
        const dirName = fileName
          .split("/")
          .at(-2);
        if(file.type === "chunk" && dirName === "bin"){
          file.code = `${shebang}\n${file.code}`;
        }
      }
    },
    name: "vite-plugin-shebang"
  };
}