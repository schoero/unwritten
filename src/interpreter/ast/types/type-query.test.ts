import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


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
