import { unwritten } from "unwritten:api/node.entry.js";

import type { APIOptions } from "unwritten:type-definitions/options.js";


export async function generate(entryFilePaths: string[], options?: APIOptions) {
  await unwritten(entryFilePaths, options);
}
