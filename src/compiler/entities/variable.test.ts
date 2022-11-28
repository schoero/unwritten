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

    const { exportedSymbols, ctx } = compile(testFileContent);

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

    const { exportedSymbols, ctx } = compile(testFileContent);

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

});
