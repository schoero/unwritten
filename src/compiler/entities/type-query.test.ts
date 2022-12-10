import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind, TypeQuery } from "quickdoks:types:types.js";

import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", Kind.TypeQuery, () => {

  {

    const testFileContent = ts`
      const test = 7;
      export type TypeQuery = typeof test;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const conditionalTypeAliasSymbol = exportedSymbols.find(s => s.name === "TypeQuery")!;
    const conditionalTypeAlias = createTypeAliasBySymbol(ctx, conditionalTypeAliasSymbol);

    it("should be able to parse type queries", () => {
      expect(conditionalTypeAlias.type.kind).to.equal(Kind.TypeQuery);
    });

    it("should have a matching name", () => {
      expect((conditionalTypeAlias.type as TypeQuery).name).to.equal("test");
    });

    it("should have a matching type", () => {
      expect((conditionalTypeAlias.type as TypeQuery).type.kind).to.equal(Kind.NumberLiteral);
    });

  }

});
