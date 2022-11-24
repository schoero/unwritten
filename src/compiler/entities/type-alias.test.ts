import { describe, expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind, TypeParameter, TypeReference } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", TypeKind.TypeAlias, () => {

  {

    const testFileContent = ts`
      export type TypeAlias = string;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse a type alias", () => {
      expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
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

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
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


  describe("Generics", () => {

    {

      const testFileContent = ts`
        export type GenericTypeAlias<T> = T;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "GenericTypeAlias")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      it("should be able to parse generic types", () => {
        expect(exportedTypeAlias.type.kind).toBe(TypeKind.TypeReference);
        expect(exportedTypeAlias.typeParameters).toHaveLength(1);
        expect((exportedTypeAlias.type as TypeReference).type).to.not.equal(undefined);
        expect((exportedTypeAlias.type as TypeReference).type!.kind).to.equal(TypeKind.Circular);
        expect((exportedTypeAlias.type as TypeReference).type!.id).to.equal(exportedTypeAlias.typeParameters![0]!.id);
      });

    }

    {

      const testFileContent = ts`
        export type Generic<T extends string> = T;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "Generic")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      it("should have a `string` constraint", () => {
        expect((((exportedTypeAlias.type as TypeReference).type as TypeReference).type as TypeParameter).constraint).to.not.equal(undefined);
        expect((((exportedTypeAlias.type as TypeReference).type as TypeReference).type as TypeParameter).constraint!.kind).to.equal(TypeKind.String);
      });

    }

    {

      const testFileContent = ts`
        type Generic<T extends string> = T;
        export type Hello = Generic<"World">;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "Hello")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      it("should have a matching type argument", () => {
        expect(((exportedTypeAlias.type as TypeReference).type as TypeReference).typeArguments).to.have.lengthOf(1);
        expect(((exportedTypeAlias.type as TypeReference).type as TypeReference).typeArguments![0]!.kind).to.equal(TypeKind.StringLiteral);
      });

    }

  });

});
