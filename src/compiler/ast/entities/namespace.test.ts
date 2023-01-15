import { expect, it } from "vitest";

import { createNamespaceEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";


scope("Compiler", EntityKind.Namespace, () => {

  const testFileContent = ts`
    export namespace TestNamespace {
      export type TestType = string;
    }
  `;

  const { exportedSymbols, ctx } = compile(testFileContent);

  const symbol = exportedSymbols.find(s => s.name === "TestNamespace")!;
  const exportedNamespace = createNamespaceEntity(ctx, symbol);

  it("should export a namespace", () => {
    expect(exportedNamespace.name).to.equal("TestNamespace");
  });

  it("should have parsed exports", () => {
    expect(exportedNamespace.exports.length).to.equal(1);
  });

});
