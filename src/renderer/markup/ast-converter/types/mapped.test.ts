import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import {
  convertMappedTypeInline,
  convertMappedTypeMultiline
} from "unwritten:renderer:markup/ast-converter/types/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { MappedType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Mapped, () => {

  {

    const testFileContent = ts`
      export type Type = {
        readonly [K in "A" | "B"]?: string;
      };
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedTypeInline = convertMappedTypeInline(ctx, type as MappedType);
    const convertedTypeMultiline = convertMappedTypeMultiline(ctx, type as MappedType);

    it("should render the correct inline type", () => {
      expect(convertedTypeInline).toContain("mapped");
    });

    const [
      keyType,
      valueType
    ] = convertedTypeMultiline.children;

    const [
      inlineKeyType,
      multilineKeyType
    ] = keyType;

    const [
      inlineValueType,
      multilineValueType
    ] = valueType;

    it("should have an union type as key type", () => {
      const renderedKeyType = renderNode(ctx, inlineKeyType);
      expect(renderedKeyType).toContain("A");
      expect(renderedKeyType).toContain("|");
      expect(renderedKeyType).toContain("B");
    });

    it("should have a matching value type", () => {
      expect(inlineValueType).toContain("string");
    });

  }

});
