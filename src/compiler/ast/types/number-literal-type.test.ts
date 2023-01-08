import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { LiteralType } from "quickdoks:compiler:type-definitions/types.d.js";


scope("Compiler", TypeKind.NumberLiteral, () => {

  {

    it("should be able to parse number literal types", () => {

      const testFileContent = ts`
        export type NumberLiteralType = 7;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "NumberLiteralType")!;
      const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.NumberLiteral);
      expect((exportedTypeAlias.type as LiteralType<TypeKind.NumberLiteral>).value).to.equal(7);

    });

  }

});
