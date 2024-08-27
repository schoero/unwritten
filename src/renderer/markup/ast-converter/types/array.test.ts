import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import {
  convertArrayTypeInline,
  convertArrayTypeMultiline
} from "unwritten:renderer:markup/ast-converter/types/index";
import { isMultilineNode } from "unwritten:renderer/markup/typeguards/renderer";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";

import type { ArrayType } from "unwritten:interpreter:type-definitions/types";
import type { ConvertedObjectTypeMultiline } from "unwritten:renderer/markup/types-definitions/renderer";


scope("MarkupRenderer", TypeKind.Array, () => {

  {

    const testFileContent = ts`
      export type Type = string[];
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const inlineArrayType = convertArrayTypeInline(ctx, type as ArrayType);
    const multilineArrayType = convertArrayTypeMultiline(ctx, type as ArrayType);

    const [inlineType, multilineType] = multilineArrayType.children[0].children;

    it("should be able to render arrays", () => {
      expect(inlineArrayType).toBe("Array");
      expect(inlineType).toBe("string");
      expect(multilineType).toBeFalsy();
    });

  }

  {

    const testFileContent = ts`
      export type Type = (string | number)[];
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const inlineArrayType = convertArrayTypeInline(ctx, type as ArrayType);
    const multilineArrayType = convertArrayTypeMultiline(ctx, type as ArrayType);

    const [inlineType, multilineType] = multilineArrayType.children[0].children;

    it("should add parentheses around union types", () => {
      expect(inlineArrayType).toBe("Array");
      expect(inlineType).toStrictEqual(["string", " | ", "number"]);
      expect(multilineType).toBeFalsy();
    });

  }

  {

    const testFileContent = ts`
      export type Type = { test: string }[];
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const inlineArrayType = convertArrayTypeInline(ctx, type as ArrayType);
    const multilineArrayType = convertArrayTypeMultiline(ctx, type as ArrayType);

    const [inlineType, multilineType] = multilineArrayType.children[0].children;

    assert(isMultilineNode(multilineType));

    const [
      constructSignatureList,
      callSignatureList,
      propertyList
    ] = (multilineType as ConvertedObjectTypeMultiline).children;

    const property = propertyList.children[0];

    it("should add parentheses around union types", () => {
      expect(inlineArrayType).toBe("Array");
      expect(inlineType).toBe("type literal");
      expect(property.children[0]).toContain("test");
      expect(property.children[0]).toContain("string");
    });

  }

});
