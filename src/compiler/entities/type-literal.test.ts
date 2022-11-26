import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Kind, TypeLiteral } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", Kind.TypeLiteral, () => {

  {

    const testFileContent = ts`
      export type TypeLiteral = {
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse type literals", () => {
      expect(exportedTypeAlias.type.kind).to.equal(Kind.TypeLiteral);
    });

  }

  {

    const testFileContent = ts`
      export type TypeLiteral = {
        a: string;
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have matching members", () => {
      expect((exportedTypeAlias.type as TypeLiteral).members).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      enum TestEnum {
        A = "a",
        B = "b"
      }
      export type TypeLiteral = {
        [K in keyof typeof TestEnum]: string;
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should support enum member as keys", () => {
      expect((exportedTypeAlias.type as TypeLiteral).members).to.have.lengthOf(2);
    });

  }

});
