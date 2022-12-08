import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:/utils/compile.js";
import { scope } from "quickdoks:tests:/utils/scope.js";
import { ts } from "quickdoks:tests:/utils/template.js";
import { Kind, TypeReference } from "quickdoks:types:types.js";

import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", Kind.TypeArgument, () => {

  {

    const testFileContent = ts`
      type StringLiteral<T> = T;
      export type StringLiteralTypeAlias = StringLiteral<"Test">;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "StringLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching type argument", () => {
      expect((exportedTypeAlias.type as TypeReference).typeArguments).to.have.lengthOf(1);
      expect((exportedTypeAlias.type as TypeReference).typeArguments![0]!.kind).to.equal(Kind.TypeArgument);
    });

    it("should be able to resolve the type argument", () => {
      expect((exportedTypeAlias.type as TypeReference).typeArguments![0]!.type).to.not.equal(undefined);
      expect((exportedTypeAlias.type as TypeReference).typeArguments![0]!.type.kind).to.equal(Kind.StringLiteral);
    });

  }

});
