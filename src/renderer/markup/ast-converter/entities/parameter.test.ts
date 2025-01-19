import { expect, it } from "vitest";

import { createFunctionEntity } from "unwritten:interpreter/ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import {
  convertParameterEntitiesForDocumentation,
  convertParameterEntitiesForSignature
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { isTitleNode } from "unwritten:renderer:markup/typeguards/renderer";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { renderNode } from "unwritten:renderer/index";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("MarkupRenderer", EntityKind.Parameter, () => {

  {

    const testFileContent = ts`
      export function test(param: number) {}
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const parameterEntities = functionEntity.signatures[0].parameters;
    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const convertedParametersForSignature = convertParameterEntitiesForSignature(ctx, parameterEntities);
    const convertedParameterForDocumentation = convertParameterEntitiesForDocumentation(ctx, parameterEntities);

    assert(isTitleNode(convertedParameterForDocumentation));

    it("should have a matching name", () => {
      const renderedParameterForSignature = renderNode(ctx, convertedParametersForSignature);
      expect(renderedParameterForSignature).toBe("param");
      const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation.children[0].children[0]);
      expect(renderedParameterForDocumentation).toContain("param");
    });

    it("should have a matching type", () => {
      const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation.children[0].children[0]);
      expect(renderedParameterForDocumentation).toContain("number");
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

    const convertedParametersForSignature = convertParameterEntitiesForSignature(ctx, parameterEntities);
    const convertedParameterForDocumentation = convertParameterEntitiesForDocumentation(ctx, parameterEntities);

    const renderedParametersForSignature = renderNode(ctx, convertedParametersForSignature);
    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("should encapsulate default parameters in '[]' by default", () => {
      expect(renderedParametersForSignature).toBe("[a]");
    });

    it("should render default values", () => {
      expect(renderedParameterForDocumentation).toContain("Default: 7");
    });

    it("should render an additional 'optional' tag by default", () => {
      expect(renderedParameterForDocumentation).toContain("optional");
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
    ctx.config.renderConfig.html.renderDefaultValuesAsOptional = false;

    const convertedParametersForSignature = convertParameterEntitiesForSignature(ctx, parameterEntities);
    const convertedParameterForDocumentation = convertParameterEntitiesForDocumentation(ctx, parameterEntities);

    const renderedParametersForSignature = renderNode(ctx, convertedParametersForSignature);
    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("should be possible to disable the encapsulation of default parameters in '[]'", () => {
      expect(renderedParametersForSignature).toBe("a");
    });

    it("should be possible to disable the rendering of an additional `optional` tag for default values", () => {
      expect(renderedParameterForDocumentation).not.toContain("optional");
    });

  }

});
