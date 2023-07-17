import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import {
  convertUnionTypeInline,
  convertUnionTypeMultiline
} from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { UnionType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Union, () => {

  {

    const testFileContent = ts`
      export type Type = string | number;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedInlineType = convertUnionTypeInline(ctx, type as UnionType);

    it("should render union types inline if all individual types are inline", () => {
      expect(renderNode(ctx, convertedInlineType)).toBe("string | number");
    });

  }

  {

    const testFileContent = ts`
      export type Type = 
        | string
        | {
          prop: string
        };
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedInlineType = convertUnionTypeInline(ctx, type as UnionType);
    const convertedMultilineType = convertUnionTypeMultiline(ctx, type as UnionType);

    it("should render union types as a list, if one individual type is multiline", () => {
      expect(renderNode(ctx, convertedInlineType)).toBe("union");
    });

    it("should render union types as a list", () => {
      expect(convertedMultilineType.children).toHaveLength(2);
      expect(renderNode(ctx, convertedMultilineType.children[0])).toContain("string");
      expect(renderNode(ctx, convertedMultilineType.children[1])).toContain("object");
    });

  }

});
