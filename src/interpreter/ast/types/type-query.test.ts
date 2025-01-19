import { assert, expect, it } from "vitest";

import { createTypeAliasEntity, createVariableEntity } from "unwritten:interpreter:ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


scope("Interpreter", TypeKind.TypeQuery, () => {

  {

    const testFileContent = ts`
      export const test = 7;
      export type TypeQuery = typeof test;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const typeQueryTargetSymbol = exportedSymbols.find(s => s.name === "test")!;
    const typeQueryTarget = createVariableEntity(ctx, typeQueryTargetSymbol);
    const typeQuerySymbol = exportedSymbols.find(s => s.name === "TypeQuery")!;
    const typeQueryTypeAlias = createTypeAliasEntity(ctx, typeQuerySymbol);

    it("should be able to parse type queries", () => {
      expect(typeQueryTypeAlias.type.kind).toBe(TypeKind.TypeQuery);
    });

    it("should have a matching name", () => {
      assert(typeQueryTypeAlias.type.kind === TypeKind.TypeQuery);
      expect(typeQueryTypeAlias.type.name).toBe("test");
    });

    it("should have a matching type", () => {
      assert(typeQueryTypeAlias.type.kind === TypeKind.TypeQuery);
      expect(typeQueryTypeAlias.type.type.kind).toBe(TypeKind.NumberLiteral);
    });

    it("should have a matching target", () => {
      assert(typeQueryTypeAlias.type.kind === TypeKind.TypeQuery);
      expect(typeQueryTypeAlias.type.target).toBeDefined();
      expect(typeQueryTypeAlias.type.target!.kind).toBe(EntityKind.Variable);
      expect(typeQueryTypeAlias.type.target).toEqual(typeQueryTarget);
    });

  }

  {

    const testFileContent = ts`
      export const test = "test";
      export type Test = typeof test;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedVariableSymbol = exportedSymbols.find(s => s.name === "test")!;
    const exportedVariableEntity = createVariableEntity(ctx, exportedVariableSymbol);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAliasEntity = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should have a matching target", () => {
      assert(exportedTypeAliasEntity.type.kind === TypeKind.TypeQuery);
      expect(exportedTypeAliasEntity.type.target).toEqual(exportedVariableEntity);
    });

  }

  {

    const testFileContent = ts`
      function test<T extends string>(param: T): void {}
      export type ResolvedTypeQueryType = typeof test<"test">;
      export type DeclaredTypeQueryType = typeof test;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedDeclaredTypeQueryTypeAliasSymbol = exportedSymbols.find(s => s.name === "DeclaredTypeQueryType")!;
    const exportedDeclaredTypeQueryTypeAlias = createTypeAliasEntity(ctx, exportedDeclaredTypeQueryTypeAliasSymbol);

    const exportedResolvedTypeAliasSymbol = exportedSymbols.find(s => s.name === "ResolvedTypeQueryType")!;
    const exportedResolvedTypeAlias = createTypeAliasEntity(ctx, exportedResolvedTypeAliasSymbol);


    it("should return the declared type for type queries that are not instantiated", () => {
      assert(exportedDeclaredTypeQueryTypeAlias.type.kind === TypeKind.TypeQuery);
      assert(exportedDeclaredTypeQueryTypeAlias.type.type.kind === TypeKind.Function);
      expect(exportedDeclaredTypeQueryTypeAlias.type.type.signatures[0].parameters).toHaveLength(1);
      assert(exportedDeclaredTypeQueryTypeAlias.type.type.signatures[0].parameters![0].type.kind === TypeKind.TypeReference);
      expect(exportedDeclaredTypeQueryTypeAlias.type.type.signatures[0].parameters![0].type.type?.kind).toBe(TypeKind.TypeParameter);
    });

    it("should return the resolved type for instantiated type queries", () => {
      assert(exportedResolvedTypeAlias.type.kind === TypeKind.TypeQuery);
      assert(exportedResolvedTypeAlias.type.type.kind === TypeKind.Function);
      expect(exportedResolvedTypeAlias.type.type.signatures[0].parameters).toHaveLength(1);
      assert(exportedResolvedTypeAlias.type.type.signatures[0].parameters![0].type.kind === TypeKind.TypeReference);
      expect(exportedResolvedTypeAlias.type.type.signatures[0].parameters![0].type.type?.kind).toBe(TypeKind.StringLiteral);
    });

  }

});
