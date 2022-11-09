import { describe, expect, it } from "vitest";

import { createNamespaceBySymbol } from "../src/compiler/entities/namespace.js";
import { compile } from "./utils/compile.js";


describe("Compiler: Namespace", () => {

  const testFileContent = `
    export namespace TestNamespace {
      export type TestType = string;
    }
  `;

  const { exportedSymbols, ctx } = compile(testFileContent.trim());

  const exportedNamespace = createNamespaceBySymbol(ctx, exportedSymbols[0]!);

  it("should export a namespace", () => {
    expect(exportedNamespace.name).to.equal("TestNamespace");
  });

  it("should have parsed exports", () => {
    expect(exportedNamespace.exports.length).to.equal(1);
  });

});
