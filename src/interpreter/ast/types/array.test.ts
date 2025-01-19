import { assert, describe, expect, it } from "vitest";

import {
  createInterfaceEntity,
  createTypeAliasEntity,
  createVariableEntity
} from "unwritten:interpreter:ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


scope("Interpreter", TypeKind.Array, () => {


  {

    const testFileContent = ts`
      export type ArrayType = string[];
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ArrayType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse an array type declared using the native syntax", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.Array);
    });

  }

  {

    const testFileContent = ts`
      export type ArrayType = Array<string>;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ArrayType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should create a type reference for the generic syntax", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.type.typeArguments).toHaveLength(1);
      expect(exportedTypeAlias.type.typeArguments![0].kind).toBe(TypeKind.String);
    });

  }

  {

    const testFileContent = ts`
      export const array = ["a", "b"];
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "array")!;
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should be able to parse an array type that was created using the square bracket notation", () => {
      expect(exportedVariable.kind).toBe(EntityKind.Variable);
      expect(exportedVariable.type.kind).toBe(TypeKind.Array);
    });

  }

  {

    const testFileContent = ts`
      export const array = new Array("a", "b")
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "array")!;
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should be able to parse an array type that was created using the Array constructor", () => {
      expect(exportedVariable.kind).toBe(EntityKind.Variable);
      expect(exportedVariable.type.kind).toBe(TypeKind.Array);
    });

  }

  describe("array types", () => {

    const testFileContent = ts`
      type Resolved<T extends string> = T;
      export interface Test {
        native: Resolved<"test">[];
        generic: Array<Resolved<"test">>;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedVariable = createInterfaceEntity(ctx, symbol);

    const native = exportedVariable.properties.find(property => property.name === "native")!.type;
    const generic = exportedVariable.properties.find(property => property.name === "generic")!.type;

    it("should resolve instantiated types in native arrays", () => {
      assert(native.kind === TypeKind.Array);
      assert(native.type.kind === TypeKind.TypeReference);
      expect(native.type.type?.kind).toBe(TypeKind.StringLiteral);
    });

    it("should resolve instantiated types in generic arrays", () => {
      assert(generic.kind === TypeKind.TypeReference);
      assert(generic.typeArguments?.[0]?.kind === TypeKind.TypeReference);
      expect(generic.typeArguments[0]?.type?.kind).toBe(TypeKind.StringLiteral);
    });

  });

});
