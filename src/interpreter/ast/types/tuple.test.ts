import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.Tuple, () => {

  {

    const testFileContent = ts`
      export type TupleType = [string, number];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TupleType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse a tuple type", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Tuple);
    });

  }

  {

    const testFileContent = ts`
      export type TupleType = [string, number];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TupleType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have the correct amount of members", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Tuple);
      expect(exportedTypeAlias.type.members).to.have.lengthOf(2);
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
    const exportedTupleTypeAliasWithRestAtTheEnd = createTypeAliasEntity(ctx, tupleTypeAliasWithRestAtTheEndSymbol);
    const exportedTupleTypeAliasWithRestAtTheBeginning = createTypeAliasEntity(ctx, tupleTypeAliasWithRestAtTheBeginningSymbol);
    const exportedTupleTypeAliasWithRestInTheMiddle = createTypeAliasEntity(ctx, tupleTypeAliasWithRestInTheMiddleSymbol);

    it("should support rest elements at the end", () => {
      assert(exportedTupleTypeAliasWithRestAtTheEnd.type.kind === TypeKind.Tuple);
      expect(exportedTupleTypeAliasWithRestAtTheEnd.type.members).to.have.lengthOf(2);
      expect(exportedTupleTypeAliasWithRestAtTheEnd.type.members[0]!.rest).to.equal(false);
      expect(exportedTupleTypeAliasWithRestAtTheEnd.type.members[1]!.rest).to.equal(true);
    });

    it("should support rest elements at the beginning", () => {
      assert(exportedTupleTypeAliasWithRestAtTheBeginning.type.kind === TypeKind.Tuple);
      expect(exportedTupleTypeAliasWithRestAtTheBeginning.type.members).to.have.lengthOf(2);
      expect(exportedTupleTypeAliasWithRestAtTheBeginning.type.members[0]!.rest).to.equal(true);
      expect(exportedTupleTypeAliasWithRestAtTheBeginning.type.members[1]!.rest).to.equal(false);
    });

    it("should support rest elements at the beginning", () => {
      assert(exportedTupleTypeAliasWithRestInTheMiddle.type.kind === TypeKind.Tuple);
      expect(exportedTupleTypeAliasWithRestInTheMiddle.type.members).to.have.lengthOf(3);
      expect(exportedTupleTypeAliasWithRestInTheMiddle.type.members[0]!.rest).to.equal(false);
      expect(exportedTupleTypeAliasWithRestInTheMiddle.type.members[1]!.rest).to.equal(true);
      expect(exportedTupleTypeAliasWithRestInTheMiddle.type.members[2]!.rest).to.equal(false);
    });

  }

  {

    const testFileContent = ts`
      export type TupleTypeWithOptional = [string, number?];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TupleTypeWithOptional")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should support optional elements", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Tuple);
      expect(exportedTypeAlias.type.members).to.have.lengthOf(2);
      expect(exportedTypeAlias.type.members[0]!.optional).to.equal(false);
      expect(exportedTypeAlias.type.members[1]!.optional).to.equal(true);
    });

  }

  {

    const testFileContent = ts`
      export type NamedTupleType = [prefix: string, suffix: string];
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "NamedTupleType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should support optional elements", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Tuple);
      expect(exportedTypeAlias.type.members).to.have.lengthOf(2);
      expect(exportedTypeAlias.type.members[0]!.name).to.equal("prefix");
      expect(exportedTypeAlias.type.members[1]!.name).to.equal("suffix");
    });

  }

});
