import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind } from "../../types/types.js";
import { createModuleBySymbol } from "./module.js";


scope("Compiler", TypeKind.Module, () => {

  const testFileContent = ts`
    export module TestModule {
      export type TestType = string;
    }
  `;

  const { exportedSymbols, ctx } = compile(testFileContent.trim());

  const symbol = exportedSymbols.find(s => s.name === "TestModule")!;
  const exportedModule = createModuleBySymbol(ctx, symbol);

  it("should export a module", () => {
    expect(exportedModule.name).to.equal("TestModule");
  });

  it("should have parsed exports", () => {
    expect(exportedModule.exports.length).to.equal(1);
  });

});
