/* eslint-disable @typescript-eslint/array-type */

import { describe, expect, it } from "vitest";

import { createTypeAliasBySymbol } from "../src/compiler/types/alias.js";
import { Reference, TypeKind, Union } from "../src/types/types.js";
import { compile } from "./utils/compile.js";


describe("Compiler: Array", () => {

  describe("Native Syntax", () => {

    const testFileContent = `
      export type StringOrNumberArray = (string | number)[];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedStringOrNumberArraySymbol = exportedSymbols.find(s => s.name === "StringOrNumberArray")!;
    const exportedStringOrNumberArray = createTypeAliasBySymbol(ctx, exportedStringOrNumberArraySymbol);

    it("should generate a type alias > type reference > array with an union type as a type argument", () => {
      expect(exportedStringOrNumberArray.name).to.equal("StringOrNumberArray");
      expect(exportedStringOrNumberArray.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedStringOrNumberArray.type.kind).to.equal(TypeKind.Reference);
      expect((exportedStringOrNumberArray.type as Reference).typeArguments).to.have.lengthOf(1);
      expect(((exportedStringOrNumberArray.type as Reference).typeArguments![0]! as Union).types).to.have.lengthOf(2);
      expect(((exportedStringOrNumberArray.type as Reference).typeArguments![0]! as Union).types[0]!.kind).to.equal(TypeKind.String);
      expect(((exportedStringOrNumberArray.type as Reference).typeArguments![0]! as Union).types[1]!.kind).to.equal(TypeKind.Number);
    });

  });


  describe("Generic Syntax", () => {

    const testFileContent = `
      export type StringOrNumberArray = Array<string | number>;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedStringOrNumberArraySymbol = exportedSymbols.find(s => s.name === "StringOrNumberArray")!;
    const exportedStringOrNumberArray = createTypeAliasBySymbol(ctx, exportedStringOrNumberArraySymbol);

    it("should generate a type alias > type reference > array with an union type as a type argument", () => {
      expect(exportedStringOrNumberArray.name).to.equal("StringOrNumberArray");
      expect(exportedStringOrNumberArray.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedStringOrNumberArray.type.kind).to.equal(TypeKind.Reference);
      expect((exportedStringOrNumberArray.type as Reference).typeArguments).to.have.lengthOf(1);
      expect(((exportedStringOrNumberArray.type as Reference).typeArguments![0]! as Union).types).to.have.lengthOf(2);
      expect(((exportedStringOrNumberArray.type as Reference).typeArguments![0]! as Union).types[0]!.kind).to.equal(TypeKind.String);
      expect(((exportedStringOrNumberArray.type as Reference).typeArguments![0]! as Union).types[1]!.kind).to.equal(TypeKind.Number);
    });

  });

});