import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { TypeReferenceType } from "quickdoks:compiler/type-definitions/types.js";


scope("Compiler", TypeKind.Unresolved, () => {

  {

    const testFileContent = ts`
      export type Unresolved = Symbol;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent, undefined, {
      compilerConfig: {
        exclude: ["node_modules/**/*"]
      }
    });

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "Unresolved")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should export a type alias, which is a type reference to another type alias", () => {
      expect(exportedReferenceTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedReferenceTypeAlias.type.kind).toBe(TypeKind.TypeReference);
      expect((exportedReferenceTypeAlias.type as TypeReferenceType).type).to.not.equal(undefined);
      expect((exportedReferenceTypeAlias.type as TypeReferenceType).type!.kind).to.equal(TypeKind.Unresolved);
    });

  }

});