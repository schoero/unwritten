import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind } from "../../types/types.js";
import { createNamespaceBySymbol } from "./namespace.js";


scope("Compiler", TypeKind.Namespace, () => {

  const testFileContent = ts`
    export namespace TestNamespace {
      export type TestType = string;
    }
  `;

  const { exportedSymbols, ctx } = compile(testFileContent.trim());

  const symbol = exportedSymbols.find(s => s.name === "TestNamespace")!;
  const exportedNamespace = createNamespaceBySymbol(ctx, symbol);

  it("should export a namespace", () => {
    expect(exportedNamespace.name).to.equal("TestNamespace");
  });

  it("should have parsed exports", () => {
    expect(exportedNamespace.exports.length).to.equal(1);
  });

});
