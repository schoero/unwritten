import { generateConfig } from "unwritten:config/generator.entry";


export async function init(path?: string, options?: any) {
  await generateConfig(path, options);
}
