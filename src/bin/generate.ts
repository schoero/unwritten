import { quickdoks } from "quickdoks:api:index.js";
import { APIOptions } from "quickdoks:types:options.js";


export async function generate(entryFilePath: string, options?: APIOptions) {
  await quickdoks(entryFilePath, options);
}
