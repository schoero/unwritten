import type { NormalizedOutputOptions, OutputBundle } from "rollup";


export function vitePluginShebang() {
  const filesWithShebang = new Map<string, string>();
  return {
    generateBundle: async (_: NormalizedOutputOptions, bundle: OutputBundle) => {
      for(const relativeFilePath in bundle){
        const file = bundle[relativeFilePath];
        const id = file.type === "chunk" && file.facadeModuleId;
        const shebang = id && filesWithShebang.get(id);

        if(!shebang){
          continue;
        }

        file.code = `${shebang}\n${file.code}`;
      }
    },
    name: "vite-plugin-shebang",
    transform: async (code: string, id: string) => {
      const firstLine = code.substring(0, code.indexOf("\n"));
      if(firstLine.startsWith("#!")){
        filesWithShebang.set(id, firstLine);
      }
      return code;
    }
  };
}
