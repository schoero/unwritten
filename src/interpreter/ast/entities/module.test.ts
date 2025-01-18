import { createModuleEntity } from "unwritten:interpreter:ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { isJSDocText } from "unwritten:typeguards/jsdoc";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";


scope("Interpreter", EntityKind.Module, () => {

  const testFileContent = ts`
    /**
     * Module description
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
    expect(exportedModule.description).toHaveLength(1);
    assert(isJSDocText(exportedModule.description![0]));
    expect(exportedModule.description![0].text).toBe("Module description");
  });

  it("should have a matching example", () => {
    expect(exportedModule.example).toHaveLength(1);
    assert(isJSDocText(exportedModule.example![0].content[0]));
    expect(exportedModule.example![0].content[0].text).toBe("Module example");
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
