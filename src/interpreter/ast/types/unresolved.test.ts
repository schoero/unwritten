import { assert, expect, it } from "vitest";

import { createFunctionEntity, createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.Unresolved, () => {

  {

    const testFileContent = ts`
      export type Unresolved = Symbol;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent, undefined, {
      interpreterConfig: {
        exclude: ["node_modules/**/*"]
      }
    });

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "Unresolved")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should create an unresolved type if excluded specifically", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReferenceTypeAlias.type.type);
      expect(exportedReferenceTypeAlias.type.type.kind).to.equal(TypeKind.Unresolved);
    });

  }

  {

    const testFileContent = ts`
      export type UnresolvedSet = Set<string>;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "UnresolvedSet")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should create an unresolved type reference for a Set with one type argument", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReferenceTypeAlias.type.type);
      expect(exportedReferenceTypeAlias.type.typeArguments).to.have.lengthOf(1);
      expect(exportedReferenceTypeAlias.type.type.kind).to.equal(TypeKind.Unresolved);
    });

  }

  {

    const testFileContent = ts`
      export type UnresolvedMap = Map<string, number>;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "UnresolvedMap")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should create an unresolved type reference for a Map with two type arguments", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReferenceTypeAlias.type.type);
      expect(exportedReferenceTypeAlias.type.typeArguments).to.have.lengthOf(2);
      expect(exportedReferenceTypeAlias.type.type.kind).to.equal(TypeKind.Unresolved);
    });

  }

  {

    const testFileContent = ts`
      export type UnresolvedPromise = Promise<string>;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "UnresolvedPromise")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should create an unresolved type reference for a Map with two type arguments", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReferenceTypeAlias.type.type);
      expect(exportedReferenceTypeAlias.type.typeArguments).to.have.lengthOf(1);
      expect(exportedReferenceTypeAlias.type.type.kind).to.equal(TypeKind.Unresolved);
    });

  }

  {

    const testFileContent = ts`
      export async function test() {
        return "test";
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedFunctionSymbol = exportedSymbols.find(s => s.name === "test")!;
    const exportedFunctionEntity = createFunctionEntity(ctx, exportedFunctionSymbol);

    it("should create an unresolved type reference for a Map with two type arguments", () => {
      assert(exportedFunctionEntity.signatures[0].returnType.kind === TypeKind.Unresolved);
    });

  }

});
