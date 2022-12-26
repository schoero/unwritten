import { expect, it } from "vitest";

import { createTypeAliasBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import { Kind, LiteralType } from "quickdoks:type-definitions/types.d.js";


scope("Compiler", Kind.BooleanLiteral, () => {

  {

    it("should be able to parse boolean literal types", () => {

      const testFileContent = ts`
        export type BooleanLiteralType = true;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "BooleanLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      expect(exportedTypeAlias.type.kind).to.equal(Kind.BooleanLiteral);
      expect((exportedTypeAlias.type as LiteralType<Kind.BooleanLiteral>).value).to.equal(true);

    });

  }

});
