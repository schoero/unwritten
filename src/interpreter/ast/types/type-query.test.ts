import { assert, expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.TypeQuery, () => {

  {

    const testFileContent = ts`
      const test = 7;
      export type TypeQuery = typeof test;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const conditionalTypeAliasSymbol = exportedSymbols.find(s => s.name === "TypeQuery")!;
    const conditionalTypeAlias = createTypeAliasEntity(ctx, conditionalTypeAliasSymbol);

    it("should be able to parse type queries", () => {
      expect(conditionalTypeAlias.type.kind).toBe(TypeKind.TypeQuery);
    });

    it("should have a matching name", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.TypeQuery);
      expect(conditionalTypeAlias.type.name).toBe("test");
    });

    it("should have a matching type", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.TypeQuery);
      expect(conditionalTypeAlias.type.type.kind).toBe(TypeKind.NumberLiteral);
    });

  }

});
