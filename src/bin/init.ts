import { generateConfig } from "unwritten:config/generator.entry.js";


export async function init(path?: string, options?: any) {
  await generateConfig(path, options);
}
