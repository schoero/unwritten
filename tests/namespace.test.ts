import { expect, it } from "vitest";

import { createNamespaceBySymbol } from "../src/compiler/entities/namespace.js";
import { TypeKind } from "../src/types/types.js";
import { compile } from "./utils/compile.js";
import { scope } from "./utils/scope.js";
import { ts } from "./utils/template.js";


scope("Compiler", TypeKind.Namespace, () => {

  const testFileContent = ts`
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
