import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { IntersectionType } from "quickdoks:compiler:type-definitions/types.d.js";


scope("Compiler", TypeKind.IntersectionType, () => {

  {

    const testFileContent = ts`
      export type IntersectionType = { a: string } & { b: number };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "IntersectionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse an intersection type", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.IntersectionType);
    });

  }

  {

    const testFileContent = ts`
      export type IntersectionType = { a: string } & { b: number };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "IntersectionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.IntersectionType);
    });

    it("should have the right amount of types", () => {
      expect((exportedTypeAlias.type as IntersectionType).types).to.have.lengthOf(2);
    });

  }

});
