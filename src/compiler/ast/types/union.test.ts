import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { UnionType } from "quickdoks:compiler:type-definitions/types.d.js";


scope("Compiler", TypeKind.UnionType, () => {

  {

    const testFileContent = ts`
      export type UnionType = string | number;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "UnionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse an union type", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.UnionType);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Union type description
       * @example Union type example
       */
      export type UnionType = string | number;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "UnionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.UnionType);
    });

    it("should have the correct amount of types", () => {
      expect((exportedTypeAlias.type as UnionType).types).to.have.lengthOf(2);
    });

    it("should have the correct types", () => {
      expect((exportedTypeAlias.type as UnionType).types[0]!.kind).to.equal(TypeKind.String);
      expect((exportedTypeAlias.type as UnionType).types[1]!.kind).to.equal(TypeKind.Number);
    });

  }

});