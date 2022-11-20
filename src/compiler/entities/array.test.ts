/* eslint-disable @typescript-eslint/array-type */

import { describe, expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Array, TypeKind, Union } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./alias.js";


scope("Compiler", TypeKind.Array, () => {

  describe("Native Syntax", () => {

    const testFileContent = ts`
      export type StringOrNumberArray = (string | number)[];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedStringOrNumberArraySymbol = exportedSymbols.find(s => s.name === "StringOrNumberArray")!;
    const exportedStringOrNumberArray = createTypeAliasBySymbol(ctx, exportedStringOrNumberArraySymbol);

    it("should generate a type alias > type reference > array with an union type as a type argument", () => {
      expect(exportedStringOrNumberArray.name).to.equal("StringOrNumberArray");
      expect(exportedStringOrNumberArray.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedStringOrNumberArray.type.kind).to.equal(TypeKind.Array);
      expect((exportedStringOrNumberArray.type as Array).type.kind).to.equal(TypeKind.Union);
      expect(((exportedStringOrNumberArray.type as Array).type as Union).types).to.have.lengthOf(2);
      expect(((exportedStringOrNumberArray.type as Array).type as Union).types[0]!.kind).to.equal(TypeKind.String);
      expect(((exportedStringOrNumberArray.type as Array).type as Union).types[1]!.kind).to.equal(TypeKind.Number);
    });

  });


  describe("Generic Syntax", () => {

    const testFileContent = ts`
      export type StringOrNumberArray = Array<string | number>;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedStringOrNumberArraySymbol = exportedSymbols.find(s => s.name === "StringOrNumberArray")!;
    const exportedStringOrNumberArray = createTypeAliasBySymbol(ctx, exportedStringOrNumberArraySymbol);

    it("should generate a type alias > type reference > array with an union type as a type argument", () => {
      expect(exportedStringOrNumberArray.name).to.equal("StringOrNumberArray");
      expect(exportedStringOrNumberArray.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedStringOrNumberArray.type.kind).to.equal(TypeKind.Array);
      expect((exportedStringOrNumberArray.type as Array).type.kind).to.equal(TypeKind.Union);
      expect(((exportedStringOrNumberArray.type as Array).type as Union).types).to.have.lengthOf(2);
      expect(((exportedStringOrNumberArray.type as Array).type as Union).types[0]!.kind).to.equal(TypeKind.String);
      expect(((exportedStringOrNumberArray.type as Array).type as Union).types[1]!.kind).to.equal(TypeKind.Number);
    });

  });

});
