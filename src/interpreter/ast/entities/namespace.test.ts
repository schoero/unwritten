import { expect, it } from "vitest";

import { createNamespaceEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Namespace, () => {

  const testFileContent = ts`
    /**
     * Namespace description
     * @remarks Namespace remarks
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
    expect(exportedNamespace.description).toBe("Namespace description");
  });

  it("should have a matching remarks", () => {
    expect(exportedNamespace.remarks).toBe("Namespace remarks");
  });

  it("should have a matching example", () => {
    expect(exportedNamespace.example).toBe("Namespace example");
  });

  it("should be deprecated", () => {
    expect(exportedNamespace).to.haveOwnProperty("deprecated");
  });

  it("should be beta", () => {
    expect(exportedNamespace).to.haveOwnProperty("beta");
  });

  it("should have parsed exports", () => {
    expect(exportedNamespace.exports).toHaveLength(1);
  });

});
