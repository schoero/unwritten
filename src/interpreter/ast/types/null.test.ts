import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.Null, () => {

  it("should be able to handle null types", () => {

    const testFileContent = ts`
      export type NullType = null;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "NullType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    expect(exportedTypeAlias.type.kind).toBe(TypeKind.Null);

  });

});
