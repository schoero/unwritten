import { expect, it } from "vitest";

import { createModuleBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import { Kind } from "quickdoks:type-definitions/types.d.js";


scope("Compiler", Kind.Module, () => {

  const testFileContent = ts`
    export module TestModule {
      export type TestType = string;
    }
  `;

  const { exportedSymbols, ctx } = compile(testFileContent);

  const symbol = exportedSymbols.find(s => s.name === "TestModule")!;
  const exportedModule = createModuleBySymbol(ctx, symbol);

  it("should export a module", () => {
    expect(exportedModule.name).to.equal("TestModule");
  });

  it("should have parsed exports", () => {
    expect(exportedModule.exports.length).to.equal(1);
  });

});
