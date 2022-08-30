
import { describe, expect, it } from "vitest";
import { createVariableBySymbol } from "../../src/compiler/types/variable.js";

import { EntityKind, LiteralType, ObjectLiteral } from "../../src/types/types.js";
import { compile } from "../utils/compile.js";


describe("Compiler: Variable", function() {
  {
    const testFileContent = `
      /**
       * Represents a string literal.
       * @example
       * "hello"
       */
      export const stringLiteral = "Hello World";
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "stringLiteral")!;
    const exportedVariable = createVariableBySymbol(symbol);

    it("should have a matching kind", function() {
      expect(exportedVariable.kind).to.equal(EntityKind.Variable);
    });

    it("should have a matching name", function() {
      expect(exportedVariable.name).to.equal("stringLiteral");
    });

    it("should have a matching type", function() {
      expect(exportedVariable.type.kind).to.equal(EntityKind.StringLiteral);
      expect((exportedVariable.type as LiteralType<EntityKind.StringLiteral>).value).to.equal("Hello World");
    });

    it("should have a matching description", function() {
      expect(exportedVariable.description).to.equal("Represents a string literal.");
    });

    it("should have a matching example", function() {
      expect(exportedVariable.example).to.equal("\"hello\"");
    });

    it("should have a matching position", function() {
      expect(exportedVariable.position).to.deep.equal({
        file: "/file.ts",
        line: 6,
        column: 19
      });
    });
  }
  {
    const testFileContent = `
      export const objectVariable = {
        a: 1,
        b: 2
      } as const;
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "objectVariable")!;
    const exportedVariable = createVariableBySymbol(symbol);

    it("should have a matching kind", function() {
      expect(exportedVariable.kind).to.equal(EntityKind.Variable);
    });

    it("should have a matching name", function() {
      expect(exportedVariable.name).to.equal("objectVariable");
    });

    it("should have a matching type", function() {
      expect(exportedVariable.type.kind).to.equal(EntityKind.Object);
      expect((exportedVariable.type as ObjectLiteral).properties.length).to.equal(2);
    });

    it("should have matching properties", function() {
      expect((exportedVariable.type as ObjectLiteral).properties[0]!.name).to.equal("a");
      expect((exportedVariable.type as ObjectLiteral).properties[0]!.type.kind).to.equal(EntityKind.NumberLiteral);
      expect(((exportedVariable.type as ObjectLiteral).properties[0]!.type as LiteralType<EntityKind.NumberLiteral>).value).to.equal(1);
      expect((exportedVariable.type as ObjectLiteral).properties[1]!.name).to.equal("b");
      expect((exportedVariable.type as ObjectLiteral).properties[1]!.type.kind).to.equal(EntityKind.NumberLiteral);
      expect(((exportedVariable.type as ObjectLiteral).properties[1]!.type as LiteralType<EntityKind.NumberLiteral>).value).to.equal(2);
    });

  }

});