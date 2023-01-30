import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:compiler:entities";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", TypeKind.StringLiteral, () => {

  {

    const testFileContent = ts`
      export type StringLiteralType = "Hello world";
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "StringLiteralType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse string literal types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.StringLiteral);
      expect(exportedTypeAlias.type.value).to.equal("Hello world");
    });

  }

});
