import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertArrayType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";

import type { ArrayType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Array, () => {

  {

    const testFileContent = ts`
      export type Type = string[];
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertArrayType(ctx, type as ArrayType);
    const renderedType = renderNode(ctx, convertedType);

    it("should be able to render arrays", () => {
      expect(renderedType).to.equal("string[]");
    });

  }

  {

    const testFileContent = ts`
      export type Type = (string | number)[];
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertArrayType(ctx, type as ArrayType);
    const renderedType = renderNode(ctx, convertedType);

    it("should add parentheses around union types", () => {
      expect(renderedType).to.equal("(string | number)[]");
    });

  }

});
