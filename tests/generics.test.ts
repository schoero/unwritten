import { expect, it } from "vitest";

import { parse } from "../src/parser/index.js";
import { Reference, TypeAlias, TypeKind, TypeParameter } from "../src/types/types.js";
import { compile } from "./utils/compile.js";
import { scope } from "./utils/scope.js";
import { ts } from "./utils/template.js";


scope("Compiler", "Generics", () => {

  {

    const testFileContent = ts`
      export type Generic<T> = T;
    `;

    const { fileSymbol, ctx } = compile(testFileContent.trim());
    const parsedSymbols = parse(ctx, fileSymbol);

    it("should eventually export a type parameter", () => {
      expect(parsedSymbols).to.have.lengthOf(1);
      expect(parsedSymbols[0]!.kind).toBe(TypeKind.TypeAlias);
      expect((parsedSymbols[0]! as TypeAlias).type.kind).toBe(TypeKind.Reference);
      expect(((parsedSymbols[0]! as TypeAlias).type as Reference).target).to.not.equal(undefined);
      expect(((parsedSymbols[0]! as TypeAlias).type as Reference).target!.kind).to.equal(TypeKind.TypeParameter);
    });

  }

  {
    const testFileContent = `
      export type Generic<T extends string> = T;
    `;

    const { fileSymbol, ctx } = compile(testFileContent.trim());
    const parsedSymbols = parse(ctx, fileSymbol);

    it("should have a `string` constraint", () => {
      expect((((parsedSymbols[0]! as TypeAlias).type as Reference).target as TypeParameter).constraints).to.not.equal(undefined);
      expect((((parsedSymbols[0]! as TypeAlias).type as Reference).target as TypeParameter).constraints!.kind).to.equal(TypeKind.String);
    });
  }

  {
    const testFileContent = ts`
      type Generic<T extends string> = T;
      export type Hello = Generic<"World">;
    `;

    const { fileSymbol, ctx } = compile(testFileContent.trim());
    const parsedSymbols = parse(ctx, fileSymbol);

    it("should have a matching type argument", () => {
      expect(((parsedSymbols[0]! as TypeAlias).type as Reference).typeArguments).to.have.lengthOf(1);
      expect(((parsedSymbols[0]! as TypeAlias).type as Reference).typeArguments![0]!.kind).to.equal(TypeKind.StringLiteral);
    });
  }

});
