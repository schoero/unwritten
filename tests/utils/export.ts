import { basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { readdirSync, readFileSync } from "unwritten:platform/file-system/node.js";


export function getExportsFromIndexFile(importURL: string) {

  const path = fileURLToPath(importURL);

  const indexTSFilePath = path.replace(".test.ts", ".ts");

  const indexFile = readFileSync(indexTSFilePath);
  const indexExports = indexFile.match(/export \* from "\.\/(.*)";/g);

  return indexExports;

}


export function getFilesInDirectory(importURL: string) {

  const path = fileURLToPath(importURL);
  const fileName = basename(path);
  const dirName = dirname(path);
  const files = readdirSync(dirName);

  return files.filter(f => f !== fileName.replace(".test.ts", ".ts"))
    .filter(f => !f.includes(".test.ts"));

}
