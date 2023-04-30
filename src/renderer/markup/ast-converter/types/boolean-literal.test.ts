import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertBooleanLiteralType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";

import type { BooleanLiteralType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.BooleanLiteral, () => {

  {

    const testFileContent = ts`
      export type Type = true;
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertBooleanLiteralType(ctx, type as BooleanLiteralType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the literal value", () => {
      expect(renderedType).to.equal("true");
    });

  }

  {

    const testFileContent = ts`
      export type Type = false;
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertBooleanLiteralType(ctx, type as BooleanLiteralType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the literal value", () => {
      expect(renderedType).to.equal("false");
    });

  }

});