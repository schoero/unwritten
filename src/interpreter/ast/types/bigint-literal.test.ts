import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.NumberLiteral, () => {

  {

    const testFileContent = ts`
      export type BigIntLiteralType = 7n;
      export type BigIntLiteralTypeNegative = -7n;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const bigIntLiteralTypeAlias = exportedSymbols.find(s => s.name === "BigIntLiteralType")!;
    const bigIntLIteralTypeAliasNegative = createTypeAliasEntity(ctx, bigIntLiteralTypeAlias);

    const bigIntLiteralSymbol = exportedSymbols.find(s => s.name === "BigIntLiteralTypeNegative")!;
    const bigIntLiteralSymbolNegative = createTypeAliasEntity(ctx, bigIntLiteralSymbol);

    it("should be able to parse bigint literal types", () => {

      assert(bigIntLIteralTypeAliasNegative.type.kind === TypeKind.BigIntLiteral);
      expect(bigIntLIteralTypeAliasNegative.type.value).to.equal(7n);

      assert(bigIntLiteralSymbolNegative.type.kind === TypeKind.BigIntLiteral);
      expect(bigIntLiteralSymbolNegative.type.value).to.equal(-7n);

    });

  }

});
