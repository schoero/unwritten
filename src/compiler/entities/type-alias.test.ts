import { expect, it } from "vitest";

import { getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind, TypeReference } from "quickdoks:types:types.js";

import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", Kind.TypeAlias, () => {

  {

    const testFileContent = ts`
      export type TypeAlias = string;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse a type alias", () => {
      expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Type alias description 
       * @example Type alias example
       */
      export type TypeAlias = string;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
    });

    it("should have a matching name", () => {
      expect(exportedTypeAlias.name).to.equal("TypeAlias");
    });

    it("should have a matching id", () => {
      expect(exportedTypeAlias.id).to.equal(getIdBySymbol(ctx, symbol));
    });

    it("should have a matching description", () => {
      expect(exportedTypeAlias.description).to.equal("Type alias description");
    });

    it("should have a matching example", () => {
      expect(exportedTypeAlias.example).to.equal("Type alias example");
    });

    it("should have a matching position", () => {
      expect(exportedTypeAlias.position).to.deep.equal({
        column: 6,
        file: "/file.ts",
        line: 5
      });
    });

  }

  {

    const testFileContent = ts`
      export type GenericTypeAlias<T> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "GenericTypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse generic types", () => {
      expect(exportedTypeAlias.type.kind).toBe(Kind.TypeReference);
      expect(exportedTypeAlias.typeParameters).toHaveLength(1);
      expect((exportedTypeAlias.type as TypeReference).type).to.not.equal(undefined);
      expect((exportedTypeAlias.type as TypeReference).type!.kind).to.equal(Kind.TypeParameter);
      expect((exportedTypeAlias.type as TypeReference).type!.id).to.equal(exportedTypeAlias.typeParameters![0]!.id);
    });

  }

  {

    const testFileContent = ts`
      export type Generic<T extends string> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Generic")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a type parameter", () => {
      expect(exportedTypeAlias.typeParameters).to.not.equal(undefined);
      expect(exportedTypeAlias.typeParameters).to.have.lengthOf(1);
    });

  }

});
