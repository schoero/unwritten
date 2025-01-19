import { describe, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("Interpreter", JSDocKind.See, () => {

  describe("link to a symbol", () => {

    const testFileContent = ts`
      /**
       * before @see Test line 1
       * line 2
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have the correct amount of see blocks", () => {
      expect(exportedTypeAlias.see).toHaveLength(1);
    });

    it("should handle text before correctly", () => {
      expect(exportedTypeAlias.description).toHaveLength(1);
      assert(exportedTypeAlias.description?.[0].kind === JSDocKind.Text);
      expect(exportedTypeAlias.description[0].text).toBe("before");
    });

    it("should have a reference to itself", () => {
      assert(exportedTypeAlias.see?.[0].kind === JSDocKind.See);
      expect(exportedTypeAlias.see[0].reference?.target?.symbolId).toEqual(exportedTypeAlias.symbolId);
    });

    it("should have multiple lines of content", () => {
      expect(exportedTypeAlias.see?.[0].content).toHaveLength(1);
      assert(exportedTypeAlias.see?.[0].content[0].kind === JSDocKind.Text);
      expect(exportedTypeAlias.see[0].content[0].text).toBe("line 1\nline 2");
    });

  });

});
