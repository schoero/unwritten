import { expect, it } from "vitest";

import { createVariableEntity } from "unwritten:interpreter:ast/entities/index.js";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Variable, () => {

  {

    const testFileContent = ts`
      export const variableSymbol = "Hello World";
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "variableSymbol")!;
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should be able to parse a variable", () => {
      expect(exportedVariable.kind).toBe(EntityKind.Variable);
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

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "variableSymbol")!;
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedVariable.kind).toBe(EntityKind.Variable);
    });

    it("should have a matching name", () => {
      expect(exportedVariable.name).toBe("variableSymbol");
    });

    it("should have a matching id", () => {
      expect(exportedVariable.symbolId).toBe(getSymbolId(ctx, symbol));
    });

    it("should have a matching description", () => {
      expect(exportedVariable.description).toBe("Variable description");
    });

    it("should have a matching example", () => {
      expect(exportedVariable.example).toBe("Variable example");
    });

    it("should have a matching position", () => {
      expect(exportedVariable.position).toStrictEqual({
        column: 13,
        file: "/file.ts",
        line: 5
      });
    });

    it("should have the correct type", () => {
      expect(exportedVariable.type.kind).toBe(TypeKind.StringLiteral);
    });

  }

});
