/* eslint-disable @typescript-eslint/array-type */

import { describe, expect, it } from "vitest";

import { createTypeAliasBySymbol } from "../../src/compiler/types/alias.js";
import { Array, TypeKind, Union } from "../../src/types/types.js";
import { compile } from "../utils/compile.js";



describe("Compiler: Array", () => {

  describe("Native Syntax", () => {

    const testFileContent = `
      export type StringOrNumberArray = (string | number)[];
    `;

    const { exportedSymbols } = compile(testFileContent.trim());
    const exportedStringOrNumberArraySymbol = exportedSymbols.find(s => s.name === "StringOrNumberArray")!;
    const exportedStringOrNumberArray = createTypeAliasBySymbol(exportedStringOrNumberArraySymbol);

    it("should generate an array type", () => {
      expect(exportedStringOrNumberArray.name).to.equal("StringOrNumberArray");
      expect(exportedStringOrNumberArray.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedStringOrNumberArray.type.kind).to.equal(TypeKind.Array);
      expect((exportedStringOrNumberArray.type as Array).type!.kind).to.equal(TypeKind.Union);
      expect(((exportedStringOrNumberArray.type as Array).type! as Union).types).to.have.lengthOf(2);
    });

  });


  describe("Generic Syntax", () => {

    const testFileContent = `
      export type StringOrNumberArray = Array<string>;
    `;

    const { exportedSymbols } = compile(testFileContent.trim());
    const exportedStringOrNumberArraySymbol = exportedSymbols.find(s => s.name === "StringOrNumberArray")!;
    const exportedStringOrNumberArray = createTypeAliasBySymbol(exportedStringOrNumberArraySymbol);

    it("should generate a type alias > type reference > array with string as a type argument", () => {
      expect(exportedStringOrNumberArray.name).to.equal("StringOrNumberArray");
      expect(exportedStringOrNumberArray.kind).to.equal(TypeKind.TypeAlias);
    });

  });


});