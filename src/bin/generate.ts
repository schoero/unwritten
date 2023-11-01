import { unwritten } from "unwritten:api/node.entry";

import type { APIOptions } from "unwritten:type-definitions/options";


export async function generate(entryFilePaths: string[], options?: APIOptions) {
  await unwritten(entryFilePaths, options);
}
