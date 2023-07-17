import { expect, it } from "vitest";

import { createFunctionEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import {
  convertParameterEntitiesForDocumentation,
  convertParameterEntitiesForSignature
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { isTitleNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", EntityKind.Parameter, () => {

  {

    const testFileContent = ts`
      export function test(param: number) {}
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntities = functionEntity.signatures[0].parameters;
    const ctx = createRenderContext();

    const convertedParametersForSignature = convertParameterEntitiesForSignature(ctx, parameterEntities);
    const convertedParameterForDocumentation = convertParameterEntitiesForDocumentation(ctx, parameterEntities);

    assert(isTitleNode(convertedParameterForDocumentation));

    it("should have a matching name", () => {
      const renderedParameterForSignature = renderNode(ctx, convertedParametersForSignature);
      expect(renderedParameterForSignature).toBe("param");
      const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation.children[0].children[0]);
      expect(renderedParameterForDocumentation).toMatch(/param .*$/);
    });

    it("should have a matching type", () => {
      const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation.children[0].children[0]);
      expect(renderedParameterForDocumentation).toMatch(/^.* number$/);
    });

  }

  {

    const testFileContent = ts`
      export function test(a: number, b?: number) {}
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntities = functionEntity.signatures[0].parameters;
    const ctx = createRenderContext();

    const convertedParametersForSignature = convertParameterEntitiesForSignature(ctx, parameterEntities);
    const convertedParameterForDocumentation = convertParameterEntitiesForDocumentation(ctx, parameterEntities);

    const renderedParametersForSignature = renderNode(ctx, convertedParametersForSignature);
    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("should encapsulate optional parameters in '[]'", () => {
      expect(renderedParametersForSignature).toBe("a[, b]");
    });

    it("should render an 'optional' tag", () => {
      expect(renderedParameterForDocumentation).toContain("optional");
    });

  }

  {

    const testFileContent = ts`
      export function test(a: number, ...b: number[]) {}
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntities = functionEntity.signatures[0].parameters;
    const ctx = createRenderContext();

    const convertedParametersForSignature = convertParameterEntitiesForSignature(ctx, parameterEntities);
    const convertedParameterForDocumentation = convertParameterEntitiesForDocumentation(ctx, parameterEntities);

    const renderedParametersForSignature = renderNode(ctx, convertedParametersForSignature);
    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("should encapsulate optional parameters in '[]'", () => {
      expect(renderedParametersForSignature).toBe("a, ...b");
    });

    it("should render an 'rest' tag", () => {
      expect(renderedParameterForDocumentation).toContain("rest");
    });

  }

  {

    const testFileContent = ts`
      export function test(a: number = 7) {}
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntities = functionEntity.signatures[0].parameters;
    const ctx = createRenderContext();

    const convertedParameterForDocumentation = convertParameterEntitiesForDocumentation(ctx, parameterEntities);

    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("should render default values", () => {
      expect(renderedParameterForDocumentation).toContain("Default: 7");
    });

  }

});
