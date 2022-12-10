import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind } from "quickdoks:types:types.js";

import { createClassBySymbol } from "./class.js";
import { createFunctionBySymbol } from "./function.js";


scope("Compiler", Kind.Signature, () => {

  {

    const testFileContent = ts`
      export function functionSymbol(): boolean {
        return true;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionBySymbol(ctx, symbol);

    it("should be able to parse a signature", () => {
      expect(exportedFunction.kind).to.equal(Kind.Function);
      expect(exportedFunction.signatures).to.not.equal(undefined);
      expect(exportedFunction.signatures).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Function description
       * @example Function example
       */
      export function functionSymbol(): boolean {
        return true;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionBySymbol(ctx, symbol);


    it("should have one signature", () => {
      expect(exportedFunction.signatures).to.have.lengthOf(1);
    });

    it("should have a matching kind", () => {
      expect(exportedFunction.signatures[0]!.kind).to.equal(Kind.Signature);
    });

    it("should have a matching description", () => {
      expect(exportedFunction.signatures[0]!.description).to.equal("Function description");
    });

    it("should have a matching example", () => {
      expect(exportedFunction.signatures[0]!.example).to.equal("Function example");
    });

    it("should have a matching position", () => {
      expect(exportedFunction.signatures[0]!.position).to.deep.equal({
        column: 6,
        file: "/file.ts",
        line: 5
      });
    });

    it("should have a return type which is a boolean", () => {
      expect(exportedFunction.signatures[0]!.returnType.kind).to.equal(Kind.Boolean);
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol<T>(value: T): T {
        return value;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionBySymbol(ctx, symbol);

    it("should be able to parse generic functions", () => {
      expect(exportedFunction.kind).to.equal(Kind.Function);
    });

    it("should have a type parameter", () => {
      expect(exportedFunction.signatures[0]!.typeParameters).to.have.lengthOf(1);
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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "add")!;
    const exportedFunction = createFunctionBySymbol(ctx, symbol);

    it("should be able to handle overloads", () => {
      expect(exportedFunction.signatures).to.have.lengthOf(2);
    });

  }

  {

    const testFileContent = ts`
      export class Class {
        public publicMethod() {}
        private privateMethod() {}
        static staticMethod() {}
        private static privateStaticMethod() {}
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should have matching modifiers", () => {
      expect(exportedClass.methods![0]!.signatures[0]!.modifiers).to.contain("public");
      expect(exportedClass.methods![1]!.signatures[0]!.modifiers).to.contain("private");
      expect(exportedClass.methods![2]!.signatures[0]!.modifiers).to.contain("static");
      expect(exportedClass.methods![3]!.signatures[0]!.modifiers).to.contain("private");
      expect(exportedClass.methods![3]!.signatures[0]!.modifiers).to.contain("static");
    });

  }

});
