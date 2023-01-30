import { expect, it } from "vitest";

import { createModuleEntity } from "unwritten:compiler:entities";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", EntityKind.Module, () => {

  const testFileContent = ts`
    export module TestModule {
      export type TestType = string;
    }
  `;

  const { exportedSymbols, ctx } = compile(testFileContent);

  const symbol = exportedSymbols.find(s => s.name === "TestModule")!;
  const exportedModule = createModuleEntity(ctx, symbol);

  it("should export a module", () => {
    expect(exportedModule.name).to.equal("TestModule");
  });

  it("should have parsed exports", () => {
    expect(exportedModule.exports.length).to.equal(1);
  });

});
