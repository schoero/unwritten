/* eslint-disable @typescript-eslint/array-type */

import { describe, expect, it } from "vitest";
import { getIdBySymbol } from "../../src/compiler/compositions/id.js";

import { createTypeAliasBySymbol } from "../../src/compiler/types/type-alias.js";
import { Array, EntityKind, IntersectionType, LiteralType, TypeLiteral, UnionType } from "../../src/types/types.js";
import { compile } from "../utils/compile.js";



describe("Compiler: Type alias", function() {

  const testFileContent = `
    /**
     * Type alias description 
     * @example "hello"
     */
    export type StringType = string;
  `;

  const { exportedSymbols } = compile(testFileContent.trim());

  const symbol = exportedSymbols.find(s => s.name === "StringType")!;
  const exportedTypeAlias = createTypeAliasBySymbol(symbol);

  it("should have a matching kind", function() {
    expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
  });

  it("should have a matching name", function() {
    expect(exportedTypeAlias.name).to.equal("StringType");
  });

  it("should have a matching id", function() {
    expect(exportedTypeAlias.id).to.equal(getIdBySymbol(symbol));
  });

  it("should have a matching description", function() {
    expect(exportedTypeAlias.description).to.equal("Type alias description");
  });

  it("should have a matching example", function() {
    expect(exportedTypeAlias.example).to.equal("\"hello\"");
  });

  it("should have a matching position", function() {
    expect(exportedTypeAlias.position).to.deep.equal({
      file: "/file.ts",
      line: 5,
      column: 4
    });
  });


  describe("Primitive", function() {

    it("should be able to handle string type aliases", function() {

      const testFileContent = `
        export type StringType = string;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "StringType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.String);

    });

    it("should be able to handle number type aliases", function() {

      const testFileContent = `
        export type NumberType = number;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NumberType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Number);

    });

    it("should be able to handle boolean type aliases", function() {

      const testFileContent = `
        export type BooleanType = boolean;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "BooleanType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Boolean);

    });

    it("should be able to handle bigInt type aliases", function() {

      const testFileContent = `
        export type BigIntType = bigint;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "BigIntType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.BigInt);

    });

    it("should be able to handle null type aliases", function() {

      const testFileContent = `
        export type NullType = null;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NullType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Null);

    });

    it("should be able to handle undefined type aliases", function() {

      const testFileContent = `
        export type UndefinedType = undefined;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "UndefinedType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Undefined);

    });

    it("should be able to handle void type aliases", function() {

      const testFileContent = `
        export type VoidType = void;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "VoidType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Void);

    });

    it("should be able to handle never type aliases", function() {

      const testFileContent = `
        export type NeverType = never;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NeverType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Never);

    });

  });

  describe("Literal types", function() {

    it("should be able to handle string literal type aliases", function() {

      const testFileContent = `
        export type StringLiteralType = "Hello world";
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "StringLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.StringLiteral);
      expect((exportedTypeAlias.type as LiteralType<EntityKind.StringLiteral>).value).to.equal("Hello world");

    });

    it("should be able to handle number literal type aliases", function() {

      const testFileContent = `
        export type NumberLiteralType = 7;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NumberLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.NumberLiteral);
      expect((exportedTypeAlias.type as LiteralType<EntityKind.NumberLiteral>).value).to.equal(7);

    });

    it("should be able to handle bigInt literal type aliases", function() {

      const testFileContent = `
        export type BigIntLiteralType = 7n;
        export type BigIntLiteralTypeNegative = -7n;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol1 = exportedSymbols.find(s => s.name === "BigIntLiteralType")!;
      const exportedTypeAlias1 = createTypeAliasBySymbol(symbol1);

      expect(exportedTypeAlias1.type.kind).to.equal(EntityKind.BigIntLiteral);
      expect((exportedTypeAlias1.type as LiteralType<EntityKind.BigIntLiteral>).value).to.equal(7n);

      const symbol2 = exportedSymbols.find(s => s.name === "BigIntLiteralTypeNegative")!;
      const exportedTypeAlias2 = createTypeAliasBySymbol(symbol2);

      expect(exportedTypeAlias2.type.kind).to.equal(EntityKind.BigIntLiteral);
      expect((exportedTypeAlias2.type as LiteralType<EntityKind.BigIntLiteral>).value).to.equal(-7n);

    });

    it("should be able to handle boolean literal type aliases", function() {

      const testFileContent = `
        export type BooleanLiteralType = true;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "BooleanLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.BooleanLiteral);
      expect((exportedTypeAlias.type as LiteralType<EntityKind.BooleanLiteral>).value).to.equal(true);

    });

  });

  describe("Type Literal", function() {

    const testFileContent = `
      /** TypeLiteral description */
      export type TypeLiteral {
        /** Member description */
        a: string;
        /** @example 7 */
        b: number;
      }
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedVariable = createTypeAliasBySymbol(symbol);
    const typeLiteralType = exportedVariable.type as TypeLiteral;

    it("should have a matching kind", function() {
      expect(exportedVariable.kind).to.equal(EntityKind.TypeAlias);
    });

    it("should have a matching name", function() {
      expect(exportedVariable.name).to.equal("TypeLiteral");
    });

    it("should have a matching type", function() {
      expect(exportedVariable.type.kind).to.equal(EntityKind.TypeLiteral);
      expect(typeLiteralType.members.length).to.equal(2);
    });

    it("should have matching members", function() {
      expect(typeLiteralType.members[0]!.name).to.equal("a");
      expect(typeLiteralType.members[0]!.type.kind).to.equal(EntityKind.String);
      expect(typeLiteralType.members[0]!.position).to.deep.equal({ file: "/file.ts", line: 4, column: 8 });
      expect(typeLiteralType.members[0]!.description).to.equal("Member description");
      expect(typeLiteralType.members[1]!.name).to.equal("b");
      expect(typeLiteralType.members[1]!.example).to.equal("7");
      expect(typeLiteralType.members[1]!.type.kind).to.equal(EntityKind.Number);
      expect(typeLiteralType.members[1]!.position).to.deep.equal({ file: "/file.ts", line: 6, column: 8 });
    });

    it("should have a matching description", function() {
      expect(exportedVariable.description).to.equal("TypeLiteral description");
    });

    it("should have a matching position", function() {
      expect(exportedVariable.position).to.deep.equal({
        file: "/file.ts",
        line: 2,
        column: 6
      });
    });

  });

  describe("Union Types", function() {

    const testFileContent = `
      export type UnionType = string | number;
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "UnionType")!;
    const exportedVariable = createTypeAliasBySymbol(symbol);

    it("should have a matching kind", function() {
      expect(exportedVariable.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedVariable.type.kind).to.equal(EntityKind.Union);
    });

    it("should have the right amount of types", function() {
      expect((exportedVariable.type as UnionType).types).to.have.lengthOf(2);
    });

    it("should have the right types", function() {
      expect((exportedVariable.type as UnionType).types[0]!.kind).to.equal(EntityKind.String);
      expect((exportedVariable.type as UnionType).types[1]!.kind).to.equal(EntityKind.Number);
    });

  });

  describe("Intersection Types", function() {

    const testFileContent = `
      type A = {
        a: string;
      };
      type B = {
        b: string;
      };
      export type IntersectionType = A & B;
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "IntersectionType")!;
    const exportedVariable = createTypeAliasBySymbol(symbol);

    it("should have a matching kind", function() {
      expect(exportedVariable.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedVariable.type.kind).to.equal(EntityKind.Intersection);
    });

    it("should have the right amount of types", function() {
      expect((exportedVariable.type as IntersectionType).types).to.have.lengthOf(2);
    });

  });


  describe("Array", function() {

    const testFileContent = `
      export type StringOrNumberArray1 = Array<string | number>;
      export type StringOrNumberArray2 = (string | number)[];
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const exportedStringOrNumberArray1 = createTypeAliasBySymbol(exportedSymbols[0]!);
    const exportedStringOrNumberArray2 = createTypeAliasBySymbol(exportedSymbols[1]!);

    it("should support both array syntaxes", function() {
      expect(exportedStringOrNumberArray1.name).to.equal("StringOrNumberArray1");
      expect(exportedStringOrNumberArray1.type.kind).to.equal(EntityKind.Array);
      expect((exportedStringOrNumberArray1.type as Array).type!.kind).to.equal(EntityKind.Union);
      expect(((exportedStringOrNumberArray1.type as Array).type! as UnionType).types).to.have.lengthOf(2);
      expect(exportedStringOrNumberArray2.name).to.equal("StringOrNumberArray2");
      expect(exportedStringOrNumberArray2.type.kind).to.equal(EntityKind.Array);
      expect((exportedStringOrNumberArray2.type as Array).type!.kind).to.equal(EntityKind.Union);
      expect(((exportedStringOrNumberArray2.type as Array).type! as UnionType).types).to.have.lengthOf(2);
    });

  });


});