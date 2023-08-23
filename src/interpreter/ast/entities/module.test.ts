import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { createModuleEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Module, () => {

  const testFileContent = ts`
    /**
     * Module description
     * @remarks Module remarks
     * @example Module example
     * @deprecated
     * @beta
     */
    export module TestModule {
      export type TestType = string;
    }
  `;

  const { ctx, exportedSymbols } = compile(testFileContent);

  const symbol = exportedSymbols.find(s => s.name === "TestModule")!;
  const exportedModule = createModuleEntity(ctx, symbol);

  it("should export a module", () => {
    expect(exportedModule.name).toBe("TestModule");
  });

  it("should have a matching description", () => {
    expect(exportedModule.description).toBe("Module description");
  });

  it("should have a matching remarks", () => {
    expect(exportedModule.remarks).toBe("Module remarks");
  });

  it("should have a matching example", () => {
    expect(exportedModule.example).toStrictEqual([
      "Module example"
    ]);
  });

  it("should be deprecated", () => {
    expect(exportedModule).toHaveProperty("deprecated");
  });

  it("should be beta", () => {
    expect(exportedModule).toHaveProperty("beta");
  });

  it("should have parsed exports", () => {
    expect(exportedModule.exports).toHaveLength(1);
  });

});
