import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import {
  convertUnionTypeInline,
  convertUnionTypeMultiline
} from "unwritten:renderer:markup/ast-converter/types/index";
import { renderNode } from "unwritten:renderer:markup/html/index";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";

import type { UnionType } from "unwritten:interpreter:type-definitions/types";


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
      expect(renderNode(ctx, convertedMultilineType.children[1])).toContain("type literal");
    });

  }

});
