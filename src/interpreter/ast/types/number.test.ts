import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Interpreter", TypeKind.Number, () => {

  it("should be able to handle number types", () => {

    const testFileContent = ts`
      export type NumberType = number;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "NumberType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Number);

  });

});