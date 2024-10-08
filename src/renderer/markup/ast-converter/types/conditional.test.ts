import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import {
  convertConditionalTypeInline,
  convertConditionalTypeMultiline
} from "unwritten:renderer:markup/ast-converter/types/index";
import { isAnchorNode, isConditionalNode } from "unwritten:renderer/markup/typeguards/renderer";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";

import type { ConditionalType } from "unwritten:interpreter:type-definitions/types";


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
    ] = checkType.children;

    const [
      inlineExtendsType,
      multilineExtendsType
    ] = extendsType.children;

    const [
      inlineTrueType,
      multilineTrueType
    ] = trueType.children;

    const [
      inlineFalseType,
      multilineFalseType
    ] = falseType.children;

    it("should have a matching check type", () => {
      assert(isConditionalNode(inlineCheckType[2]));
      assert(isAnchorNode(inlineCheckType[2].trueChildren));
      expect(inlineCheckType[2].trueChildren.name).toBe("T");
      expect(multilineCheckType).toBeFalsy();
    });

    it("should have a matching extends type", () => {
      expect(inlineExtendsType[2]).toContain("A");
      expect(multilineExtendsType).toBeFalsy();
    });

    it("should have a matching true type", () => {
      expect(inlineTrueType[2]).toContain("a");
      expect(multilineTrueType).toBeFalsy();
    });

    it("should have a matching false type", () => {
      expect(inlineFalseType[2]).toContain("b");
      expect(multilineFalseType).toBeFalsy();
    });

  }

});
