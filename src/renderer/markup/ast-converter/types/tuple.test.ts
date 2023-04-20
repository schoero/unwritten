import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertTupleType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";

import type { TupleType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Tuple, () => {

  {

    const testFileContent = ts`
      export type Type = [string, number];
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTupleType(ctx, type as TupleType);
    const renderedType = renderNode(ctx, convertedType);

    it("should be able to render tuple types", () => {
      expect(renderedType).to.equal("[string, number]");
    });

  }

  {

    const testFileContent = ts`
      export type Type = [first: string, second: number];
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTupleType(ctx, type as TupleType);
    const renderedType = renderNode(ctx, convertedType);

    it("should be able to render tuple type members with labels", () => {
      expect(renderedType).to.equal("[first: string, second: number]");
    });

  }

  {

    const testFileContent = ts`
      export type Type = [string, number?];
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTupleType(ctx, type as TupleType);
    const renderedType = renderNode(ctx, convertedType);

    it("should be able to render optional tuple type members", () => {
      expect(renderedType).to.equal("[string, number?]");
    });

  }

  {

    const testFileContent = ts`
      export type Type = [string, ...number[]];
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTupleType(ctx, type as TupleType);
    const renderedType = renderNode(ctx, convertedType);

    it("should be able to render rest tuple type members", () => {
      expect(renderedType).to.equal("[string, ...number[]]");
    });

  }

  {

    const testFileContent = ts`
      export type Type = [string, ...(string | number)[]];
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTupleType(ctx, type as TupleType);
    const renderedType = renderNode(ctx, convertedType);

    it("should be able to render union rest tuple type members", () => {
      expect(renderedType).to.equal("[string, ...(string | number)[]]");
    });

  }

});
