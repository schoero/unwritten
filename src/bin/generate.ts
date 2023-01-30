import { unwritten } from "unwritten:api:index.js";

import type { APIOptions } from "unwritten:compiler:type-definitions/options.d.js";


export async function generate(entryFilePath: string, options?: APIOptions) {
  await unwritten(entryFilePath, options);
}
