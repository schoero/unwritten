import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.TypeAlias, () => {

  {

    const testFileContent = ts`
      export type TypeAlias = string;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse a type alias", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
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

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
    });

    it("should have a matching name", () => {
      expect(exportedTypeAlias.name).toBe("TypeAlias");
    });

    it("should have a matching id", () => {
      expect(exportedTypeAlias.symbolId).toBe(getSymbolId(ctx, symbol));
    });

    it("should have a matching description", () => {
      expect(exportedTypeAlias.description).toBe("Type alias description");
    });

    it("should have a matching example", () => {
      expect(exportedTypeAlias.example).toBe("Type alias example");
    });

    it("should have a matching position", () => {
      expect(exportedTypeAlias.position).to.deep.equal({
        column: 0,
        file: "/file.ts",
        line: 5
      });
    });

  }

  {

    const testFileContent = ts`
      export type GenericTypeAlias<T> = T;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "GenericTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse generic types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.typeParameters).toHaveLength(1);
      expect(exportedTypeAlias.type.type).toBeDefined();
      expect(exportedTypeAlias.type.type!.kind).toBe(TypeKind.TypeParameter);
    });

  }

  {

    const testFileContent = ts`
      export type Generic<T extends string> = T;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Generic")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a type parameter", () => {
      expect(exportedTypeAlias.typeParameters).toBeDefined();
      expect(exportedTypeAlias.typeParameters).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      type Generic<T extends string> = T;
      export type Resolved = Generic<"hello">;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Resolved")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should resolve types", () => {
      expect(exportedTypeAlias.typeParameters).toBeUndefined();

      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedTypeAlias.type.type !== undefined);
      assert(exportedTypeAlias.type.type.kind === TypeKind.StringLiteral);

      expect(exportedTypeAlias.type.type.value).toBe("hello");
    });

  }

  {

    const testFileContent = ts`
      export type UpperCasedType = Uppercase<"hello">;
      export type PartialType = Partial<{
        prop: "test";
      }>;
      export type ReadonlyType = Readonly<{
        prop: "test";
      }>;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const uppercaseSymbol = exportedSymbols.find(s => s.name === "UpperCasedType")!;
    const exportedUppercaseTypeAlias = createTypeAliasEntity(ctx, uppercaseSymbol);

    const partialTypeSymbol = exportedSymbols.find(s => s.name === "PartialType")!;
    const exportedPartialTypeAlias = createTypeAliasEntity(ctx, partialTypeSymbol);

    const readonlyTypeSymbol = exportedSymbols.find(s => s.name === "ReadonlyType")!;
    const exportedReadonlyTypeAlias = createTypeAliasEntity(ctx, readonlyTypeSymbol);

    it("should support typescript utility types", () => {
      assert(exportedUppercaseTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedUppercaseTypeAlias.type.type?.kind === TypeKind.StringLiteral);
      expect(exportedUppercaseTypeAlias.type.type.value).toBe("HELLO");

      assert(exportedPartialTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedPartialTypeAlias.type.type?.kind === TypeKind.TypeLiteral);
      expect(exportedPartialTypeAlias.type.type.properties[0].optional).toBe(true);
    });

    // Readonly is currently not supported by the typescript compiler api
    // https://github.com/microsoft/TypeScript/issues/31296
    it.fails("should support readonly mapped type utilities", () => {
      assert(exportedReadonlyTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReadonlyTypeAlias.type.type?.kind === TypeKind.Object);
      expect(exportedReadonlyTypeAlias.type.type.properties[0].modifiers).toContain("readonly");
    });

  }

});
