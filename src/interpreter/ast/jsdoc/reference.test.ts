import { describe, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("Interpreter", JSDocKind.Reference, () => {

  describe("flavors of references", () => {

    const testFileContent = ts`
      /**
       * {@link Test}
       * @see Test
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    assert(exportedTypeAlias.description);

    it("should handle references in a link correctly", () => {
      assert(exportedTypeAlias.description?.[1].kind === JSDocKind.Link);
      assert(exportedTypeAlias.description[1].reference);
      expect(exportedTypeAlias.description[1].reference.target?.symbolId).toEqual(exportedTypeAlias.symbolId);
      expect(exportedTypeAlias.description[1].text).toBeUndefined();
    });

    it("should be possible to add a custom link label", () => {
      assert(exportedTypeAlias.see?.[0].kind === JSDocKind.See);
      assert(exportedTypeAlias.see[0].reference);
      expect(exportedTypeAlias.see[0].reference.target?.symbolId).toEqual(exportedTypeAlias.symbolId);
    });

  });

});
