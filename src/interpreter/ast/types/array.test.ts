/* eslint-disable @typescript-eslint/array-type */

import { assert, expect, it } from "vitest";

import { createTypeAliasEntity, createVariableEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.Array, () => {


  {

    const testFileContent = ts`
      export type ArrayType = string[];
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ArrayType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse an array type declared using the native syntax", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Array);
    });

  }

  {

    const testFileContent = ts`
      export type ArrayType = Array<string>;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ArrayType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should create a type reference for the generic syntax", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.type.typeArguments).to.have.lengthOf(1);
      expect(exportedTypeAlias.type.typeArguments![0].kind).to.equal(TypeKind.String);
    });

  }

  {

    const testFileContent = ts`
      export const array = ["a", "b"];
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "array")!;
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should be able to parse an array type that was created using the square bracket notation", () => {
      expect(exportedVariable.kind).to.equal(EntityKind.Variable);
      expect(exportedVariable.type.kind).to.equal(TypeKind.Array);
    });

  }

  {

    const testFileContent = ts`
      export const array = new Array("a", "b")
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "array")!;
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should be able to parse an array type that was created using the Array constructor", () => {
      expect(exportedVariable.kind).to.equal(EntityKind.Variable);
      expect(exportedVariable.type.kind).to.equal(TypeKind.Array);
    });

  }

});
