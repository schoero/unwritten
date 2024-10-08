import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


scope("Interpreter", TypeKind.NumberLiteral, () => {

  {

    const testFileContent = ts`
      export type NumberLiteralType = 7;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "NumberLiteralType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse number literal types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.NumberLiteral);
      expect(exportedTypeAlias.type.value).toBe(7);
    });

  }

});
