import { getExportsFromIndexFile, getFilesInDirectory } from "unwritten:tests:utils/export";
import { scope } from "unwritten:tests:utils/scope";
import { expect, it } from "vitest";


scope("Interpreter", "Entities", () => {

  const importUrl = import.meta.url;

  const exportedFiles = getFilesInDirectory(importUrl).filter(file => !file.includes(".test.ts"));
  const indexExports = getExportsFromIndexFile(importUrl);

  it.each(exportedFiles)("should export from all files of the current directory", file => {
    const exportName = file.replace(".ts", "");
    expect(indexExports).toContain(`export * from "./${exportName}";`);
  });

  it("should not export from itself", () => {
    expect(indexExports).not.toContain("export * from \"./index.js\";");
  });

});
