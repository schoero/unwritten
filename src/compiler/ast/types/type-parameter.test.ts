import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { TypeReferenceType } from "quickdoks:compiler/type-definitions/types.js";


scope("Compiler", TypeKind.TypeParameter, () => {

  {

    const testFileContent = ts`
      export type GenericTypeAlias<T> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "GenericTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse type parameter types", () => {
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.TypeReference);
      expect(exportedTypeAlias.typeParameters).toHaveLength(1);
      expect((exportedTypeAlias.type as TypeReferenceType).type).to.not.equal(undefined);
      expect((exportedTypeAlias.type as TypeReferenceType).type!.kind).to.equal(TypeKind.TypeParameter);
    });

  }

});