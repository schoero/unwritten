import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { isJSDocText } from "unwritten:typeguards/jsdoc";
import { ts } from "unwritten:utils/template";


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
      expect(exportedTypeAlias.description).toHaveLength(1);
      assert(isJSDocText(exportedTypeAlias.description![0]));
      expect(exportedTypeAlias.description![0].text).toBe("Type alias description");
    });

    it("should have a matching example", () => {
      expect(exportedTypeAlias.example).toHaveLength(1);
      assert(isJSDocText(exportedTypeAlias.example![0].content[0]));
      expect(exportedTypeAlias.example![0].content[0].text).toBe("Type alias example");
    });

    it("should have a matching type", () => {
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.String);
    });

    it("should have a matching position", () => {
      expect(exportedTypeAlias.position).toStrictEqual({
        column: 0,
        file: "/index.ts",
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

    it("should be able to parse type parameters", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.typeParameters).toHaveLength(1);
    });

    it("should have a matching type", () => {
      expect(exportedTypeAlias.type).toBeDefined();
      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.type.type?.kind).toBe(TypeKind.TypeParameter);
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
      expect(exportedTypeAlias.typeParameters).toHaveLength(1);
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

    it("should resolve instantiated types", () => {
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
