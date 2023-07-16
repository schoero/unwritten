import { assert, expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


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

    it("should create an unresolved type reference target if excluded specifically", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReferenceTypeAlias.type.target);
      expect(exportedReferenceTypeAlias.type.target.kind).toBe(EntityKind.Unresolved);
    });

  }

  {

    const testFileContent = ts`
      export type UnresolvedSet = Set<string>;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "UnresolvedSet")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should create an unresolved type reference target for a Set with one type argument", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReferenceTypeAlias.type.target);
      expect(exportedReferenceTypeAlias.type.typeArguments).toHaveLength(1);
      expect(exportedReferenceTypeAlias.type.target.kind).toBe(EntityKind.Unresolved);
    });

  }

  {

    const testFileContent = ts`
      export type UnresolvedMap = Map<string, number>;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "UnresolvedMap")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should create an unresolved type reference target for a Map with two type arguments", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReferenceTypeAlias.type.target);
      expect(exportedReferenceTypeAlias.type.typeArguments).toHaveLength(2);
      expect(exportedReferenceTypeAlias.type.target.kind).toBe(EntityKind.Unresolved);
    });

  }

  {

    const testFileContent = ts`
      export type UnresolvedPromise = Promise<string>;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "UnresolvedPromise")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should create an unresolved type reference target for a Promise", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedReferenceTypeAlias.type.target);
      expect(exportedReferenceTypeAlias.type.target.kind).toBe(EntityKind.Unresolved);
    });

  }

});
