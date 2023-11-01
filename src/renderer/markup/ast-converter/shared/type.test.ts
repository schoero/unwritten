import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/type-alias";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";

// TODO: Implement this test

scope("MarkupRenderer", "Type", () => {

  {

    const testFileContent = ts`
      export type Type = "test";
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const convertedType = convertType(ctx, type);

    assert(convertedType, "Converted type is undefined");

    const {
      inlineType,
      multilineType
    } = convertedType;

    it("should have a matching inline type", () => {
      expect(inlineType).toEqual(["\"", "test", "\""]);
    });

    it("should not have a multiline type", () => {
      expect(multilineType).toBeUndefined();
    });

  }

  {

    const testFileContent = ts`
      export type Type = {
        prop: "test"
      };
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const convertedType = convertType(ctx, type);

    assert(convertedType, "Converted type is undefined");

    const {
      inlineType,
      multilineType
    } = convertedType;

    it("should have a matching inline type", () => {
      expect(inlineType).toBe("type literal");
    });

    it("should have a multiline type", () => {
      expect(multilineType).toBeDefined();
    });

  }

});
