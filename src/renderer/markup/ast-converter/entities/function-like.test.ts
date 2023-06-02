import { expect, it } from "vitest";

import { createFunctionEntity, createVariableEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { convertObjectTypeMultiline } from "unwritten:renderer/markup/ast-converter/types/index.js";
import {
  convertFunctionLikeEntityForDocumentation,
  convertFunctionLikeEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { ObjectLiteralType } from "unwritten:interpreter/type-definitions/types.js";


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

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

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

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

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

  {

    const testFileContent = ts`
      export const obj = {
        get getter(): number {
          return 7;
        },
        method(a: number, b: number) {
          return a + b;
        },
        property: (a: number, b: number) => (a + b),
        set setter(value: number) {}
      };
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "obj")!;
    const variableEntity = createVariableEntity(compilerContext, symbol);
    const type = variableEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertObjectTypeMultiline(ctx, type as ObjectLiteralType);

    const [
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedType.children;

    it("should have one method", () => {
      expect(methods.children.length).to.equal(1);
    });

    it("should have one getter", () => {
      expect(getters.children.length).to.equal(1);
    });

    it("should have one setter", () => {
      expect(setters.children.length).to.equal(1);
    });

    it("should have one property", () => {
      expect(properties.children.length).to.equal(1);
    });

  }

});
