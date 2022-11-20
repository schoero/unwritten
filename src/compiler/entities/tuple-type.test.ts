/* eslint-disable @typescript-eslint/array-type */

import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Tuple, TypeKind } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", TypeKind.Tuple, () => {

  {

    const testFileContent = ts`
    export type TupleType = [string, number];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TupleType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse a tuple type", () => {
      expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Tuple);
    });

  }

  {

    const testFileContent = ts`
      export type TupleType = [string, number];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TupleType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have the correct amount of members", () => {
      expect((exportedTypeAlias.type as Tuple).members).to.have.lengthOf(2);
    });

  }

  {

    const testFileContent = ts`
      export type TupleTypeWithRest = [string, ...number[]];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TupleTypeWithRest")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should support rest elements", () => {
      expect((exportedTypeAlias.type as Tuple).members).to.have.lengthOf(2);
      expect((exportedTypeAlias.type as Tuple).members[0]!.rest).to.equal(false);
      expect((exportedTypeAlias.type as Tuple).members[1]!.rest).to.equal(true);
    });

  }

  {

    const testFileContent = ts`
      export type TupleTypeWithOptional = [string, number?];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TupleTypeWithOptional")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should support optional elements", () => {
      expect((exportedTypeAlias.type as Tuple).members).to.have.lengthOf(2);
      expect((exportedTypeAlias.type as Tuple).members[0]!.optional).to.equal(false);
      expect((exportedTypeAlias.type as Tuple).members[1]!.optional).to.equal(true);
    });

  }

  {

    const testFileContent = ts`
      export type NamedTupleType = [prefix: string, suffix: string];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "NamedTupleType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should support optional elements", () => {
      expect((exportedTypeAlias.type as Tuple).members).to.have.lengthOf(2);
      expect((exportedTypeAlias.type as Tuple).members[0]!.name).to.equal("prefix");
      expect((exportedTypeAlias.type as Tuple).members[1]!.name).to.equal("suffix");
    });

  }

});