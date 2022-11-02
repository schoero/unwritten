import { describe, expect, it } from "vitest";

import { createEnumBySymbol } from "../src/compiler/types/enum.js";
import { NumberLiteralType, TypeKind } from "../src/types/types.js";
import { compile } from "./utils/compile.js";

describe("Compiler: Enum", () => {
  {

    const testFileContent = `
      export enum Enum {
        A,
        B
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedEnum = createEnumBySymbol(ctx, exportedSymbols[0]!);

    it("should have an exported enum", () => {
      expect(exportedEnum.name).to.equal("Enum");
    });

    it("should have a matching type", () => {
      expect(exportedEnum.kind).to.equal(TypeKind.Enum);
    });

    it("should have exactly two members", () => {
      expect(exportedEnum.members.length).to.equal(2);
    });

    it("should have a matching member types with values", () => {
      expect(exportedEnum.members[0]!.name).to.equal("A");
      expect(exportedEnum.members[0]!.type.kind).to.equal(TypeKind.NumberLiteral);
      expect((exportedEnum.members[0]!.type as NumberLiteralType).value).to.equal(0);
      expect(exportedEnum.members[1]!.name).to.equal("B");
      expect(exportedEnum.members[1]!.type.kind).to.equal(TypeKind.NumberLiteral);
      expect((exportedEnum.members[1]!.type as NumberLiteralType).value).to.equal(1);
    });
  }
  {

    const testFileContent = `
      export enum Enum {
        A
      };
      export enum Enum {
        B=1
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedEnum = createEnumBySymbol(ctx, exportedSymbols[0]!);

    it("should be able to merge multiple enums with the same name", () => {
      expect(exportedEnum.members.length).to.equal(2);
      expect(exportedEnum.members[0]!.name).to.equal("A");
      expect(exportedEnum.members[0]!.type.kind).to.equal(TypeKind.NumberLiteral);
      expect((exportedEnum.members[0]!.type as NumberLiteralType).value).to.equal(0);
      expect(exportedEnum.members[1]!.name).to.equal("B");
      expect(exportedEnum.members[1]!.type.kind).to.equal(TypeKind.NumberLiteral);
      expect((exportedEnum.members[1]!.type as NumberLiteralType).value).to.equal(1);
    });

  }
  {

    const testFileContent = `
      export enum Enum {};
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedEnum = createEnumBySymbol(ctx, exportedSymbols[0]!);

    it("should be able to handle empty enums", () => {
      expect(exportedEnum.kind).to.equal(TypeKind.Enum);
      expect(exportedEnum.members.length).to.equal(0);
    });

  }
});
