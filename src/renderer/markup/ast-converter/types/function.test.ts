import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { isListNode, isTitleNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { convertFunctionType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";
import { assert } from "unwritten:utils/general.js";

import type { FunctionType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Function, () => {

  {

    const ctx = createRenderContext();

    const testFileContent = ts`
      export type Type = () => boolean;
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const convertedType = convertFunctionType(ctx, type as FunctionType);

    assert(!isListNode(convertedType), "single signatures should not be wrapped in a list node");

    const [
      signature,
      position,
      tags,
      typeParameters,
      parameters,
      returnType,
      remarks,
      example
    ] = convertedType;

    it("should render the function signature correctly", () => {
      expect(renderNode(ctx, signature)).to.equal("()");
    });

    it("should not have parameters", () => {
      expect(parameters).to.equal("");
    });

    it("should render the return type correctly", () => {
      assert(isTitleNode(returnType));
      expect(returnType.children[0]).to.include("boolean");
    });

  }

  {

    const testFileContent = ts`
      export type Type = (a: string, b: number) => boolean;
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertFunctionType(ctx, type as FunctionType);

    assert(!isListNode(convertedType), "single signatures should not be wrapped in a list node");

    const [
      signature,
      position,
      tags,
      typeParameters,
      parameters,
      returnType,
      remarks,
      example
    ] = convertedType;

    it("should render the function signature correctly", () => {
      expect(renderNode(ctx, signature)).to.equal("(a, b)");
    });

    it("should not have type parameters", () => {
      expect(typeParameters).to.equal("");
    });

    it("should have two matching parameters", () => {
      assert(isTitleNode(parameters));
      assert(isListNode(parameters.children[0]));
      expect(parameters.children[0].children.length).to.equal(2);
      expect(parameters.children[0].children[0]).to.include("a");
      expect(parameters.children[0].children[0]).to.include("string");
      expect(parameters.children[0].children[1]).to.include("b");
      expect(parameters.children[0].children[1]).to.include("number");
    });

    it("should render the return type correctly", () => {
      assert(isTitleNode(returnType));
      expect(returnType.children[0]).to.include("boolean");
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

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ObjectType")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertFunctionType(ctx, type as FunctionType);

    assert(isListNode(convertedType), "multiple signatures should be wrapped in a list node");

    const [
      [
        signature,
        position,
        tags,
        typeParameters,
        parameters,
        returnType,
        remarks,
        example
      ], [
        signature2,
        position2,
        tags2,
        typeParameters2,
        parameters2,
        returnType2,
        remarks2,
        example2
      ]
    ] = convertedType.children;

    it("should render the function signature correctly", () => {
      expect(renderNode(ctx, signature)).to.equal("(a, b)");
      expect(renderNode(ctx, signature2)).to.equal("(a, b, c)");
    });

    it("should not have type parameters", () => {
      expect(typeParameters).to.equal("");
      expect(typeParameters2).to.equal("");
    });

    it("should have matching parameters in each signature", () => {
      assert(isTitleNode(parameters));
      assert(isListNode(parameters.children[0]));
      expect(parameters.children[0].children.length).to.equal(2);
      expect(parameters.children[0].children[0]).to.include("a");
      expect(parameters.children[0].children[0]).to.include("number");
      expect(parameters.children[0].children[1]).to.include("b");
      expect(parameters.children[0].children[1]).to.include("number");

      assert(isTitleNode(parameters2));
      assert(isListNode(parameters2.children[0]));
      expect(parameters2.children[0].children.length).to.equal(3);
      expect(parameters2.children[0].children[0]).to.include("a");
      expect(parameters2.children[0].children[0]).to.include("number");
      expect(parameters2.children[0].children[1]).to.include("b");
      expect(parameters2.children[0].children[1]).to.include("number");
      expect(parameters2.children[0].children[2]).to.include("c");
      expect(parameters2.children[0].children[2]).to.include("number");
    });

    it("should render the return type correctly for each signature", () => {
      assert(isTitleNode(returnType));
      expect(returnType.children[0]).to.include("number");

      assert(isTitleNode(returnType2));
      expect(returnType2.children[0]).to.include("number");
    });

  }

});
