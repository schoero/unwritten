import { expect, it } from "vitest";

import { createFunctionEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import {
  convertFunctionLikeEntityForDocumentation,
  convertFunctionLikeEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("MarkupRenderer", EntityKind.Function, () => {

  {

    const testFileContent = ts`
      /**
       * Function description
       * @remarks This is a remark
       * @example testFunction();
       */
      export function testFunction(): void { }
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "testFunction")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedFunctionForTableOfContents = convertFunctionLikeEntityForTableOfContents(ctx, functionEntity);
    const convertedFunctionForDocumentation = convertFunctionLikeEntityForDocumentation(ctx, functionEntity);

    it("should render only one signature", () => {
      expect(convertedFunctionForTableOfContents.length).to.equal(1);
      expect(convertedFunctionForDocumentation.length).to.equal(1);
    });

  }

  {

    const testFileContent = ts`
      export function add(a: number, b: number): number;
      export function add(a: number, b: number, c: number): number;
      export function add(a: number, b: number, c?: number): number {
        return a + b + (c ?? 0);
      }
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "add")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const renderedFunctionForTableOfContents = convertFunctionLikeEntityForTableOfContents(ctx, functionEntity);
    const renderedFunctionForDocumentation = convertFunctionLikeEntityForDocumentation(ctx, functionEntity);

    it("should have multiple signatures", () => {
      expect(renderedFunctionForTableOfContents.length).to.equal(2);
      expect(renderedFunctionForDocumentation.length).to.equal(2);
    });

  }

});
