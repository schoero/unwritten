import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", TypeKind.BooleanLiteral, () => {

  {

    const testFileContent = ts`
      export type BooleanLiteralType = true;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "BooleanLiteralType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse boolean literal types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.BooleanLiteral);
      expect(exportedTypeAlias.type.value).to.equal(true);
    });

  }

});
