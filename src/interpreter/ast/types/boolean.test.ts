import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";


scope("Interpreter", TypeKind.Boolean, () => {

  it("should be able to handle boolean types", () => {

    const testFileContent = ts`
      export type BooleanType = boolean;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "BooleanType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    expect(exportedTypeAlias.type.kind).toBe(TypeKind.Boolean);

  });

});
