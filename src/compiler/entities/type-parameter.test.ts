import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind } from "quickdoks:types:types.js";

import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", Kind.TypeParameter, () => {

  {

    const testFileContent = ts`
      export type GenericTypeAlias<T> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "GenericTypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse type parameters", () => {
      expect(exportedTypeAlias.kind).toBe(Kind.TypeAlias);
      expect(exportedTypeAlias.typeParameters).to.not.equal(undefined);
      expect(exportedTypeAlias.typeParameters).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      export type Generic<T extends string> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Generic")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching constraint", () => {
      expect(exportedTypeAlias.typeParameters![0]!.constraint).to.not.equal(undefined);
      expect(exportedTypeAlias.typeParameters![0]!.constraint!.kind).to.equal(Kind.String);
    });

  }

  {

    const testFileContent = ts`
      export type Generic<T extends string = "hello"> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Generic")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching initializer", () => {
      expect(exportedTypeAlias.typeParameters![0]!.initializer!.kind).to.equal(Kind.StringLiteral);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Generic type description
       * @template T - Generic type parameter description
       * @example Generic type example
       */
      export type Generic<T extends string> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Generic")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a description", () => {
      expect(exportedTypeAlias.description).to.equal("Generic type description");
    });

    it("should have a example", () => {
      expect(exportedTypeAlias.example).to.equal("Generic type example");
    });

    it("should have a type parameter description", () => {
      expect(exportedTypeAlias.typeParameters![0]!.description).to.not.equal(undefined);
      expect(exportedTypeAlias.typeParameters![0]!.description).to.equal("- Generic type parameter description");
    });

  }

});
