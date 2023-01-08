import { quickdoks } from "quickdoks:api:index.js";

import type { APIOptions } from "quickdoks:compiler:type-definitions/options.d.js";


export async function generate(entryFilePath: string, options?: APIOptions) {
  await quickdoks(entryFilePath, options);
}
