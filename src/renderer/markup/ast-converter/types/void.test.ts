import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertVoidTypeInline } from "unwritten:renderer:markup/ast-converter/types/index";
import { renderNode } from "unwritten:renderer:markup/html/index";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";

import type { VoidType } from "unwritten:interpreter:type-definitions/types";


scope("MarkupRenderer", TypeKind.Void, () => {

  {

    const testFileContent = ts`
      export type Type = void;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertVoidTypeInline(ctx, type as VoidType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the name of the type", () => {
      expect(renderedType).toBe("void");
    });

  }

});
