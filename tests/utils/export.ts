import { readdirSync, readFileSync } from "unwritten:platform/file-system/node.js";
import { getDirectory, getFileName, normalize } from "unwritten:platform/path/node.js";


export function getExportsFromIndexFile(importURL: string) {

  const path = normalize(importURL);

  const indexTSFilePath = path.replace(".test.ts", ".ts");

  const indexFile = readFileSync(indexTSFilePath);
  const indexExports = indexFile.match(/export \* from "\.\/(.*)";/g);

  return indexExports;

}


export function getFilesInDirectory(importURL: string) {

  const path = normalize(importURL);
  const fileName = getFileName(path);
  const dirName = getDirectory(path);
  const files = readdirSync(dirName);

  return files.filter(f => f !== fileName.replace(".test.ts", ".ts"))
    .filter(f => !f.includes(".test.ts"));

}
