import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { createVariableEntity } from "unwritten:interpreter:ast/entities/index";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { isJSDocText } from "unwritten:typeguards/jsdoc";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


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
      expect(exportedVariable.description).toHaveLength(1);
      assert(isJSDocText(exportedVariable.description![0]));
      expect(exportedVariable.description![0].text).toBe("Variable description");
    });

    it("should have a matching example", () => {
      expect(exportedVariable.example).toHaveLength(1);
      assert(isJSDocText(exportedVariable.example![0].content[0]));
      expect(exportedVariable.example![0].content[0].text).toBe("Variable example");
    });

    it("should have a matching position", () => {
      expect(exportedVariable.position).toStrictEqual({
        column: 13,
        file: "/index.ts",
        line: 5
      });
    });

    it("should have the correct type", () => {
      expect(exportedVariable.type.kind).toBe(TypeKind.StringLiteral);
    });

  }

});
