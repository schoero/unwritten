import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { convertAnyTypeInline } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { AnyType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Any, () => {

  {

    const testFileContent = ts`
      export type Type = any;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertAnyTypeInline(ctx, type as AnyType);
    const renderedType = renderNode(ctx, convertedType);

    it.todo("should render the name of the type", () => {
      expect(renderedType).toBe("any");
    });

  }

});