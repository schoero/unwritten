import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


scope("Interpreter", TypeKind.Unknown, () => {

  it("should be able to handle unknown types", () => {

    const testFileContent = ts`
      export type UnknownType = unknown;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "UnknownType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    expect(exportedTypeAlias.type.kind).toBe(TypeKind.Unknown);

  });

});
