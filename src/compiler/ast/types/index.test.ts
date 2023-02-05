import { expect, it } from "vitest";

import { getExportsFromIndexFile, getFilesInDirectory } from "unwritten:tests:utils/export.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Compiler", "Types", () => {

  const importUrl = import.meta.url;

  const exportedFiles = getFilesInDirectory(importUrl);
  const indexExports = getExportsFromIndexFile(importUrl);

  for(const file of exportedFiles){

    if(file.includes(".test.ts")){
      continue;
    }

    it("should export from all files of the current directory", () => {
      const exportName = file.replace(".ts", ".js");
      expect(indexExports).to.include(`export * from "./${exportName}";`);
    });

  }

  it("should not export from itself", () => {
    expect(indexExports).not.to.include(`export * from "./index.js";`);
  });

});
