import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";


scope("Compiler", TypeKind.String, () => {

  it("should be able to handle string types", () => {

    const testFileContent = ts`
      export type StringType = string;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "StringType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    expect(exportedTypeAlias.type.kind).to.equal(TypeKind.String);

  });

});
