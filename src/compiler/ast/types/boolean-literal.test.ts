import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";


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
