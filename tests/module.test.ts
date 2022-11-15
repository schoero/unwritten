import { expect, it } from "vitest";

import { createModuleBySymbol } from "../src/compiler/entities/module.js";
import { TypeKind } from "../src/types/types.js";
import { compile } from "./utils/compile.js";
import { scope } from "./utils/scope.js";
import { ts } from "./utils/template.js";


scope("Compiler", TypeKind.Module, () => {

  const testFileContent = ts`
    export module TestModule {
      export type TestType = string;
    }
  `;

  const { exportedSymbols, ctx } = compile(testFileContent.trim());

  const exportedModule = createModuleBySymbol(ctx, exportedSymbols[0]!);

  it("should export a module", () => {
    expect(exportedModule.name).to.equal("TestModule");
  });

  it("should have parsed exports", () => {
    expect(exportedModule.exports.length).to.equal(1);
  });

});
