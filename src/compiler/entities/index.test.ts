import { readdirSync, readFileSync } from "node:fs";
import { basename, dirname } from "node:path/posix";

import { expect, it } from "vitest";

import { scope } from "quickdoks:tests:utils/scope.js";


scope("Integration", "index exports", () => {

  const importUrl = import.meta.url;
  const normalizedImportUrl = importUrl
    .replace(".test.ts", ".ts")
    .replace("file://", "");
  const fileName = basename(normalizedImportUrl);
  const indexFile = readFileSync(normalizedImportUrl, "utf-8");
  const indexExports = indexFile.match(/export \* from "\.\/(.*)";/g);

  const files = readdirSync(dirname(normalizedImportUrl));
  const filesWithoutSelf = files.filter(f => f !== fileName);

  for(const file of filesWithoutSelf){

    if(file.includes(".test.ts")){
      continue;
    }

    it(`should export from all files of the current directory`, () => {
      const exportName = file.replace(".ts", ".js");
      expect(indexExports).to.include(`export * from "./${exportName}";`);
    });

  }

  it(`should not export from itself`, () => {
    const exportName = fileName.replace(".ts", ".js");
    expect(indexExports).not.to.include(`export * from "./${exportName}";`);
  });

});
