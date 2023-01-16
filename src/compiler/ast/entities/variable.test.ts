import { expect, it } from "vitest";

import { createVariableEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";


scope("Compiler", EntityKind.Variable, () => {

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
        column: 19,
        file: "/file.ts",
        line: 5
      });
    });

    it("should have the correct type", () => {
      expect(exportedVariable.type.kind).to.equal(TypeKind.StringLiteral);
    });

  }

});