import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind } from "quickdoks:types:types.js";

import { createNamespaceBySymbol } from "./namespace.js";


scope("Compiler", Kind.Namespace, () => {

  const testFileContent = ts`
    export namespace TestNamespace {
      export type TestType = string;
    }
  `;

  const { exportedSymbols, ctx } = compile(testFileContent);

  const symbol = exportedSymbols.find(s => s.name === "TestNamespace")!;
  const exportedNamespace = createNamespaceBySymbol(ctx, symbol);

  it("should export a namespace", () => {
    expect(exportedNamespace.name).to.equal("TestNamespace");
  });

  it("should have parsed exports", () => {
    expect(exportedNamespace.exports.length).to.equal(1);
  });

});
