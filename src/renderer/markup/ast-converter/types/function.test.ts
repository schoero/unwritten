import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { isListNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { convertFunctionTypeMultiline } from "unwritten:renderer:markup/ast-converter/types/index.js";
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

    assert(Array.isArray(convertedType), "single signatures should not be wrapped in a list node");

    const [
      signature,
      typeParameters,
      parameters,
      returnType
    ] = convertedType;

    it("should render the function signature correctly", () => {
      expect(renderNode(ctx, signature)).to.equal("()");
    });

    it("should not have type parameters", () => {
      expect(typeParameters).to.equal("");
    });

    it("should not have parameters", () => {
      expect(parameters).to.equal("");
    });

    it("should render the return type correctly", () => {
      assert(isListNode(returnType));
      expect(returnType.children[0]).toContain("boolean");
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

    assert(Array.isArray(convertedType), "single signatures should not be wrapped in a list node");

    const [
      signature,
      typeParameters,
      parameters,
      returnType
    ] = convertedType;

    it("should render the function signature correctly", () => {
      expect(renderNode(ctx, signature)).to.equal("(a, b)");
    });

    it("should not have type parameters", () => {
      expect(typeParameters).to.equal("");
    });

    it("should have two matching parameters", () => {
      assert(isListNode(parameters), "parameters should be wrapped in a list node");
      expect(parameters.children.length).to.equal(2);
      expect(parameters.children[0]).toContain("a");
      expect(parameters.children[0]).toContain("string");
      expect(parameters.children[1]).toContain("b");
      expect(parameters.children[1]).toContain("number");
    });

    it("should render the return type correctly", () => {
      assert(isListNode(returnType));
      expect(returnType.children[0]).toContain("boolean");
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

    const [
      [
        signature,
        typeParameters,
        parameters,
        returnType
      ], [
        signature2,
        typeParameters2,
        parameters2,
        returnType2
      ]
    ] = convertedType.children;

    it("should render the function signature correctly", () => {
      expect(renderNode(ctx, signature)).toContain("(a, b)");
      expect(renderNode(ctx, signature2)).toContain("(a, b, c)");
    });

    it("should include the description in the signature", () => {
      expect(renderNode(ctx, signature)).toContain("Adds two numbers together.");
      expect(renderNode(ctx, signature2)).toContain("Adds 3 numbers together.");
    });

    it("should not have type parameters", () => {
      expect(typeParameters).to.equal("");
      expect(typeParameters2).to.equal("");
    });

    it("should have matching parameters in each signature", () => {
      assert(isListNode(parameters));
      expect(parameters.children.length).to.equal(2);
      expect(parameters.children[0]).toContain("a");
      expect(parameters.children[0]).toContain("number");
      expect(parameters.children[1]).toContain("b");
      expect(parameters.children[1]).toContain("number");

      assert(isListNode(parameters2));
      expect(parameters2.children.length).to.equal(3);
      expect(parameters2.children[0]).toContain("a");
      expect(parameters2.children[0]).toContain("number");
      expect(parameters2.children[1]).toContain("b");
      expect(parameters2.children[1]).toContain("number");
      expect(parameters2.children[2]).toContain("c");
      expect(parameters2.children[2]).toContain("number");
    });

    it("should render the return type correctly for each signature", () => {
      assert(isListNode(returnType));
      expect(returnType.children[0]).toContain("number");
      assert(isListNode(returnType2));
      expect(returnType2.children[0]).toContain("number");
    });

  }

});
