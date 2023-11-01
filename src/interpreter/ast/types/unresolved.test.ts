import { assert, expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type";
import { createFunctionEntity, createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { isNumberLiteralType, isUnionType, isUnresolvedType } from "unwritten:typeguards/types";
import { ts } from "unwritten:utils/template";


scope("Interpreter", TypeKind.Unresolved, () => {

  {

    const testFileContent = ts`
      export type Unresolved = Symbol;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent, undefined, {
      interpreterConfig: {
        exclude: ["node_modules/**/*"]
      }
    });

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "Unresolved")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should create an unresolved type reference type if excluded specifically", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReferenceTypeAlias.type.type);
      expect(exportedReferenceTypeAlias.type.type.kind).toBe(TypeKind.Unresolved);
    });

  }

  {

    const testFileContent = ts`
      export type UnresolvedSet = Set<string>;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "UnresolvedSet")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should create an unresolved type reference type for a Set with one type argument", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReferenceTypeAlias.type.type);
      expect(exportedReferenceTypeAlias.type.typeArguments).toHaveLength(1);
      expect(exportedReferenceTypeAlias.type.type.kind).toBe(TypeKind.Unresolved);
    });

  }

  {

    const testFileContent = ts`
      export type UnresolvedMap = Map<string, number>;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "UnresolvedMap")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should create an unresolved type reference type for a Map with two type arguments", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReferenceTypeAlias.type.type);
      expect(exportedReferenceTypeAlias.type.typeArguments).toHaveLength(2);
      expect(exportedReferenceTypeAlias.type.type.kind).toBe(TypeKind.Unresolved);
    });

  }

  {

    const testFileContent = ts`
      export type UnresolvedPromise = Promise<string>;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "UnresolvedPromise")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should create an unresolved type reference type for a Promise", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReferenceTypeAlias.type.type);
      expect(exportedReferenceTypeAlias.type.typeArguments).toHaveLength(1);
      expect(exportedReferenceTypeAlias.type.type.kind).toBe(TypeKind.Unresolved);
    });

  }

  {

    const testFileContent = ts`
      export function* generatorFunction() {
        yield 1;
        yield 2;
        yield 3;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedFunctionSymbol = exportedSymbols.find(s => s.name === "generatorFunction")!;
    const exportedFunction = createFunctionEntity(ctx, exportedFunctionSymbol);

    it("should create an unresolved type reference type for a generator function", () => {
      assert(isUnresolvedType(exportedFunction.signatures[0].returnType));
      expect(exportedFunction.signatures[0].returnType.typeArguments?.length).toBe(1 + 2);
      assert(isUnionType(exportedFunction.signatures[0].returnType.typeArguments![0]));

      assert(isNumberLiteralType(exportedFunction.signatures[0].returnType.typeArguments![0].types[0]));
      expect(exportedFunction.signatures[0].returnType.typeArguments![0].types[0].value).toBe(1);
      assert(isNumberLiteralType(exportedFunction.signatures[0].returnType.typeArguments![0].types[1]));
      expect(exportedFunction.signatures[0].returnType.typeArguments![0].types[1].value).toBe(2);
      assert(isNumberLiteralType(exportedFunction.signatures[0].returnType.typeArguments![0].types[2]));
      expect(exportedFunction.signatures[0].returnType.typeArguments![0].types[2].value).toBe(3);
    });

  }

  {

    const testFileContent = ts`
      export async function test() {
        return "test";
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedFunctionSymbol = exportedSymbols.find(s => s.name === "test")!;
    const exportedFunctionEntity = createFunctionEntity(ctx, exportedFunctionSymbol);

    it("should create an unresolved type reference type for an async function", () => {
      expect(exportedFunctionEntity.signatures[0].returnType.kind).toBe(TypeKind.Unresolved);
    });

  }

});
