import { expect, it } from "vitest";

import { createVariableEntity } from "unwritten:interpreter:ast/entities/index.js";
import { getIdBySymbol } from "unwritten:interpreter:ast/shared/id.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Interpreter", EntityKind.Variable, () => {

  {

    const testFileContent = ts`
      export const variableSymbol = "Hello World";
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "variableSymbol")!;
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should be able to parse a variable", () => {
      expect(exportedVariable.kind).to.equal(EntityKind.Variable);
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
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedVariable.kind).to.equal(EntityKind.Variable);
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
        column: 13,
        file: "/file.ts",
        line: 5
      });
    });

    it("should have the correct type", () => {
      expect(exportedVariable.type.kind).to.equal(TypeKind.StringLiteral);
    });

  }

});
