import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { TypeReferenceEntity } from "quickdoks:compiler:type-definitions/entities.d.js";


scope("Compiler", EntityKind.TypeArgument, () => {

  {

    const testFileContent = ts`
      type StringLiteral<T> = T;
      export type StringLiteralTypeAlias = StringLiteral<"Test">;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "StringLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching type argument", () => {
      expect((exportedTypeAlias.type as TypeReferenceEntity).typeArguments).to.have.lengthOf(1);
      expect((exportedTypeAlias.type as TypeReferenceEntity).typeArguments![0]!.kind).to.equal(EntityKind.TypeArgument);
    });

    it("should be able to resolve the type argument", () => {
      expect((exportedTypeAlias.type as TypeReferenceEntity).typeArguments![0]!.type).to.not.equal(undefined);
      expect((exportedTypeAlias.type as TypeReferenceEntity).typeArguments![0]!.type.kind).to.equal(TypeKind.StringLiteral);
    });

  }

});
