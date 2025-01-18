import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";


scope("Interpreter", TypeKind.Undefined, () => {

  it("should be able to handle undefined types", () => {

    const testFileContent = ts`
      export type UndefinedType = undefined;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "UndefinedType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    expect(exportedTypeAlias.type.kind).toBe(TypeKind.Undefined);

  });

});
