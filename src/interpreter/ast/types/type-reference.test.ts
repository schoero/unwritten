import { assert, expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.TypeReference, () => {

  {

    const testFileContent = ts`
      export type A = string;
      export type Reference = A;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "A")!;
    const exportedTypeAliasEntity = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    const exportedTypeReferenceAliasSymbol = exportedSymbols.find(s => s.name === "Reference")!;
    const exportedReferenceEntity = createTypeAliasEntity(ctx, exportedTypeReferenceAliasSymbol);

    it("should be able to interpret a type reference", () => {
      expect(exportedReferenceEntity.kind).toBe(EntityKind.TypeAlias);
      expect(exportedReferenceEntity.type.kind).toBe(TypeKind.TypeReference);
    });

    it("should have a matching name", () => {
      assert(exportedReferenceEntity.type.kind === TypeKind.TypeReference);
      expect(exportedReferenceEntity.type.name).toBe("A");
    });

    it("should have a matching target", () => {
      assert(exportedReferenceEntity.type.kind === TypeKind.TypeReference);
      expect(exportedReferenceEntity.type.target).toEqual(exportedTypeAliasEntity);
    });

    it("should have a matching type", () => {
      assert(exportedReferenceEntity.type.kind === TypeKind.TypeReference);
      expect(exportedReferenceEntity.type.type).toBeDefined();
      expect(exportedReferenceEntity.type.type!.kind).toBe(TypeKind.String);
    });

  }

  {

    const testFileContent = ts`
      export type Declared<T extends string> = T;
      export type Resolved = Declared<"test">;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const declaredSymbol = exportedSymbols.find(s => s.name === "Declared")!;
    const exportedDeclaredTypeAlias = createTypeAliasEntity(ctx, declaredSymbol);

    const resolvedSymbol = exportedSymbols.find(s => s.name === "Resolved")!;
    const exportedResolvedTypeAlias = createTypeAliasEntity(ctx, resolvedSymbol);

    it("should resolve to the actual type for instantiated types", () => {
      assert(exportedResolvedTypeAlias.type.kind === TypeKind.TypeReference);
      assert(exportedResolvedTypeAlias.type.type!.kind === TypeKind.StringLiteral);
      expect(exportedResolvedTypeAlias.type.type.value).toBe("test");
    });

    it("should not resolve to the actual type for types that are not instantiated", () => {
      assert(exportedDeclaredTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedDeclaredTypeAlias.type.type?.kind).toBe(TypeKind.TypeParameter);
    });

    it("should have a type argument, even though the type gets resolved.", () => {
      assert(exportedResolvedTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedResolvedTypeAlias.type.typeArguments).toHaveLength(1);
      assert(exportedResolvedTypeAlias.type.typeArguments![0]?.kind === TypeKind.StringLiteral);
      expect(exportedResolvedTypeAlias.type.typeArguments![0]?.value).toBe("test");
    });

  }

});
