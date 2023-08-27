import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isIndexedAccessType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.IndexedAccess, () => {

  {

    // In this example, the type of the indexedAccessTypeNode is directly the resolved type.
    const testFileContent = ts`
      type TypeLiteral = {
        prop: string;
      };
      export type IndexedAccess = TypeLiteral["prop"];
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "IndexedAccess")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse indexed access type nodes", () => {
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.IndexedAccess);
    });

    it("should have a correct objectType", () => {
      assert(isIndexedAccessType(exportedTypeAlias.type));
      assert(exportedTypeAlias.type.objectType.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.type.objectType.type?.kind).toBe(TypeKind.TypeLiteral);
    });

    it("should have a correct indexType", () => {
      assert(isIndexedAccessType(exportedTypeAlias.type));
      expect(exportedTypeAlias.type.indexType.kind).toBe(TypeKind.StringLiteral);
    });

    it("should have a correct type", () => {
      assert(isIndexedAccessType(exportedTypeAlias.type));
      expect(exportedTypeAlias.type.type?.kind).toBe(TypeKind.String);
    });

  }

  {

    // In this example, somehow the type of the indexedAccessTypeNode is a indexedAccessType. Make sure this is handled.
    const testFileContent = ts`
      export type Type<T extends { prop: string; }> = T["prop"];
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse indexed access types", () => {
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.IndexedAccess);
    });

    it("should have a correct objectType", () => {
      assert(isIndexedAccessType(exportedTypeAlias.type));
      assert(exportedTypeAlias.type.objectType.kind === TypeKind.TypeParameter);
      expect(exportedTypeAlias.type.objectType.constraint?.kind).toBe(TypeKind.TypeLiteral);
    });

    it("should have a correct indexType", () => {
      assert(isIndexedAccessType(exportedTypeAlias.type));
      expect(exportedTypeAlias.type.indexType.kind).toBe(TypeKind.StringLiteral);
    });

    it("should have a correct type", () => {
      assert(isIndexedAccessType(exportedTypeAlias.type));
      expect(exportedTypeAlias.type.type?.kind).toBe(TypeKind.String);
    });

  }

});
