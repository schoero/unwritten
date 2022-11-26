import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Kind } from "../../types/types.js";
import { createFunctionBySymbol } from "./function.js";


scope("Compiler", Kind.Parameter, () => {

  {

    const testFileContent = ts`
      export function functionSymbol(param: string): void {}
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionBySymbol(ctx, symbol);

    it("should be able to parse a parameter", () => {
      expect(exportedFunction.kind).to.equal(Kind.Function);
      expect(exportedFunction.signatures).to.have.length(1);
      expect(exportedFunction.signatures[0]!.parameters).to.have.length(1);
    });

  }

  {

    const testFileContent = ts`
      /**
       * @param param - Parameter description
       */
      export function functionSymbol(param: string): void {}
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionBySymbol(ctx, symbol);
    const parameter = exportedFunction.signatures[0]!.parameters[0]!;

    it("should have a matching kind", () => {
      expect(parameter.kind).to.equal(Kind.Parameter);
    });

    it("should have a matching name", () => {
      expect(parameter.name).to.equal("param");
    });

    it("should have a matching description", () => {
      expect(parameter.description).to.equal("- Parameter description");
    });

    it("should have a matching position", () => {
      expect(parameter.position).to.deep.equal({
        column: 37,
        file: "/file.ts",
        line: 4
      });
    });

    it("should have a matching type", () => {
      expect(parameter.type.kind).to.equal(Kind.String);
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol(param?: string): void {}
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionBySymbol(ctx, symbol);
    const parameter = exportedFunction.signatures[0]!.parameters[0]!;

    it("should be able to handle optional types", () => {
      expect(parameter.type.kind).to.equal(Kind.String);
      expect(parameter.optional).to.equal(true);
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol(param: string = "test"): void {}
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionBySymbol(ctx, symbol);
    const parameter = exportedFunction.signatures[0]!.parameters[0]!;

    it("should be able to handle initialized types", () => {
      expect(parameter.type.kind).to.equal(Kind.String);
      expect(parameter.initializer).to.not.equal(undefined);
      expect(parameter.initializer!.kind).to.equal(Kind.StringLiteral);
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol(...param: string[]): void {}
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionBySymbol(ctx, symbol);
    const parameter = exportedFunction.signatures[0]!.parameters[0]!;

    it("should be able to handle rest types", () => {
      expect(parameter.rest).to.equal(true);
      expect(parameter.type.kind).to.equal(Kind.Array);
    });

  }

});
