import { quickdoks } from "quickdoks:api:index.js";

import { APIOptions } from "quickdoks:type-definitions/options.d.js";


export async function generate(entryFilePath: string, options?: APIOptions) {
  await quickdoks(entryFilePath, options);
}
