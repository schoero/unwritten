import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import {
  convertIntersectionTypeInline,
  convertIntersectionTypeMultiline
} from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { IntersectionType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Intersection, () => {

  {

    const testFileContent = ts`
      export type Type = string & { prop: number };
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedInlineType = convertIntersectionTypeInline(ctx, type as IntersectionType);
    const convertedMultilineType = convertIntersectionTypeMultiline(ctx, type as IntersectionType);

    it("should render all intersection types as a list, because intersection types must always contain a non-primitive type.", () => {
      expect(renderNode(ctx, convertedInlineType)).toBe("intersection");
    });

    it("should render intersection types as a list", () => {
      expect(convertedMultilineType.children).toHaveLength(2);
      expect(renderNode(ctx, convertedMultilineType.children[0])).toContain("string");
      expect(renderNode(ctx, convertedMultilineType.children[1])).toContain("type literal");
    });

  }

});
