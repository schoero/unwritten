import { describe, expect, it } from "vitest";

import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { createFunctionEntity } from "unwritten:interpreter:ast/entities/index";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("Interpreter", JSDocKind.Type, () => {

  describe("link to a type", () => {

    const testFileContent = ts`
      /**
       * @throws {RangeError}
       */
      export function test(): void {}
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    assert(exportedFunction.signatures[0].throws?.[0].kind === JSDocKind.Throws);
    assert(exportedFunction.signatures[0].throws[0].type?.kind === JSDocKind.Type);

    const jsdocType = exportedFunction.signatures[0].throws[0].type;

    it("should have the correct type name", () => {
      expect(jsdocType.name).toBe("RangeError");
    });

    it("should have a position", () => {
      expect(jsdocType.position).toBeDefined();
    });

    it("should reference the correct type", () => {
      assert(jsdocType.type?.kind === TypeKind.TypeReference);
      expect(jsdocType.type.name).toBe("RangeError");
    });

  });

});
