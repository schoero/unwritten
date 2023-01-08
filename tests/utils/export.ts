import { readdirSync, readFileSync } from "node:fs";
import { basename, dirname } from "node:path/posix";


export function getFilesInDirectory(importURL: string) {

  const normalizedImportUrl = normalizeImportUrl(importURL);

  const fileName = basename(normalizedImportUrl);
  const files = readdirSync(dirname(normalizedImportUrl));

  return files.filter(f => f !== fileName.replace(".test.ts", ".ts"))
    .filter(f => !f.includes(".test.ts"));

}


export function getExportsFromIndexFile(importURL: string) {

  const normalizedImportUrl = normalizeImportUrl(importURL);
  const indexTSFilePath = normalizedImportUrl.replace(".test.ts", ".ts");

  const indexFile = readFileSync(indexTSFilePath, "utf-8");
  const indexExports = indexFile.match(/export \* from "\.\/(.*)";/g);

  return indexExports;

}


function normalizeImportUrl(importUrl: string) {
  return importUrl.replace("file://", "");
}
