import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Reference, TypeKind } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", TypeKind.TypeArgument, () => {

  {

    const testFileContent = ts`
      type StringLiteral<T> = T;
      export type StringLiteralTypeAlias = StringLiteral<"Test">;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "StringLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching type argument", () => {
      expect((exportedTypeAlias.type as Reference).typeArguments).to.have.lengthOf(1);
      expect((exportedTypeAlias.type as Reference).typeArguments![0]!.kind).to.equal(TypeKind.TypeArgument);
    });

  }

});
