import { expect, it } from "vitest";

import { getExportsFromIndexFile, getFilesInDirectory } from "unwritten:tests:utils/export.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Interpreter", "Entities", () => {

  const importUrl = import.meta.url;

  const exportedFiles = getFilesInDirectory(importUrl).filter(file => !file.includes(".test.ts"));
  const indexExports = getExportsFromIndexFile(importUrl);

  it.each(exportedFiles)("should export from all files of the current directory", file => {
    const exportName = file.replace(".ts", ".js");
    expect(indexExports).toContain(`export * from "./${exportName}";`);
  });

  it("should not export from itself", () => {
    expect(indexExports).not.toContain("export * from \"./index.js\";");
  });


});
