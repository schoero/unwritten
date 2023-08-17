/* eslint-disable @typescript-eslint/naming-convention */
import { expect, it } from "vitest";

import { createSourceFileEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


function extractTypeOfRenderedContent(typeName: string, content: string) {
  const typeRegex = new RegExp(`#+\\s${typeName}[\\s\\S]+?#+\\sType\\s+(.*)\\n+([\\s\\S]*?)\\n(?:---|$|\\s\\s)`, "gm");
  const [, inlineType, multilineType] = typeRegex.exec(content)!;
  return {
    inlineType,
    multilineType: multilineType.trim() === ""
      ? undefined
      : multilineType
  };
}

scope("MarkupRenderer", TypeKind.TypeReference, () => {

  {

    const testFileContent = ts`
      type StringType = string;
      interface Interface {
        prop: string;
      }
      export type PrimitiveType = StringType;
      export type ObjectType = Interface;
    `;

    const { ctx: compilerContext, fileSymbols } = compile(testFileContent);

    const sourceFileEntities = fileSymbols.map(fileSymbol => {
      return createSourceFileEntity(compilerContext, fileSymbol);
    });

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const renderedOutput = ctx.renderer.render(ctx, sourceFileEntities);

    const [filePath, content] = Object.entries(renderedOutput)[0];

    it("should render the referenced type, if the target symbol is not exported", () => {
      expect(extractTypeOfRenderedContent("PrimitiveType", content).inlineType).toContain("string");
      expect(extractTypeOfRenderedContent("ObjectType", content).inlineType).toContain("interface");
      expect(extractTypeOfRenderedContent("ObjectType", content).multilineType).toContain("prop");
      expect(extractTypeOfRenderedContent("ObjectType", content).multilineType).toContain("string");
    });

  }

  {

    const testFileContent = ts`
      export type StringType = string;
      export interface Interface {
        prop: string;
      }
      export type PrimitiveType = StringType;
      export type ObjectType = Interface;
    `;

    const { ctx: compilerContext, fileSymbols } = compile(testFileContent);

    const sourceFileEntities = fileSymbols.map(fileSymbol => {
      return createSourceFileEntity(compilerContext, fileSymbol);
    });

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const renderedOutput = ctx.renderer.render(ctx, sourceFileEntities);

    const [filePath, content] = Object.entries(renderedOutput)[0];

    it("should render a link to the referenced target, if the target symbol is exported", () => {
      expect(extractTypeOfRenderedContent("PrimitiveType", content).inlineType).toContain("[StringType]");
      expect(extractTypeOfRenderedContent("ObjectType", content).inlineType).toContain("[Interface]");
      expect(extractTypeOfRenderedContent("ObjectType", content).multilineType).toBeUndefined();
    });

  }

  {

    const typesModule = ts`
      export interface Test {
        a: string;
      }
    `;

    const indexModule = ts`
      import { Test } from "./types";
      export const test: Test = {
        a: "test"
      }
    `;

    const { ctx: compilerContext, fileSymbols } = compile({
      "/index.ts": indexModule,
      "/types.ts": typesModule
    });

    const sourceFileEntities = fileSymbols.map(fileSymbol => {
      return createSourceFileEntity(compilerContext, fileSymbol);
    });

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const renderedOutput = ctx.renderer.render(ctx, sourceFileEntities);

    const [typesPath, typesContent] = Object.entries(renderedOutput)[0];
    const [indexPath, indexContent] = Object.entries(renderedOutput)[1];

    it("should render a link to the referenced target, if the target symbol is exported", () => {
      expect(extractTypeOfRenderedContent("test", indexContent).inlineType).toContain("[Test](./types.md#test)");
    });

  }

});
