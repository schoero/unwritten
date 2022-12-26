import { expect, it } from "vitest";

import { createTypeAliasBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import { Kind, LiteralType } from "quickdoks:type-definitions/types.d.js";


scope("Compiler", Kind.NumberLiteral, () => {

  {

    it("should be able to parse number literal types", () => {

      const testFileContent = ts`
        export type NumberLiteralType = 7;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "NumberLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      expect(exportedTypeAlias.type.kind).to.equal(Kind.NumberLiteral);
      expect((exportedTypeAlias.type as LiteralType<Kind.NumberLiteral>).value).to.equal(7);

    });

  }

});
