import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertBooleanLiteralTypeInline } from "unwritten:renderer:markup/ast-converter/types/index";
import { renderNode } from "unwritten:renderer:markup/html/index";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";

import type { BooleanLiteralType } from "unwritten:interpreter:type-definitions/types";


scope("MarkupRenderer", TypeKind.BooleanLiteral, () => {

  {

    const testFileContent = ts`
      export type Type = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertBooleanLiteralTypeInline(ctx, type as BooleanLiteralType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the literal value", () => {
      expect(renderedType).toBe("true");
    });

  }

  {

    const testFileContent = ts`
      export type Type = false;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertBooleanLiteralTypeInline(ctx, type as BooleanLiteralType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the literal value", () => {
      expect(renderedType).toBe("false");
    });

  }

});
