import { generateConfig } from "unwritten:config/generator.js";


export async function init(path?: string, options?: any) {
  await generateConfig(path, options);
}
