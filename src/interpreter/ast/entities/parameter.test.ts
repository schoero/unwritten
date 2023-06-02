import { expect, it } from "vitest";

import { createFunctionEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Parameter, () => {

  {

    const testFileContent = ts`
      export function functionSymbol(param: string): void {}
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should be able to parse a parameter", () => {
      expect(exportedFunction.kind).toBe(EntityKind.Function);
      expect(exportedFunction.signatures).toHaveLength(1);
      expect(exportedFunction.signatures[0]!.parameters).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      /**
       * @param param - Parameter description
       */
      export function functionSymbol(param: string): void {}
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);
    const parameter = exportedFunction.signatures[0]!.parameters![0]!;

    it("should have a matching kind", () => {
      expect(parameter.kind).toBe(EntityKind.Parameter);
    });

    it("should have a matching name", () => {
      expect(parameter.name).toBe("param");
    });

    it("should have a matching description", () => {
      expect(parameter.description).toBe("- Parameter description");
    });

    it("should have a matching position", () => {
      expect(parameter.position).toStrictEqual({
        column: 31,
        file: "/file.ts",
        line: 4
      });
    });

    it("should have a matching type", () => {
      expect(parameter.type!.kind).toBe(TypeKind.String);
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol(param?: string): void {}
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);
    const parameter = exportedFunction.signatures[0]!.parameters![0]!;

    it("should be able to handle optional types", () => {
      expect(parameter.type!.kind).toBe(TypeKind.String);
      expect(parameter.optional).toBe(true);
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol(param: string = "test"): void {}
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);
    const parameter = exportedFunction.signatures[0]!.parameters![0]!;

    it("should be able to handle initialized types", () => {
      expect(parameter.type!.kind).toBe(TypeKind.String);
      expect(parameter.initializer).toBeDefined();
      expect(parameter.initializer!.kind).toBe(TypeKind.StringLiteral);
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol(...param: string[]): void {}
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);
    const parameter = exportedFunction.signatures[0]!.parameters![0]!;

    it("should be able to handle rest types", () => {
      expect(parameter.rest).toBe(true);
      expect(parameter.type!.kind).toBe(TypeKind.Array);
    });

  }

});
