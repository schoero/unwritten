/* eslint-disable @typescript-eslint/array-type */


import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:/utils/compile.js";
import { scope } from "quickdoks:tests:/utils/scope.js";
import { ts } from "quickdoks:tests:/utils/template.js";
import { Kind, TupleType } from "quickdoks:types:types.js";

import { createTypeAliasBySymbol } from "./type-alias.js";


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
      export type TupleTypeWithRest = [string, ...number[]];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TupleTypeWithRest")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should support rest elements", () => {
      expect((exportedTypeAlias.type as TupleType).members).to.have.lengthOf(2);
      expect((exportedTypeAlias.type as TupleType).members[0]!.rest).to.equal(false);
      expect((exportedTypeAlias.type as TupleType).members[1]!.rest).to.equal(true);
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
