import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { convertFunctionTypeMultiline } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { isInlineTitleNode, isListNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import type { FunctionType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Function, () => {

  {

    const ctx = createRenderContext();

    const testFileContent = ts`
      export type Type = () => boolean;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const convertedType = convertFunctionTypeMultiline(ctx, type as FunctionType);

    assert(!isListNode(convertedType), "single signatures should not be wrapped in a list node");

    const [
      signature,
      typeParameters,
      parameters,
      returnType
    ] = convertedType.children;

    it("should render the function signature correctly", () => {
      expect(renderNode(ctx, signature)).toBe("()");
    });

    it("should not have type parameters", () => {
      expect(typeParameters).toBe("");
    });

    it("should not have parameters", () => {
      expect(parameters).toBe("");
    });

    it("should render the return type correctly", () => {
      assert(isInlineTitleNode(returnType));
      expect(renderNode(ctx, returnType.children[0])).toContain("boolean");
    });

  }

  {

    const testFileContent = ts`
      export type Type = (a: string, b: number) => boolean;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertFunctionTypeMultiline(ctx, type as FunctionType);

    assert(!isListNode(convertedType), "single signatures should not be wrapped in a list node");

    const [
      signature,
      typeParameters,
      parameters,
      returnType
    ] = convertedType.children;

    it("should render the function signature correctly", () => {
      expect(renderNode(ctx, signature)).toBe("(a, b)");
    });

    it("should not have type parameters", () => {
      expect(typeParameters).toBe("");
    });

    it("should have two matching parameters", () => {
      assert(isInlineTitleNode(parameters), "parameters should be wrapped in a list node");
      const parameterList = parameters.children[0];
      expect(parameterList.children).toHaveLength(2);
      const renderedParameter1 = renderNode(ctx, parameterList.children[0]);
      expect(renderedParameter1).toContain("a");
      expect(renderedParameter1).toContain("string");
      const renderedParameter2 = renderNode(ctx, parameterList.children[1]);
      expect(renderedParameter2).toContain("b");
      expect(renderedParameter2).toContain("number");
    });

    it("should render the return type correctly", () => {
      assert(isInlineTitleNode(returnType));
      expect(renderNode(ctx, returnType.children[0])).toContain("boolean");
    });

  }

  {

    const testFileContent = ts`
      export type ObjectType = {
        /**
         * Adds two numbers together.
         *
         * @param a The first number.
         * @param b The second number.
         * @returns The sum of the two numbers.
         */
        (a: number, b: number): number;
        /**
         * Adds 3 numbers together.
         *
         * @param a The first number.
         * @param b The second number.
         * @param c The third number.
         * @returns The sum of the 3 numbers.
         */
        (a: number, b: number, c: number): number;
      };
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ObjectType")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertFunctionTypeMultiline(ctx, type as FunctionType);

    assert(isListNode(convertedType), "multiple signatures should be wrapped in a list node");

    const [convertedSignature1, convertedSignature2] = convertedType.children;

    const [
      signature,
      typeParameters,
      parameters,
      returnType
    ] = convertedSignature1.children;

    const [
      signature2,
      typeParameters2,
      parameters2,
      returnType2
    ] = convertedSignature2.children;

    it("should render the function signature correctly", () => {
      expect(renderNode(ctx, signature)).toContain("(a, b)");
      expect(renderNode(ctx, signature2)).toContain("(a, b, c)");
    });

    it("should include the description in the signature", () => {
      expect(renderNode(ctx, signature)).toContain("Adds two numbers together.");
      expect(renderNode(ctx, signature2)).toContain("Adds 3 numbers together.");
    });

    it("should not have type parameters", () => {
      expect(typeParameters).toBe("");
      expect(typeParameters2).toBe("");
    });

    it("should have matching parameters in each signature", () => {
      {
        assert(isInlineTitleNode(parameters));
        const parameterList = parameters.children[0];
        expect(parameterList.children).toHaveLength(2);
        const renderedParameter1 = renderNode(ctx, parameterList.children[0]);
        expect(renderedParameter1).toContain("a");
        expect(renderedParameter1).toContain("number");
        const renderedParameter2 = renderNode(ctx, parameterList.children[1]);
        expect(renderedParameter2).toContain("b");
        expect(renderedParameter2).toContain("number");
      }

      {
        assert(isInlineTitleNode(parameters2));
        const parameterList2 = parameters2.children[0];
        expect(parameterList2.children).toHaveLength(3);
        const renderedParameter1 = renderNode(ctx, parameterList2.children[0]);
        expect(renderedParameter1).toContain("a");
        expect(renderedParameter1).toContain("number");
        const renderedParameter2 = renderNode(ctx, parameterList2.children[1]);
        expect(renderedParameter2).toContain("b");
        expect(renderedParameter2).toContain("number");
        const renderedParameter3 = renderNode(ctx, parameterList2.children[2]);
        expect(renderedParameter3).toContain("c");
        expect(renderedParameter3).toContain("number");
      }
    });

    it("should render the return type correctly for each signature", () => {
      assert(isInlineTitleNode(returnType));
      expect(renderNode(ctx, returnType.children[0])).toContain("number");
      assert(isInlineTitleNode(returnType2));
      expect(renderNode(ctx, returnType2.children[0])).toContain("number");
    });

  }

});
