import { describe, expect, it } from "vitest";

import { getIdBySymbol } from "../src/compiler/compositions/id.js";
import { createFunctionBySymbol } from "../src/compiler/types/function.js";
import { NumberLiteralType, Reference, TypeKind } from "../src/types/types.js";
import { compile } from "./utils/compile.js";


describe("Compiler: Function", () => {
  {

    const testFileContent = `
    /**
     * Adds two numbers together.
     * @param a The first number.
     * @param b The second number.
     * @returns The sum of a and b.
     * @example
     * add(1, 2) // 3
     */
    export function add(a: number, b: number): number;
    /**
     * Adds three numbers together.
     * @param a The first number.
     * @param b The second number.
     * @param c The third number.
     * @returns The sum of a, b and c.
     * @example
     * add(1, 2, 3) // 6
     */
    export function add(a: number, b: number, c?: number): number;
    export function add(a: number, b: number, c?: number): number { return a + b + (c ?? 0); }
  `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "add")!;
    const exportedFunction = createFunctionBySymbol(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedFunction.kind).to.equal(TypeKind.Function);
    });

    it("should have a matching name", () => {
      expect(exportedFunction.name).to.equal("add");
    });

    it("should have a matching id", () => {
      expect(exportedFunction.id).to.equal(getIdBySymbol(ctx, symbol));
    });


    //-- Signatures

    describe("Signatures", () => {

      it("should have matching signatures", () => {
        expect(exportedFunction.signatures).to.not.equal(undefined);
        expect(exportedFunction.signatures).to.have.lengthOf(2);
      });

      it("should have matching signature descriptions", () => {
        expect(exportedFunction.signatures[0]!.description).to.equal("Adds two numbers together.");
        expect(exportedFunction.signatures[1]!.description).to.equal("Adds three numbers together.");
      });

      it("should have matching signature returnTypes", () => {
        expect(exportedFunction.signatures[0]!.returnType.kind).to.equal(TypeKind.Number);
        expect(exportedFunction.signatures[1]!.returnType.kind).to.equal(TypeKind.Number);
      });

      it("should have matching signature returnType descriptions", () => {
        expect(exportedFunction.signatures[0]!.returnType.description).to.equal("The sum of a and b.");
        expect(exportedFunction.signatures[1]!.returnType.description).to.equal("The sum of a, b and c.");
      });

      it("should have matching examples", () => {
        expect(exportedFunction.signatures[0]!.example).to.equal("add(1, 2) // 3");
        expect(exportedFunction.signatures[1]!.example).to.equal("add(1, 2, 3) // 6");
      });

      it("should have matching positions", () => {
        expect(exportedFunction.signatures[0]!.position).to.not.equal(undefined);
        expect(exportedFunction.signatures[0]!.position.file).to.equal("/file.ts");
        expect(exportedFunction.signatures[0]!.position.line).to.equal(9);
        expect(exportedFunction.signatures[0]!.position.column).to.equal(4);
        expect(exportedFunction.signatures[1]!.position).to.not.equal(undefined);
        expect(exportedFunction.signatures[1]!.position.file).to.equal("/file.ts");
        expect(exportedFunction.signatures[1]!.position.line).to.equal(19);
        expect(exportedFunction.signatures[1]!.position.column).to.equal(4);
      });


      //-- Parameters

      describe("Parameters", () => {

        it("should have the right amount of parameters", () => {
          expect(exportedFunction.signatures[0]!.parameters).to.not.equal(undefined);
          expect(exportedFunction.signatures[0]!.parameters.length).to.equal(2);
          expect(exportedFunction.signatures[1]!.parameters).to.not.equal(undefined);
          expect(exportedFunction.signatures[1]!.parameters.length).to.equal(3);
        });

        it("should have matching parameter names", () => {
          expect(exportedFunction.signatures[0]!.parameters[0]!.name).to.equal("a");
          expect(exportedFunction.signatures[0]!.parameters[1]!.name).to.equal("b");
          expect(exportedFunction.signatures[1]!.parameters[0]!.name).to.equal("a");
          expect(exportedFunction.signatures[1]!.parameters[1]!.name).to.equal("b");
          expect(exportedFunction.signatures[1]!.parameters[2]!.name).to.equal("c");
        });

        it("should have matching parameter descriptions", () => {
          expect(exportedFunction.signatures[0]!.parameters[0]!.description).to.equal("The first number.");
          expect(exportedFunction.signatures[0]!.parameters[1]!.description).to.equal("The second number.");
          expect(exportedFunction.signatures[1]!.parameters[0]!.description).to.equal("The first number.");
          expect(exportedFunction.signatures[1]!.parameters[1]!.description).to.equal("The second number.");
          expect(exportedFunction.signatures[1]!.parameters[2]!.description).to.equal("The third number.");
        });

        it("should have matching parameter types", () => {
          expect(exportedFunction.signatures[0]!.parameters[0]!.type.kind).to.equal(TypeKind.Number);
          expect(exportedFunction.signatures[0]!.parameters[1]!.type.kind).to.equal(TypeKind.Number);
          expect(exportedFunction.signatures[1]!.parameters[0]!.type.kind).to.equal(TypeKind.Number);
          expect(exportedFunction.signatures[1]!.parameters[1]!.type.kind).to.equal(TypeKind.Number);
          expect(exportedFunction.signatures[1]!.parameters[2]!.type.kind).to.equal(TypeKind.Number);
        });

        it("should have matching parameter modifiers", () => {
          expect(exportedFunction.signatures[0]!.parameters[0]!.optional).to.equal(false);
          expect(exportedFunction.signatures[0]!.parameters[0]!.rest).to.equal(false);
          expect(exportedFunction.signatures[0]!.parameters[1]!.optional).to.equal(false);
          expect(exportedFunction.signatures[0]!.parameters[1]!.rest).to.equal(false);
          expect(exportedFunction.signatures[1]!.parameters[0]!.optional).to.equal(false);
          expect(exportedFunction.signatures[1]!.parameters[0]!.rest).to.equal(false);
          expect(exportedFunction.signatures[1]!.parameters[1]!.optional).to.equal(false);
          expect(exportedFunction.signatures[1]!.parameters[1]!.rest).to.equal(false);
          expect(exportedFunction.signatures[1]!.parameters[2]!.optional).to.equal(true);
          expect(exportedFunction.signatures[1]!.parameters[2]!.rest).to.equal(false);
        });

      });

    });

  }

  {

    const testFileContent = `
      export async function getNumber(): Promise<number> {
        return Promise.resolve(7);
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "getNumber")!;
    const exportedFunction = createFunctionBySymbol(ctx, symbol);

    it("should have the `async` modifier", () => {
      expect(exportedFunction.signatures[0]?.modifiers).to.include("async");
    });

    it("should return a `Promise` type reference with a `number` type argument.", () => {
      expect(exportedFunction.signatures[0]?.returnType.kind).to.equal(TypeKind.Reference);
      expect((exportedFunction.signatures[0]?.returnType as Reference).typeArguments).to.have.lengthOf(1);
      expect((exportedFunction.signatures[0]?.returnType as Reference).typeArguments![0]!.kind).to.equal(TypeKind.Number);
    });

  }

  {

    const testFileContent = `
      export function getNumber(num: number = 7): number {
        return num;
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "getNumber")!;
    const exportedFunction = createFunctionBySymbol(ctx, symbol);

    it("should have a parameter with an initializer", () => {
      expect(exportedFunction.signatures[0]?.parameters).to.have.lengthOf(1);
      expect(exportedFunction.signatures[0]?.parameters![0]?.initializer).to.not.equal(undefined);
      expect(exportedFunction.signatures[0]?.parameters![0]!.initializer?.kind).to.equal(TypeKind.NumberLiteral);
      expect((exportedFunction.signatures[0]?.parameters![0]!.initializer as NumberLiteralType).value).to.equal(7);
    });

  }

});
