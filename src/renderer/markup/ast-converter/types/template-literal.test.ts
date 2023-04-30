import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertTemplateLiteralType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { TemplateLiteralType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.StringLiteral, () => {

  {

    const testFileContent = "export type Type = `${number}px`";

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTemplateLiteralType(ctx, type as TemplateLiteralType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render template literal types", () => {
      expect(renderedType).to.equal("${number}px");
    });

  }

  {

    const testFileContent = "export type Type = `PREFIX-${number}-MIDDLE-${string}-SUFFIX`";

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTemplateLiteralType(ctx, type as TemplateLiteralType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render template literal types", () => {
      expect(renderedType).to.equal("PREFIX-${number}-MIDDLE-${string}-SUFFIX");
    });

  }

  {

    const testFileContent = "export type Type = `border-${\"top\" | \"bottom\" | \"left\" | \"right\"}-${\"width\"}: ${number}px`";

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTemplateLiteralType(ctx, type as TemplateLiteralType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render template literal types", () => {
      expect(renderedType).to.equal("border-${\"top\" | \"bottom\" | \"left\" | \"right\"}-${\"width\"}: ${number}px");
    });

  }

});