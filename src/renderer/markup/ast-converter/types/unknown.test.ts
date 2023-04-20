import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertUnknownType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";

import type { UnknownType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Unknown, () => {

  {

    const testFileContent = ts`
      export type Type = unknown;
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertUnknownType(ctx, type as UnknownType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("unknown");
    });

  }

});
