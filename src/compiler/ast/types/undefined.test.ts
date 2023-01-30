import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:compiler:entities";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", TypeKind.Undefined, () => {

  it("should be able to handle undefined types", () => {

    const testFileContent = ts`
      export type UndefinedType = undefined;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "UndefinedType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Undefined);

  });

});
