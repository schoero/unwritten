import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity";
import { createNamespaceEntity } from "unwritten:interpreter:ast/entities/index";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { isJSDocText } from "unwritten:typeguards/jsdoc";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("Interpreter", EntityKind.Namespace, () => {

  const testFileContent = ts`
    /**
     * Namespace description
     * @example Namespace example
     * @deprecated
     * @beta
     */
    export namespace TestNamespace {
      export type TestType = string;
    }
  `;

  const { ctx, exportedSymbols } = compile(testFileContent);

  const symbol = exportedSymbols.find(s => s.name === "TestNamespace")!;
  const exportedNamespace = createNamespaceEntity(ctx, symbol);

  it("should export a namespace", () => {
    expect(exportedNamespace.name).toBe("TestNamespace");
  });

  it("should have a matching description", () => {
    expect(exportedNamespace.description).toHaveLength(1);
    assert(isJSDocText(exportedNamespace.description![0]));
    expect(exportedNamespace.description![0].text).toBe("Namespace description");
  });

  it("should have a matching example", () => {
    expect(exportedNamespace.example).toHaveLength(1);
    assert(isJSDocText(exportedNamespace.example![0].content[0]));
    expect(exportedNamespace.example![0].content[0].text).toBe("Namespace example");
  });

  it("should be deprecated", () => {
    expect(exportedNamespace).toHaveProperty("deprecated");
  });

  it("should be beta", () => {
    expect(exportedNamespace).toHaveProperty("beta");
  });

  it("should have parsed exports", () => {
    expect(exportedNamespace.exports).toHaveLength(1);
  });

});
