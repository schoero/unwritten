import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { LiteralType } from "quickdoks:compiler:type-definitions/types.d.js";


scope("Compiler", TypeKind.NumberLiteral, () => {

  {

    it("should be able to parse bigint literal types", () => {

      const testFileContent = ts`
        export type BigIntLiteralType = 7n;
        export type BigIntLiteralTypeNegative = -7n;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent);

      const symbol1 = exportedSymbols.find(s => s.name === "BigIntLiteralType")!;
      const exportedTypeAlias1 = createTypeAliasEntity(ctx, symbol1);

      expect(exportedTypeAlias1.type.kind).to.equal(TypeKind.BigIntLiteral);
      expect((exportedTypeAlias1.type as LiteralType<TypeKind.BigIntLiteral>).value).to.equal(7n);

      const symbol2 = exportedSymbols.find(s => s.name === "BigIntLiteralTypeNegative")!;
      const exportedTypeAlias2 = createTypeAliasEntity(ctx, symbol2);

      expect(exportedTypeAlias2.type.kind).to.equal(TypeKind.BigIntLiteral);
      expect((exportedTypeAlias2.type as LiteralType<TypeKind.BigIntLiteral>).value).to.equal(-7n);

    });

  }

});
