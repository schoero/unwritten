import { describe, expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Intersection, TypeKind, TypeLiteral, Union } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createTypeAliasBySymbol } from "./alias.js";


scope("Compiler", TypeKind.TypeAlias, () => {

  const testFileContent = ts`
    /**
     * Type alias description 
     * @example "hello"
     */
    export type StringType = string;
  `;

  const { exportedSymbols, ctx } = compile(testFileContent.trim());

  const symbol = exportedSymbols.find(s => s.name === "StringType")!;
  const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

  it("should have a matching kind", () => {
    expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
  });

  it("should have a matching name", () => {
    expect(exportedTypeAlias.name).to.equal("StringType");
  });

  it("should have a matching id", () => {
    expect(exportedTypeAlias.id).to.equal(getIdBySymbol(ctx, symbol));
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


  describe("Type Literal", () => {

    const testFileContent = ts`
      /** TypeLiteral description */
      export type TypeLiteral {
        /** Member description */
        a: string;
        /** @example 7 */
        b: number;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedVariable = createTypeAliasBySymbol(ctx, symbol);
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

    const testFileContent = ts`
      export type UnionType = string | number;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "UnionType")!;
    const exportedVariable = createTypeAliasBySymbol(ctx, symbol);

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

    const testFileContent = ts`
      type A = {
        a: string;
      };
      type B = {
        b: string;
      };
      export type IntersectionType = A & B;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "IntersectionType")!;
    const exportedVariable = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedVariable.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedVariable.type.kind).to.equal(TypeKind.Intersection);
    });

    it("should have the right amount of types", () => {
      expect((exportedVariable.type as Intersection).types).to.have.lengthOf(2);
    });

  });

});
