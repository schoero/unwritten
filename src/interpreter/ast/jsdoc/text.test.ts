import { describe, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("Interpreter", JSDocKind.Text, () => {

  describe("multiline description", () => {

    const testFileContent = ts`
      /**
       * Description line 1
       * Description line 2
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should create a text node", () => {
      expect(exportedTypeAlias.description).toHaveLength(1);
      assert(exportedTypeAlias.description?.[0].kind === JSDocKind.Text);
      expect(exportedTypeAlias.description[0].text).toBe("Description line 1\nDescription line 2");
    });

  });

});
