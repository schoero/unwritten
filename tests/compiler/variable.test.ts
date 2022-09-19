
import { describe, expect, it } from "vitest";

import { getIdBySymbol } from "../../src/compiler/compositions/id.js";
import { createVariableBySymbol } from "../../src/compiler/types/variable.js";
import { EntityKind, LiteralType, ObjectLiteral } from "../../src/types/types.js";
import { compile } from "../utils/compile.js";


describe("Compiler: Variable", () => {
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

    it("should have a matching kind", () => {
      expect(exportedVariable.kind).to.equal(EntityKind.Variable);
    });

    it("should have a matching name", () => {
      expect(exportedVariable.name).to.equal("stringLiteral");
    });

    it("should have a matching id", () => {
      expect(exportedVariable.id).to.equal(getIdBySymbol(symbol));
    });

    it("should have a matching type", () => {
      expect(exportedVariable.type.kind).to.equal(EntityKind.StringLiteral);
      expect((exportedVariable.type as LiteralType<EntityKind.StringLiteral>).value).to.equal("Hello World");
    });

    it("should have a matching description", () => {
      expect(exportedVariable.description).to.equal("Represents a string literal.");
    });

    it("should have a matching example", () => {
      expect(exportedVariable.example).to.equal("\"hello\"");
    });

    it("should have a matching position", () => {
      expect(exportedVariable.position).to.deep.equal({
        file: "/file.ts",
        line: 6,
        column: 19
      });
    });
  }
  {
    const testFileContent = `
      /**
       * Represents an object.
       * @example
       * {
       *  a: "hello",
       *  b: 1
       * }
       */
      export const objectVariable = {
        /** A string literal. */
        a: "hello",
        /** @example 7 */
        b: 7
      } as const;
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "objectVariable")!;
    const exportedVariable = createVariableBySymbol(symbol);

    it("should have a matching kind", () => {
      expect(exportedVariable.kind).to.equal(EntityKind.Variable);
    });

    it("should have a matching name", () => {
      expect(exportedVariable.name).to.equal("objectVariable");
    });

    it("should have a matching type", () => {
      expect(exportedVariable.type.kind).to.equal(EntityKind.ObjectLiteral);
      expect((exportedVariable.type as ObjectLiteral).properties.length).to.equal(2);
    });

    it("should have matching properties", () => {
      expect((exportedVariable.type as ObjectLiteral).properties[0]!.name).to.equal("a");
      expect((exportedVariable.type as ObjectLiteral).properties[0]!.description).to.equal("A string literal.");
      expect((exportedVariable.type as ObjectLiteral).properties[0]!.position).to.deep.equal({ file: "/file.ts", line: 11, column: 8 });
      expect((exportedVariable.type as ObjectLiteral).properties[0]!.type.kind).to.equal(EntityKind.StringLiteral);
      expect(((exportedVariable.type as ObjectLiteral).properties[0]!.type as LiteralType<EntityKind.NumberLiteral>).value).to.equal("hello");
      expect((exportedVariable.type as ObjectLiteral).properties[1]!.name).to.equal("b");
      expect((exportedVariable.type as ObjectLiteral).properties[1]!.example).to.equal("7");
      expect((exportedVariable.type as ObjectLiteral).properties[1]!.position).to.deep.equal({ file: "/file.ts", line: 13, column: 8 });
      expect((exportedVariable.type as ObjectLiteral).properties[1]!.type.kind).to.equal(EntityKind.NumberLiteral);
      expect(((exportedVariable.type as ObjectLiteral).properties[1]!.type as LiteralType<EntityKind.NumberLiteral>).value).to.equal(7);
    });

    it("should have a matching example", () => {
      expect(exportedVariable.example?.replace(/\s/g, "")).to.equal("{a:\"hello\",b:1}");
    });

    it("should have a matching position", () => {
      expect(exportedVariable.position).to.deep.equal({
        file: "/file.ts",
        line: 9,
        column: 19
      });
    });

  }

});