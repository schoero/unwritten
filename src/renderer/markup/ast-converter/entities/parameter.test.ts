import { expect, it } from "vitest";

import { createFunctionEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { isListNode, isTitleNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import {
  convertParameterEntitiesForDocumentation,
  convertParameterEntitiesForSignature,
  convertParameterEntitiesForType
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";
import { assert } from "unwritten:utils/general.js";


scope("MarkupRenderer", EntityKind.Parameter, () => {

  {

    const testFileContent = ts`
      export function test(param: number) {}
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntities = functionEntity.signatures[0].parameters;
    const ctx = createRenderContext();

    const convertedParametersForSignature = convertParameterEntitiesForSignature(ctx, parameterEntities);
    const convertedParameterForDocumentation = convertParameterEntitiesForDocumentation(ctx, parameterEntities);
    const convertedParameterForType = convertParameterEntitiesForType(ctx, parameterEntities);

    it("should render a title for the documentation", () => {
      expect(isTitleNode(convertedParameterForDocumentation)).to.equal(true);
    });

    it("should render a list for the type", () => {
      expect(isListNode(convertedParameterForType)).to.equal(true);
    });

    assert(isTitleNode(convertedParameterForDocumentation));
    assert(isListNode(convertedParameterForType));

    it("should have a matching name", () => {
      const renderedParameterForSignature = renderNode(ctx, convertedParametersForSignature);
      expect(renderedParameterForSignature).to.equal("param");
      const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation.children[0].children[0]);
      expect(renderedParameterForDocumentation).to.match(/param .*$/);
      const renderedParameterForType = renderNode(ctx, convertedParameterForType.children[0]);
      expect(renderedParameterForType).to.match(/param .*$/);
    });

    it("should have a matching type", () => {
      const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation.children[0].children[0]);
      expect(renderedParameterForDocumentation).to.match(/^.* number$/);
      const renderedParameterForType = renderNode(ctx, convertedParameterForType.children[0]);
      expect(renderedParameterForType).to.match(/^.* number$/);
    });

  }

  {

    const testFileContent = ts`
      export function test(a: number, b?: number) {}
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntities = functionEntity.signatures[0].parameters;
    const ctx = createRenderContext();

    const convertedParametersForSignature = convertParameterEntitiesForSignature(ctx, parameterEntities);
    const convertedParameterForDocumentation = convertParameterEntitiesForDocumentation(ctx, parameterEntities);

    const renderedParametersForSignature = renderNode(ctx, convertedParametersForSignature);
    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("should encapsulate optional parameters in `[]`", () => {
      expect(renderedParametersForSignature).to.equal("a[, b]");
    });

    it("should render an `optional` tag", () => {
      expect(renderedParameterForDocumentation).to.include("optional");
    });

  }

  {

    const testFileContent = ts`
      export function test(a: number, ...b: number[]) {}
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntities = functionEntity.signatures[0].parameters;
    const ctx = createRenderContext();

    const convertedParametersForSignature = convertParameterEntitiesForSignature(ctx, parameterEntities);
    const convertedParameterForDocumentation = convertParameterEntitiesForDocumentation(ctx, parameterEntities);

    const renderedParametersForSignature = renderNode(ctx, convertedParametersForSignature);
    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("should encapsulate optional parameters in `[]`", () => {
      expect(renderedParametersForSignature).to.equal("a, ...b");
    });

    it("should render an `rest` tag", () => {
      expect(renderedParameterForDocumentation).to.include("rest");
    });

  }

  {

    const testFileContent = ts`
      export function test(a: number = 7) {}
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntities = functionEntity.signatures[0].parameters;
    const ctx = createRenderContext();

    const convertedParameterForDocumentation = convertParameterEntitiesForDocumentation(ctx, parameterEntities);

    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("Should render default values", () => {
      expect(renderedParameterForDocumentation).to.include("Default: 7");
    });

  }

});
