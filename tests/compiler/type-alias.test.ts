/* eslint-disable @typescript-eslint/array-type */

import { describe, expect, it } from "vitest";

import { getIdBySymbol } from "../../src/compiler/compositions/id.js";
import { createTypeAliasBySymbol } from "../../src/compiler/types/alias.js";
import { Intersection, LiteralType, TypeKind, TypeLiteral, Union } from "../../src/types/types.js";
import { compile } from "../utils/compile.js";



describe("Compiler: Type alias", () => {

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

  it("should have a matching kind", () => {
    expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
  });

  it("should have a matching name", () => {
    expect(exportedTypeAlias.name).to.equal("StringType");
  });

  it("should have a matching id", () => {
    expect(exportedTypeAlias.id).to.equal(getIdBySymbol(symbol));
  });

  it("should have a matching description", () => {
    expect(exportedTypeAlias.description).to.equal("Type alias description");
  });

  it("should have a matching example", () => {
    expect(exportedTypeAlias.example).to.equal("\"hello\"");
  });

  it("should have a matching position", () => {
    expect(exportedTypeAlias.position).to.deep.equal({
      column: 4,
      file: "/file.ts",
      line: 5
    });
  });


  describe("Primitive", () => {

    it("should be able to handle string type aliases", () => {

      const testFileContent = `
        export type StringType = string;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "StringType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.String);

    });

    it("should be able to handle number type aliases", () => {

      const testFileContent = `
        export type NumberType = number;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NumberType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Number);

    });

    it("should be able to handle boolean type aliases", () => {

      const testFileContent = `
        export type BooleanType = boolean;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "BooleanType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Boolean);

    });

    it("should be able to handle bigInt type aliases", () => {

      const testFileContent = `
        export type BigIntType = bigint;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "BigIntType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.BigInt);

    });

    it("should be able to handle null type aliases", () => {

      const testFileContent = `
        export type NullType = null;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NullType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Null);

    });

    it("should be able to handle undefined type aliases", () => {

      const testFileContent = `
        export type UndefinedType = undefined;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "UndefinedType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Undefined);

    });

    it("should be able to handle void type aliases", () => {

      const testFileContent = `
        export type VoidType = void;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "VoidType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Void);

    });

    it("should be able to handle never type aliases", () => {

      const testFileContent = `
        export type NeverType = never;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NeverType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Never);

    });

  });

  describe("Literal types", () => {

    it("should be able to handle string literal type aliases", () => {

      const testFileContent = `
        export type StringLiteralType = "Hello world";
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "StringLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.StringLiteral);
      expect((exportedTypeAlias.type as LiteralType<TypeKind.StringLiteral>).value).to.equal("Hello world");

    });

    it("should be able to handle number literal type aliases", () => {

      const testFileContent = `
        export type NumberLiteralType = 7;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NumberLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.NumberLiteral);
      expect((exportedTypeAlias.type as LiteralType<TypeKind.NumberLiteral>).value).to.equal(7);

    });

    it("should be able to handle bigInt literal type aliases", () => {

      const testFileContent = `
        export type BigIntLiteralType = 7n;
        export type BigIntLiteralTypeNegative = -7n;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol1 = exportedSymbols.find(s => s.name === "BigIntLiteralType")!;
      const exportedTypeAlias1 = createTypeAliasBySymbol(symbol1);

      expect(exportedTypeAlias1.type.kind).to.equal(TypeKind.BigIntLiteral);
      expect((exportedTypeAlias1.type as LiteralType<TypeKind.BigIntLiteral>).value).to.equal(7n);

      const symbol2 = exportedSymbols.find(s => s.name === "BigIntLiteralTypeNegative")!;
      const exportedTypeAlias2 = createTypeAliasBySymbol(symbol2);

      expect(exportedTypeAlias2.type.kind).to.equal(TypeKind.BigIntLiteral);
      expect((exportedTypeAlias2.type as LiteralType<TypeKind.BigIntLiteral>).value).to.equal(-7n);

    });

    it("should be able to handle boolean literal type aliases", () => {

      const testFileContent = `
        export type BooleanLiteralType = true;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "BooleanLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.BooleanLiteral);
      expect((exportedTypeAlias.type as LiteralType<TypeKind.BooleanLiteral>).value).to.equal(true);

    });

  });

  describe("Type Literal", () => {

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

    it("should have a matching kind", () => {
      expect(exportedVariable.kind).to.equal(TypeKind.TypeAlias);
    });

    it("should have a matching name", () => {
      expect(exportedVariable.name).to.equal("TypeLiteral");
    });

    it("should have a matching type", () => {
      expect(exportedVariable.type.kind).to.equal(TypeKind.TypeLiteral);
      expect(typeLiteralType.members.length).to.equal(2);
    });

    it("should have matching members", () => {
      expect(typeLiteralType.members[0]!.name).to.equal("a");
      expect(typeLiteralType.members[0]!.type.kind).to.equal(TypeKind.String);
      expect(typeLiteralType.members[0]!.position).to.deep.equal({ column: 8, file: "/file.ts", line: 4 });
      expect(typeLiteralType.members[0]!.description).to.equal("Member description");
      expect(typeLiteralType.members[1]!.name).to.equal("b");
      expect(typeLiteralType.members[1]!.example).to.equal("7");
      expect(typeLiteralType.members[1]!.type.kind).to.equal(TypeKind.Number);
      expect(typeLiteralType.members[1]!.position).to.deep.equal({ column: 8, file: "/file.ts", line: 6 });
    });

    it("should have a matching description", () => {
      expect(exportedVariable.description).to.equal("TypeLiteral description");
    });

    it("should have a matching position", () => {
      expect(exportedVariable.position).to.deep.equal({
        column: 6,
        file: "/file.ts",
        line: 2
      });
    });

  });

  describe("Union Types", () => {

    const testFileContent = `
      export type UnionType = string | number;
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "UnionType")!;
    const exportedVariable = createTypeAliasBySymbol(symbol);

    it("should have a matching kind", () => {
      expect(exportedVariable.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedVariable.type.kind).to.equal(TypeKind.Union);
    });

    it("should have the right amount of types", () => {
      expect((exportedVariable.type as Union).types).to.have.lengthOf(2);
    });

    it("should have the right types", () => {
      expect((exportedVariable.type as Union).types[0]!.kind).to.equal(TypeKind.String);
      expect((exportedVariable.type as Union).types[1]!.kind).to.equal(TypeKind.Number);
    });

  });

  describe("Intersection Types", () => {

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

    it("should have a matching kind", () => {
      expect(exportedVariable.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedVariable.type.kind).to.equal(TypeKind.Intersection);
    });

    it("should have the right amount of types", () => {
      expect((exportedVariable.type as Intersection).types).to.have.lengthOf(2);
    });

  });

});