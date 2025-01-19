import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


scope("Interpreter", TypeKind.BooleanLiteral, () => {

  {

    const testFileContent = ts`
      export type BooleanLiteralType = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "BooleanLiteralType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse boolean literal types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.BooleanLiteral);
      expect(exportedTypeAlias.type.value).toBe(true);
    });

  }

});
