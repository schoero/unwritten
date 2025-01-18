import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertStringTypeInline } from "unwritten:renderer:markup/ast-converter/types/index";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";

import type { StringType } from "unwritten:interpreter:type-definitions/types";


scope("MarkupRenderer", TypeKind.String, () => {

  {

    const testFileContent = ts`
      export type Type = string;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertStringTypeInline(ctx, type as StringType);

    it("should render the name of the type", () => {
      expect(convertedType).toBe("string");
    });

  }

});
