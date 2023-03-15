import { expect, it } from "vitest";

import { createModuleEntity } from "unwritten:compiler:entities";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", EntityKind.Module, () => {

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

  const { exportedSymbols, ctx } = compile(testFileContent);

  const symbol = exportedSymbols.find(s => s.name === "TestModule")!;
  const exportedModule = createModuleEntity(ctx, symbol);

  it("should export a module", () => {
    expect(exportedModule.name).to.equal("TestModule");
  });

  it("should have a matching description", () => {
    expect(exportedModule.description).to.equal("Module description");
  });

  it("should have a matching remarks", () => {
    expect(exportedModule.remarks).to.equal("Module remarks");
  });

  it("should have a matching example", () => {
    expect(exportedModule.example).to.equal("Module example");
  });

  it("should be deprecated", () => {
    expect(exportedModule).to.haveOwnProperty("deprecated");
  });

  it("should be beta", () => {
    expect(exportedModule).to.haveOwnProperty("beta");
  });

  it("should have parsed exports", () => {
    expect(exportedModule.exports.length).to.equal(1);
  });

});
