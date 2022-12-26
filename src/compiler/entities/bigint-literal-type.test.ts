import { expect, it } from "vitest";

import { createTypeAliasBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import { Kind, LiteralType } from "quickdoks:type-definitions/types.d.js";


scope("Compiler", Kind.NumberLiteral, () => {

  {

    it("should be able to parse bigint literal types", () => {

      const testFileContent = ts`
        export type BigIntLiteralType = 7n;
        export type BigIntLiteralTypeNegative = -7n;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent);

      const symbol1 = exportedSymbols.find(s => s.name === "BigIntLiteralType")!;
      const exportedTypeAlias1 = createTypeAliasBySymbol(ctx, symbol1);

      expect(exportedTypeAlias1.type.kind).to.equal(Kind.BigIntLiteral);
      expect((exportedTypeAlias1.type as LiteralType<Kind.BigIntLiteral>).value).to.equal(7n);

      const symbol2 = exportedSymbols.find(s => s.name === "BigIntLiteralTypeNegative")!;
      const exportedTypeAlias2 = createTypeAliasBySymbol(ctx, symbol2);

      expect(exportedTypeAlias2.type.kind).to.equal(Kind.BigIntLiteral);
      expect((exportedTypeAlias2.type as LiteralType<Kind.BigIntLiteral>).value).to.equal(-7n);

    });

  }

});
