import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { convertTupleTypeMultiline } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { TupleType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Tuple, () => {

  {

    const testFileContent = ts`
      export type Type = [string, number];
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTupleTypeMultiline(ctx, type as TupleType);

    it("should render multiple tuple type members correctly", () => {
      expect(convertedType.children).toHaveLength(2);
      expect(renderNode(ctx, convertedType.children[0])).toContain("string");
      expect(renderNode(ctx, convertedType.children[1])).toContain("number");
    });

  }

  {

    const testFileContent = ts`
      export type Type = [first: string, second: number];
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTupleTypeMultiline(ctx, type as TupleType);

    it("should be able to render tuple type members with labels", () => {
      expect(convertedType.children).toHaveLength(2);
      expect(renderNode(ctx, convertedType.children[0])).toContain("first string");
      expect(renderNode(ctx, convertedType.children[1])).toContain("second number");
    });

  }

  {

    const testFileContent = ts`
      export type Type = [string, number?];
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTupleTypeMultiline(ctx, type as TupleType);

    it("should be able to render optional tuple type members", () => {
      expect(convertedType.children).toHaveLength(2);
      expect(renderNode(ctx, convertedType.children[0])).toContain("string");
      expect(renderNode(ctx, convertedType.children[1])).toContain("number optional");
    });

  }

  {

    const testFileContent = ts`
      export type Type = [string, ...number[]];
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTupleTypeMultiline(ctx, type as TupleType);

    it("should be able to render rest tuple type members", () => {
      expect(convertedType.children).toHaveLength(2);
      expect(renderNode(ctx, convertedType.children[0])).toContain("string");
      expect(renderNode(ctx, convertedType.children[1])).toContain("number rest");
    });

  }

});
