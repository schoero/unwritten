import { describe, expect, it } from "vitest";

import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { createFunctionEntity } from "unwritten:interpreter:ast/entities/index";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("MarkupRenderer", JSDocKind.Throws, () => {

  describe("throw errors", () => {

    const testFileContent = ts`
      /**
       * before @throws {RangeError} line 1
       * line 2 @throws {SyntaxError} syntaxError
       */
      export function test(): void {}
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should have the correct amount of throws blocks", () => {
      expect(exportedFunction.signatures[0].throws).toHaveLength(2);
    });

    it("should handle text before correctly", () => {
      expect(exportedFunction.signatures[0].description).toHaveLength(1);
      assert(exportedFunction.signatures[0].description?.[0].kind === JSDocKind.Text);
      expect(exportedFunction.signatures[0].description[0].text).toBe("before");
    });

    it("should reference the correct type", () => {
      assert(exportedFunction.signatures[0].throws?.[0].kind === JSDocKind.Throws);
      assert(exportedFunction.signatures[0].throws[0].type?.kind === JSDocKind.Type);
      assert(exportedFunction.signatures[0].throws[0].type.type?.kind === TypeKind.TypeReference);
      expect(exportedFunction.signatures[0].throws[0].type.type.name).toBe("RangeError");
    });

    it("should have multiple lines of content", () => {
      assert(exportedFunction.signatures[0].throws?.[0].kind === JSDocKind.Throws);
      expect(exportedFunction.signatures[0].throws[0].content).toHaveLength(1);
      assert(exportedFunction.signatures[0].throws[0].content[0].kind === JSDocKind.Text);
      expect(exportedFunction.signatures[0].throws[0].content[0].text).toBe("line 1\nline 2");
    });

  });

});
