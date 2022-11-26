import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Kind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createVariableBySymbol } from "./variable.js";


scope("Compiler", Kind.Variable, () => {

  {

    const testFileContent = ts`
      export const variableSymbol = "Hello World";
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "variableSymbol")!;
    const exportedVariable = createVariableBySymbol(ctx, symbol);

    it("should be able to parse a variable", () => {
      expect(exportedVariable.kind).to.equal(Kind.Variable);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Variable description
       * @example Variable example
       */
      export const variableSymbol = "Hello World";
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "variableSymbol")!;
    const exportedVariable = createVariableBySymbol(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedVariable.kind).to.equal(Kind.Variable);
    });

    it("should have a matching name", () => {
      expect(exportedVariable.name).to.equal("variableSymbol");
    });

    it("should have a matching id", () => {
      expect(exportedVariable.id).to.equal(getIdBySymbol(ctx, symbol));
    });

    it("should have a matching description", () => {
      expect(exportedVariable.description).to.equal("Variable description");
    });

    it("should have a matching example", () => {
      expect(exportedVariable.example).to.equal("Variable example");
    });

    it("should have a matching position", () => {
      expect(exportedVariable.position).to.deep.equal({
        column: 19,
        file: "/file.ts",
        line: 5
      });
    });

    it("should have the correct type", () => {
      expect(exportedVariable.type.kind).to.equal(Kind.StringLiteral);
    });

  }

  // {

  //   const testFileContent = ts`
  //     /**
  //      * Represents an object.
  //      * @example
  //      * {
  //      *  a: "hello",
  //      *  b: 1
  //      * }
  //      */
  //     export const objectVariable = {
  //       /** A string literal. */
  //       a: "hello",
  //       /** @example 7 */
  //       b: 7
  //     } as const;
  //   `;

  //   const { exportedSymbols, ctx } = compile(testFileContent.trim());

  //   const symbol = exportedSymbols.find(s => s.name === "objectVariable")!;
  //   const exportedVariable = createVariableBySymbol(ctx, symbol);

  //   it("should have a matching kind", () => {
  //     expect(exportedVariable.kind).to.equal(TypeKind.Variable);
  //   });

  //   it("should have a matching name", () => {
  //     expect(exportedVariable.name).to.equal("objectVariable");
  //   });

  //   it("should have a matching type", () => {
  //     expect(exportedVariable.type.kind).to.equal(TypeKind.ObjectLiteral);
  //     expect((exportedVariable.type as ObjectLiteral).properties.length).to.equal(2);
  //   });

  //   it("should have matching properties", () => {
  //     expect((exportedVariable.type as ObjectLiteral).properties[0]!.name).to.equal("a");
  //     expect((exportedVariable.type as ObjectLiteral).properties[0]!.description).to.equal("A string literal.");
  //     expect((exportedVariable.type as ObjectLiteral).properties[0]!.position).to.deep.equal({ column: 8, file: "/file.ts", line: 11 });
  //     expect((exportedVariable.type as ObjectLiteral).properties[0]!.type.kind).to.equal(TypeKind.StringLiteral);
  //     expect(((exportedVariable.type as ObjectLiteral).properties[0]!.type as LiteralType<TypeKind.NumberLiteral>).value).to.equal("hello");
  //     expect((exportedVariable.type as ObjectLiteral).properties[1]!.name).to.equal("b");
  //     expect((exportedVariable.type as ObjectLiteral).properties[1]!.example).to.equal("7");
  //     expect((exportedVariable.type as ObjectLiteral).properties[1]!.position).to.deep.equal({ column: 8, file: "/file.ts", line: 13 });
  //     expect((exportedVariable.type as ObjectLiteral).properties[1]!.type.kind).to.equal(TypeKind.NumberLiteral);
  //     expect(((exportedVariable.type as ObjectLiteral).properties[1]!.type as LiteralType<TypeKind.NumberLiteral>).value).to.equal(7);
  //   });

  //   it("should have a matching example", () => {
  //     expect(exportedVariable.example?.replace(/\s/g, "")).to.equal("{a:\"hello\",b:1}");
  //   });

  //   it("should have a matching position", () => {
  //     expect(exportedVariable.position).to.deep.equal({
  //       column: 19,
  //       file: "/file.ts",
  //       line: 9
  //     });
  //   });

  // }

});
