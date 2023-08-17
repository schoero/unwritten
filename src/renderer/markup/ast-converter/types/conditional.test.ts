import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { isAnchorNode, isConditionalNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import {
  convertConditionalTypeInline,
  convertConditionalTypeMultiline
} from "unwritten:renderer:markup/ast-converter/types/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import type { ConditionalType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Conditional, () => {

  {

    const testFileContent = ts`
      export type Type<T> = T extends "A" ? "a" : "b";
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedTypeInline = convertConditionalTypeInline(ctx, type as ConditionalType);
    const convertedTypeMultiline = convertConditionalTypeMultiline(ctx, type as ConditionalType);

    it("should render the correct inline type", () => {
      expect(convertedTypeInline).toContain("conditional");
    });

    const [
      checkType,
      extendsType,
      trueType,
      falseType
    ] = convertedTypeMultiline.children;

    const [
      inlineCheckType,
      multilineCheckType
    ] = checkType;

    const [
      inlineExtendsType,
      multilineExtendsType
    ] = extendsType;

    const [
      inlineTrueType,
      multilineTrueType
    ] = trueType;

    const [
      inlineFalseType,
      multilineFalseType
    ] = falseType;

    it("should have a matching check type", () => {
      assert(isConditionalNode(inlineCheckType[2]));
      assert(Array.isArray(inlineCheckType[2].trueChildren));
      assert(isAnchorNode(inlineCheckType[2].trueChildren[0]));
      expect(inlineCheckType[2].trueChildren[0].name).toBe("T");
      expect(multilineCheckType).toBe("");
    });

    it("should have a matching extends type", () => {
      expect(inlineExtendsType[2]).toContain("A");
      expect(multilineExtendsType).toBe("");
    });

    it("should have a matching true type", () => {
      expect(inlineTrueType[2]).toContain("a");
      expect(multilineTrueType).toBe("");
    });

    it("should have a matching false type", () => {
      expect(inlineFalseType[2]).toContain("b");
      expect(multilineFalseType).toBe("");
    });

  }

});
