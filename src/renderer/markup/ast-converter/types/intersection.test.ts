import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertIntersectionType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";

import type { IntersectionType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Intersection, () => {

  {

    const testFileContent = ts`
      export type Type = { a: string } & { b: number };
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertIntersectionType(ctx, type as IntersectionType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render join multiple types with a `&`", () => {
      expect(renderedType).to.contain("string");
      expect(renderedType).to.contain("&");
      expect(renderedType).to.contain("number");
    });

  }

});
