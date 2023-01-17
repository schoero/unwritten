import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";


scope("Compiler", TypeKind.TypeQuery, () => {

  {

    const testFileContent = ts`
      const test = 7;
      export type TypeQuery = typeof test;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const conditionalTypeAliasSymbol = exportedSymbols.find(s => s.name === "TypeQuery")!;
    const conditionalTypeAlias = createTypeAliasEntity(ctx, conditionalTypeAliasSymbol);

    it("should be able to parse type queries", () => {
      expect(conditionalTypeAlias.type.kind).to.equal(TypeKind.TypeQuery);
    });

    it("should have a matching name", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.TypeQuery);
      expect(conditionalTypeAlias.type.name).to.equal("test");
    });

    it("should have a matching type", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.TypeQuery);
      expect(conditionalTypeAlias.type.type.kind).to.equal(TypeKind.NumberLiteral);
    });

  }

});
