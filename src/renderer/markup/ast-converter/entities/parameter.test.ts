import { expect, it } from "vitest";

import { createFunctionEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import {
  convertParameterEntitiesForSignature,
  convertParameterEntityForDocumentation
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("MarkupRenderer", EntityKind.Parameter, () => {

  {

    const testFileContent = ts`
      export function test(param: number) {}
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntity = functionEntity.signatures[0].parameters![0]!;
    const ctx = createRenderContext();

    const convertedParametersForSignature = convertParameterEntitiesForSignature(ctx, [parameterEntity]);
    const convertedParameterForDocumentation = convertParameterEntityForDocumentation(ctx, parameterEntity);

    const renderedParametersForSignature = renderNode(ctx, convertedParametersForSignature);
    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("should have a matching name", () => {
      expect(renderedParametersForSignature).to.equal("param");
      expect(renderedParameterForDocumentation).to.match(/param .*$/);
    });

    it("should have a matching type", () => {
      expect(renderedParameterForDocumentation).to.match(/^.* number$/);
    });

  }

  {

    const testFileContent = ts`
      export function test(a: number, b?: number) {}
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntities = functionEntity.signatures[0].parameters!;
    const ctx = createRenderContext();

    const convertedParametersForSignature = convertParameterEntitiesForSignature(ctx, parameterEntities);
    const convertedParameterForDocumentation = convertParameterEntityForDocumentation(ctx, parameterEntities[1]);

    const renderedParametersForSignature = renderNode(ctx, convertedParametersForSignature);
    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("should encapsulate optional parameters in `[]`", () => {
      expect(renderedParametersForSignature).to.equal("a[, b]");
    });

    it("should render an `optional` tag", () => {
      expect(renderedParameterForDocumentation).to.match(/^.*optional.*$/);
    });

  }

  {

    const testFileContent = ts`
      export function test(a: number, ...b: number[]) {}
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntities = functionEntity.signatures[0].parameters!;
    const ctx = createRenderContext();

    const convertedParametersForSignature = convertParameterEntitiesForSignature(ctx, parameterEntities);
    const convertedParameterForDocumentation = convertParameterEntityForDocumentation(ctx, parameterEntities[1]);

    const renderedParametersForSignature = renderNode(ctx, convertedParametersForSignature);
    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("should encapsulate optional parameters in `[]`", () => {
      expect(renderedParametersForSignature).to.equal("a, ...b");
    });

    it("should render an `rest` tag", () => {
      expect(renderedParameterForDocumentation).to.match(/^.*rest.*$/);
    });

  }

  {

    const testFileContent = ts`
      export function test(a: number = 7) {}
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntity = functionEntity.signatures[0].parameters![0];
    const ctx = createRenderContext();

    const convertedParameterForDocumentation = convertParameterEntityForDocumentation(ctx, parameterEntity);

    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("Should render default values", () => {
      expect(renderedParameterForDocumentation).to.match(/Default: 7$/);
    });

  }

});
