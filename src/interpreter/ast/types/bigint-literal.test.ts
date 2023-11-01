import { assert, expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


scope("Interpreter", TypeKind.NumberLiteral, () => {

  {

    const testFileContent = ts`
      export type BigIntLiteralType = 7n;
      export type BigIntLiteralTypeNegative = -7n;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const bigIntLiteralTypeAlias = exportedSymbols.find(s => s.name === "BigIntLiteralType")!;
    const bigIntLIteralTypeAliasNegative = createTypeAliasEntity(ctx, bigIntLiteralTypeAlias);

    const bigIntLiteralSymbol = exportedSymbols.find(s => s.name === "BigIntLiteralTypeNegative")!;
    const bigIntLiteralSymbolNegative = createTypeAliasEntity(ctx, bigIntLiteralSymbol);

    it("should be able to parse bigint literal types", () => {

      assert(bigIntLIteralTypeAliasNegative.type.kind === TypeKind.BigIntLiteral);
      expect(bigIntLIteralTypeAliasNegative.type.value).toBe(7n);

      assert(bigIntLiteralSymbolNegative.type.kind === TypeKind.BigIntLiteral);
      expect(bigIntLiteralSymbolNegative.type.value).toBe(-7n);

    });

  }

});
