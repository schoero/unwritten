/* eslint-disable @typescript-eslint/array-type */


import { expect, it } from "vitest";

import { createTypeAliasBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind, TupleType } from "quickdoks:types:types.js";


scope("Compiler", Kind.Tuple, () => {

  {

    const testFileContent = ts`
      export type TupleType = [string, number];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TupleType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse a tuple type", () => {
      expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(Kind.Tuple);
    });

  }

  {

    const testFileContent = ts`
      export type TupleType = [string, number];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TupleType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have the correct amount of members", () => {
      expect((exportedTypeAlias.type as TupleType).members).to.have.lengthOf(2);
    });

  }

  {

    const testFileContent = ts`
      export type TupleTypeWithRestAtTheEnd = [string, ...number[]];
      export type TupleTypeWithRestAtTheBeginning = [ ...number[], string];
      export type TupleTypeWithRestInTheMiddle = [ string, ...number[], string];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const tupleTypeAliasWithRestAtTheEndSymbol = exportedSymbols.find(s => s.name === "TupleTypeWithRestAtTheEnd")!;
    const tupleTypeAliasWithRestAtTheBeginningSymbol = exportedSymbols.find(s => s.name === "TupleTypeWithRestAtTheBeginning")!;
    const tupleTypeAliasWithRestInTheMiddleSymbol = exportedSymbols.find(s => s.name === "TupleTypeWithRestInTheMiddle")!;
    const exportedTupleTypeAliasWithRestAtTheEnd = createTypeAliasBySymbol(ctx, tupleTypeAliasWithRestAtTheEndSymbol);
    const exportedTupleTypeAliasWithRestAtTheBeginning = createTypeAliasBySymbol(ctx, tupleTypeAliasWithRestAtTheBeginningSymbol);
    const exportedTupleTypeAliasWithRestInTheMiddle = createTypeAliasBySymbol(ctx, tupleTypeAliasWithRestInTheMiddleSymbol);

    it("should support rest elements at the end", () => {
      expect((exportedTupleTypeAliasWithRestAtTheEnd.type as TupleType).members).to.have.lengthOf(2);
      expect((exportedTupleTypeAliasWithRestAtTheEnd.type as TupleType).members[0]!.rest).to.equal(false);
      expect((exportedTupleTypeAliasWithRestAtTheEnd.type as TupleType).members[1]!.rest).to.equal(true);
    });

    it("should support rest elements at the beginning", () => {
      expect((exportedTupleTypeAliasWithRestAtTheBeginning.type as TupleType).members).to.have.lengthOf(2);
      expect((exportedTupleTypeAliasWithRestAtTheBeginning.type as TupleType).members[0]!.rest).to.equal(true);
      expect((exportedTupleTypeAliasWithRestAtTheBeginning.type as TupleType).members[1]!.rest).to.equal(false);
    });

    it("should support rest elements at the beginning", () => {
      expect((exportedTupleTypeAliasWithRestInTheMiddle.type as TupleType).members).to.have.lengthOf(3);
      expect((exportedTupleTypeAliasWithRestInTheMiddle.type as TupleType).members[0]!.rest).to.equal(false);
      expect((exportedTupleTypeAliasWithRestInTheMiddle.type as TupleType).members[1]!.rest).to.equal(true);
      expect((exportedTupleTypeAliasWithRestInTheMiddle.type as TupleType).members[2]!.rest).to.equal(false);
    });

  }

  {

    const testFileContent = ts`
      export type TupleTypeWithOptional = [string, number?];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TupleTypeWithOptional")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should support optional elements", () => {
      expect((exportedTypeAlias.type as TupleType).members).to.have.lengthOf(2);
      expect((exportedTypeAlias.type as TupleType).members[0]!.optional).to.equal(false);
      expect((exportedTypeAlias.type as TupleType).members[1]!.optional).to.equal(true);
    });

  }

  {

    const testFileContent = ts`
      export type NamedTupleType = [prefix: string, suffix: string];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "NamedTupleType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should support optional elements", () => {
      expect((exportedTypeAlias.type as TupleType).members).to.have.lengthOf(2);
      expect((exportedTypeAlias.type as TupleType).members[0]!.name).to.equal("prefix");
      expect((exportedTypeAlias.type as TupleType).members[1]!.name).to.equal("suffix");
    });

  }

});
