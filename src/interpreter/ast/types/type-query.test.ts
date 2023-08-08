import { assert, expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createTypeAliasEntity, createVariableEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.TypeQuery, () => {

  {

    const testFileContent = ts`
      const test = 7;
      export type TypeQuery = typeof test;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const conditionalTypeAliasSymbol = exportedSymbols.find(s => s.name === "TypeQuery")!;
    const conditionalTypeAlias = createTypeAliasEntity(ctx, conditionalTypeAliasSymbol);

    it("should be able to parse type queries", () => {
      expect(conditionalTypeAlias.type.kind).toBe(TypeKind.TypeQuery);
    });

    it("should have a matching name", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.TypeQuery);
      expect(conditionalTypeAlias.type.name).toBe("test");
    });

    it("should have a matching type", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.TypeQuery);
      expect(conditionalTypeAlias.type.type.kind).toBe(TypeKind.NumberLiteral);
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

    it("should have a matching targetId", () => {
      assert(exportedTypeAliasEntity.type.kind === TypeKind.TypeQuery);
      expect(exportedTypeAliasEntity.type.symbolId).toBe(exportedVariableEntity.symbolId);
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
      expect(exportedDeclaredTypeQueryTypeAlias.type.type.signatures[0]!.parameters).toHaveLength(1);
      assert(exportedDeclaredTypeQueryTypeAlias.type.type.signatures[0]!.parameters![0]!.type.kind === TypeKind.TypeReference);
      expect(exportedDeclaredTypeQueryTypeAlias.type.type.signatures[0]!.parameters![0]!.type.type?.kind).toBe(TypeKind.TypeParameter);
    });

    it("should return the resolved type for instantiated type queries", () => {
      assert(exportedResolvedTypeAlias.type.kind === TypeKind.TypeQuery);
      assert(exportedResolvedTypeAlias.type.type.kind === TypeKind.Function);
      expect(exportedResolvedTypeAlias.type.type.signatures[0]!.parameters).toHaveLength(1);
      assert(exportedResolvedTypeAlias.type.type.signatures[0]!.parameters![0]!.type.kind === TypeKind.TypeReference);
      expect(exportedResolvedTypeAlias.type.type.signatures[0]!.parameters![0]!.type.type?.kind).toBe(TypeKind.StringLiteral);
    });

  }

});
