import { unwritten } from "unwritten:api:index.js";

import type { APIOptions } from "unwritten:type-definitions/options.js";


export async function generate(entryFilePath: string, options?: APIOptions) {
  await unwritten(entryFilePath, options);
}
