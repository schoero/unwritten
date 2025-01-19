import { assert, expect, it } from "vitest";

import {
  createFunctionEntity,
  createTypeAliasEntity,
  createVariableEntity
} from "unwritten:interpreter:ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertTypeQueryTypeInline } from "unwritten:renderer/markup/ast-converter/types/type-query";
import { isAnchorNode, isConditionalNode } from "unwritten:renderer/markup/typeguards/renderer";
import { createRenderContext } from "unwritten:root:tests/utils/context";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { isTypeQueryType } from "unwritten:typeguards/types";
import { ts } from "unwritten:utils/template";


scope("MarkupRenderer", TypeKind.TypeQuery, () => {

  {

    const testFileContent = ts`
      export const test = 7;
      export type TypeQuery = typeof test;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const typeQueryTargetSymbol = exportedSymbols.find(s => s.name === "test")!;
    const typeQueryTarget = createVariableEntity(compilerContext, typeQueryTargetSymbol);
    const typeQuerySymbol = exportedSymbols.find(s => s.name === "TypeQuery")!;
    const typeQueryTypeAlias = createTypeAliasEntity(compilerContext, typeQuerySymbol);

    assert(isTypeQueryType(typeQueryTypeAlias.type));

    const ctx = createRenderContext();
    const convertedTypeQueryType = convertTypeQueryTypeInline(ctx, typeQueryTypeAlias.type);

    assert(Array.isArray(convertedTypeQueryType));

    const [typeofKeyword, space, condition, typeArguments] = convertedTypeQueryType;

    it("should have the correct name", () => {
      assert(isConditionalNode(condition));
      assert(isAnchorNode(condition.trueChildren));
      expect(condition.trueChildren.name).toBe("test");
    });

  }

  {

    const testFileContent = ts`
      export function test<T extends string>(param: T): void {}
      export type TypeQuery = typeof test<"test">;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const typeQueryTargetSymbol = exportedSymbols.find(s => s.name === "test")!;
    const typeQueryTarget = createFunctionEntity(compilerContext, typeQueryTargetSymbol);
    const typeQuerySymbol = exportedSymbols.find(s => s.name === "TypeQuery")!;
    const typeQueryTypeAlias = createTypeAliasEntity(compilerContext, typeQuerySymbol);

    assert(isTypeQueryType(typeQueryTypeAlias.type));

    const ctx = createRenderContext();
    const convertedTypeQueryType = convertTypeQueryTypeInline(ctx, typeQueryTypeAlias.type);

    assert(Array.isArray(convertedTypeQueryType));

    const [typeofKeyword, space, condition, typeArguments] = convertedTypeQueryType;

    it("should render type arguments", () => {
      assert(Array.isArray(typeArguments));
      assert(typeArguments.length === 3);
      assert(Array.isArray(typeArguments[1]));

      const [openBracket, [typeArgument], closeBracket] = typeArguments;

      assert(Array.isArray(typeArgument));
      assert(typeArgument.length === 3);

      const [openQuote, typeArgumentValue, closeQuote] = typeArgument;
      expect(typeArgumentValue).toBe("test");
    });

  }

  {

    const testFileContent = ts`
      export function test<T extends string>(param: T): void {}
      type Aliased = "aliased";
      export type TypeQuery = typeof test<Aliased>;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const typeQueryTargetSymbol = exportedSymbols.find(s => s.name === "test")!;
    const typeQueryTarget = createFunctionEntity(compilerContext, typeQueryTargetSymbol);
    const typeQuerySymbol = exportedSymbols.find(s => s.name === "TypeQuery")!;
    const typeQueryTypeAlias = createTypeAliasEntity(compilerContext, typeQuerySymbol);

    assert(isTypeQueryType(typeQueryTypeAlias.type));

    const ctx = createRenderContext();
    const convertedTypeQueryType = convertTypeQueryTypeInline(ctx, typeQueryTypeAlias.type);

    assert(Array.isArray(convertedTypeQueryType));

    const [typeofKeyword, space, condition, typeArguments] = convertedTypeQueryType;

    it("should link to aliased type arguments", () => {
      assert(Array.isArray(typeArguments));
      assert(typeArguments.length === 3);
      assert(Array.isArray(typeArguments[1]));

      const [openBracket, [typeArgument], closeBracket] = typeArguments;

      assert(isConditionalNode(typeArgument));
      assert(isAnchorNode(typeArgument.trueChildren));
      expect(typeArgument.trueChildren.name).toBe("Aliased");
    });

  }

});
