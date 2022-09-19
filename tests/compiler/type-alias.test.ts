/* eslint-disable @typescript-eslint/array-type */

import { describe, expect, it } from "vitest";
import { getIdBySymbol } from "../../src/compiler/compositions/id.js";

import { createTypeAliasBySymbol } from "../../src/compiler/types/type-alias.js";
import {
  Array,
  EntityKind,
  IntersectionType,
  LiteralType,
  Tuple,
  TypeLiteral,
  UnionType
} from "../../src/types/types.js";
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
    expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
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
      file: "/file.ts",
      line: 5,
      column: 4
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

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.String);

    });

    it("should be able to handle number type aliases", () => {

      const testFileContent = `
        export type NumberType = number;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NumberType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Number);

    });

    it("should be able to handle boolean type aliases", () => {

      const testFileContent = `
        export type BooleanType = boolean;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "BooleanType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Boolean);

    });

    it("should be able to handle bigInt type aliases", () => {

      const testFileContent = `
        export type BigIntType = bigint;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "BigIntType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.BigInt);

    });

    it("should be able to handle null type aliases", () => {

      const testFileContent = `
        export type NullType = null;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NullType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Null);

    });

    it("should be able to handle undefined type aliases", () => {

      const testFileContent = `
        export type UndefinedType = undefined;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "UndefinedType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Undefined);

    });

    it("should be able to handle void type aliases", () => {

      const testFileContent = `
        export type VoidType = void;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "VoidType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Void);

    });

    it("should be able to handle never type aliases", () => {

      const testFileContent = `
        export type NeverType = never;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NeverType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Never);

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

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.StringLiteral);
      expect((exportedTypeAlias.type as LiteralType<EntityKind.StringLiteral>).value).to.equal("Hello world");

    });

    it("should be able to handle number literal type aliases", () => {

      const testFileContent = `
        export type NumberLiteralType = 7;
      `;

      const { exportedSymbols } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NumberLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(symbol);

      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.NumberLiteral);
      expect((exportedTypeAlias.type as LiteralType<EntityKind.NumberLiteral>).value).to.equal(7);

    });

    it("should be able to handle bigInt literal type aliases", () => {

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

    it("should be able to handle boolean literal type aliases", () => {

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
      expect(exportedVariable.kind).to.equal(EntityKind.TypeAlias);
    });

    it("should have a matching name", () => {
      expect(exportedVariable.name).to.equal("TypeLiteral");
    });

    it("should have a matching type", () => {
      expect(exportedVariable.type.kind).to.equal(EntityKind.TypeLiteral);
      expect(typeLiteralType.members.length).to.equal(2);
    });

    it("should have matching members", () => {
      expect(typeLiteralType.members[0]!.name).to.equal("a");
      expect(typeLiteralType.members[0]!.type.kind).to.equal(EntityKind.String);
      expect(typeLiteralType.members[0]!.position).to.deep.equal({ file: "/file.ts", line: 4, column: 8 });
      expect(typeLiteralType.members[0]!.description).to.equal("Member description");
      expect(typeLiteralType.members[1]!.name).to.equal("b");
      expect(typeLiteralType.members[1]!.example).to.equal("7");
      expect(typeLiteralType.members[1]!.type.kind).to.equal(EntityKind.Number);
      expect(typeLiteralType.members[1]!.position).to.deep.equal({ file: "/file.ts", line: 6, column: 8 });
    });

    it("should have a matching description", () => {
      expect(exportedVariable.description).to.equal("TypeLiteral description");
    });

    it("should have a matching position", () => {
      expect(exportedVariable.position).to.deep.equal({
        file: "/file.ts",
        line: 2,
        column: 6
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
      expect(exportedVariable.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedVariable.type.kind).to.equal(EntityKind.Union);
    });

    it("should have the right amount of types", () => {
      expect((exportedVariable.type as UnionType).types).to.have.lengthOf(2);
    });

    it("should have the right types", () => {
      expect((exportedVariable.type as UnionType).types[0]!.kind).to.equal(EntityKind.String);
      expect((exportedVariable.type as UnionType).types[1]!.kind).to.equal(EntityKind.Number);
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
      expect(exportedVariable.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedVariable.type.kind).to.equal(EntityKind.Intersection);
    });

    it("should have the right amount of types", () => {
      expect((exportedVariable.type as IntersectionType).types).to.have.lengthOf(2);
    });

  });


  describe("Array", () => {

    const testFileContent = `
      export type StringOrNumberArray1 = Array<string | number>;
      export type StringOrNumberArray2 = (string | number)[];
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const exportedStringOrNumberArray1 = createTypeAliasBySymbol(exportedSymbols[0]!);
    const exportedStringOrNumberArray2 = createTypeAliasBySymbol(exportedSymbols[1]!);

    it("should support both array syntaxes", () => {
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


  describe("Tuple", () => {

    const testFileContent = `
      export type Tuple = [string, number];
      export type TupleWithRest = [string, ...number[]];
      export type TupleWithOptional = [string, number?];
      /** 
       * Description 
       * @example [prefix: "<div>", suffix: "</div>"]
       */
      export type NamedTuple = [prefix: string, suffix: string];;
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const exportedTupleAlias = createTypeAliasBySymbol(exportedSymbols[0]!);
    const exportedTupleWithRestAlias = createTypeAliasBySymbol(exportedSymbols[1]!);
    const exportedTupleWithOptionalAlias = createTypeAliasBySymbol(exportedSymbols[2]!);
    const exportedNamedTupleAlias = createTypeAliasBySymbol(exportedSymbols[3]!);

    const exportedTuple = exportedTupleAlias.type as Tuple;
    const exportedTupleWithRest = exportedTupleWithRestAlias.type as Tuple;
    const exportedTupleWithOptional = exportedTupleWithOptionalAlias.type as Tuple;
    const exportedNamedTuple = exportedNamedTupleAlias.type as Tuple;

    it("should have exported tuple types alias", () => {
      expect(exportedTupleAlias.name).to.equal("Tuple");
      expect(exportedTupleWithRestAlias.name).to.equal("TupleWithRest");
      expect(exportedTupleWithOptionalAlias.name).to.equal("TupleWithOptional");
      expect(exportedNamedTupleAlias.name).to.equal("NamedTuple");
    });

    it("should have matching ids", () => {
      expect(exportedTuple.id).to.equal(getIdBySymbol(exportedSymbols[0]!));
      expect(exportedTupleWithRest.id).to.equal(getIdBySymbol(exportedSymbols[1]!));
      expect(exportedTupleWithOptional.id).to.equal(getIdBySymbol(exportedSymbols[2]!));
      expect(exportedNamedTuple.id).to.equal(getIdBySymbol(exportedSymbols[3]!));
    });

    it("should have matching positions", () => {
      expect(exportedTuple.position).to.deep.equal({
        file: "/file.ts",
        line: 1,
        column: 0
      });
      expect(exportedTupleWithRest.position).to.deep.equal({
        file: "/file.ts",
        line: 2,
        column: 6
      });
      expect(exportedTupleWithOptional.position).to.deep.equal({
        file: "/file.ts",
        line: 3,
        column: 6
      });
      expect(exportedNamedTuple.position).to.deep.equal({
        file: "/file.ts",
        line: 8,
        column: 6
      });
    });

    it("should have exactly two members", () => {
      expect(exportedTuple.members.length).to.equal(2);
      expect(exportedTupleWithRest.members.length).to.equal(2);
      expect(exportedTupleWithOptional.members.length).to.equal(2);
      expect(exportedNamedTuple.members.length).to.equal(2);
    });

    it("should have a matching member types", () => {
      expect(exportedTuple.members[0]!.type.kind).to.equal(EntityKind.String);
      expect(exportedTuple.members[1]!.type.kind).to.equal(EntityKind.Number);
      expect(exportedTupleWithRest.members[0]!.type.kind).to.equal(EntityKind.String);
      expect(exportedTupleWithRest.members[1]!.type.kind).to.equal(EntityKind.Number);
      expect(exportedTupleWithOptional.members[0]!.type.kind).to.equal(EntityKind.String);
      expect(exportedTupleWithOptional.members[1]!.type.kind).to.equal(EntityKind.Number);
      expect(exportedNamedTuple.members[0]!.type.kind).to.equal(EntityKind.String);
      expect(exportedNamedTuple.members[1]!.type.kind).to.equal(EntityKind.String);
    });

    it("should have a matching rest element indicators", () => {
      expect(exportedTupleWithRest.members[0]!.rest).to.not.equal(true);
      expect(exportedTupleWithRest.members[1]?.rest).to.equal(true);
    });

    it("should have a matching optional element indicators", () => {
      expect(exportedTupleWithOptional.members[0]!.optional).to.not.equal(true);
      expect(exportedTupleWithOptional.members[1]?.optional).to.equal(true);
    });

    it("should have matching labels", () => {
      expect(exportedNamedTuple.members[0]!.name).to.equal("prefix");
      expect(exportedNamedTuple.members[1]!.name).to.equal("suffix");
    });

    it("should have a matching description", () => {
      expect(exportedNamedTupleAlias.description).to.equal("Description");
    });

    it("should have a matching example", () => {
      expect(exportedNamedTupleAlias.example).to.equal(`[prefix: "<div>", suffix: "</div>"]`);
    });

  });


});