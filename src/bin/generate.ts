import { quickdoks } from "../api/index.js";
import { APIOptions } from "../types/options.js";


export async function generate(entryFilePath: string, options?: APIOptions) {
  await quickdoks(entryFilePath, options);
}
