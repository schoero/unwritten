import { expect, it } from "vitest";

import { parse } from "../src/parser/index.js";
import { Reference, TypeAlias, TypeKind } from "../src/types/types.js";
import { compile } from "./utils/compile.js";
import { scope } from "./utils/scope.js";
import { ts } from "./utils/template.js";


scope("Compiler", TypeKind.Reference, () => {

  {
    const testFileContent = ts`
      type A = string;
      export type Reference = A;
    `;

    const { fileSymbol, ctx } = compile(testFileContent.trim());

    const parsedSymbols = parse(ctx, fileSymbol);

    it("should export a type alias, which is a type reference to another type alias", () => {
      expect(parsedSymbols).to.have.lengthOf(1);
      expect(parsedSymbols[0]!.kind).toBe(TypeKind.TypeAlias);
      expect((parsedSymbols[0]! as TypeAlias).type.kind).toBe(TypeKind.Reference);
      expect(((parsedSymbols[0]! as TypeAlias).type as Reference).resolvedType).to.not.equal(undefined);
      expect(((parsedSymbols[0]! as TypeAlias).type as Reference).resolvedType!.kind).to.equal(TypeKind.TypeAlias);
    });
  }

});
