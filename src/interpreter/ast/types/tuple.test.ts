import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


scope("Interpreter", TypeKind.Tuple, () => {

  {

    const testFileContent = ts`
      export type TupleType = [string, number];
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TupleType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse a tuple type", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.Tuple);
    });

    it("should have the correct amount of members", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Tuple);
      expect(exportedTypeAlias.type.members).toHaveLength(2);
    });


  }

  {

    const testFileContent = ts`
      export type TupleTypeWithRestAtTheEnd = [string, ...number[]];
      export type TupleTypeWithRestAtTheBeginning = [ ...number[], string];
      export type TupleTypeWithRestInTheMiddle = [ string, ...number[], string];
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const tupleTypeAliasWithRestAtTheEndSymbol = exportedSymbols.find(s => s.name === "TupleTypeWithRestAtTheEnd")!;
    const tupleTypeAliasWithRestAtTheBeginningSymbol = exportedSymbols.find(s => s.name === "TupleTypeWithRestAtTheBeginning")!;
    const tupleTypeAliasWithRestInTheMiddleSymbol = exportedSymbols.find(s => s.name === "TupleTypeWithRestInTheMiddle")!;
    const exportedTupleTypeAliasWithRestAtTheEnd = createTypeAliasEntity(ctx, tupleTypeAliasWithRestAtTheEndSymbol);
    const exportedTupleTypeAliasWithRestAtTheBeginning = createTypeAliasEntity(ctx, tupleTypeAliasWithRestAtTheBeginningSymbol);
    const exportedTupleTypeAliasWithRestInTheMiddle = createTypeAliasEntity(ctx, tupleTypeAliasWithRestInTheMiddleSymbol);

    it("should support rest elements at the end", () => {
      assert(exportedTupleTypeAliasWithRestAtTheEnd.type.kind === TypeKind.Tuple);
      expect(exportedTupleTypeAliasWithRestAtTheEnd.type.members).toHaveLength(2);
      expect(exportedTupleTypeAliasWithRestAtTheEnd.type.members[0].rest).toBe(false);
      expect(exportedTupleTypeAliasWithRestAtTheEnd.type.members[1].rest).toBe(true);
    });

    it("should support rest elements at the beginning", () => {
      assert(exportedTupleTypeAliasWithRestAtTheBeginning.type.kind === TypeKind.Tuple);
      expect(exportedTupleTypeAliasWithRestAtTheBeginning.type.members).toHaveLength(2);
      expect(exportedTupleTypeAliasWithRestAtTheBeginning.type.members[0].rest).toBe(true);
      expect(exportedTupleTypeAliasWithRestAtTheBeginning.type.members[1].rest).toBe(false);
    });

    it("should support rest elements at the beginning", () => {
      assert(exportedTupleTypeAliasWithRestInTheMiddle.type.kind === TypeKind.Tuple);
      expect(exportedTupleTypeAliasWithRestInTheMiddle.type.members).toHaveLength(3);
      expect(exportedTupleTypeAliasWithRestInTheMiddle.type.members[0].rest).toBe(false);
      expect(exportedTupleTypeAliasWithRestInTheMiddle.type.members[1].rest).toBe(true);
      expect(exportedTupleTypeAliasWithRestInTheMiddle.type.members[2].rest).toBe(false);
    });

  }

  {

    const testFileContent = ts`
      export type TupleTypeWithOptional = [string, number?];
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TupleTypeWithOptional")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should support optional elements", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Tuple);
      expect(exportedTypeAlias.type.members).toHaveLength(2);
      expect(exportedTypeAlias.type.members[0].optional).toBe(false);
      expect(exportedTypeAlias.type.members[1].optional).toBe(true);
    });

  }

  {

    const testFileContent = ts`
      export type NamedTupleType = [prefix: string, suffix: string];
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "NamedTupleType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should support optional elements", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Tuple);
      expect(exportedTypeAlias.type.members).toHaveLength(2);
      expect(exportedTypeAlias.type.members[0].name).toBe("prefix");
      expect(exportedTypeAlias.type.members[1].name).toBe("suffix");
    });

  }

  {

    const testFileContent = ts`
      type Generic<T> = T;
      export type TupleType = [Generic<"test">];
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TupleType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should resolve types correctly", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Tuple);
      expect(exportedTypeAlias.type.members).toHaveLength(1);
      assert(exportedTypeAlias.type.members[0].type.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.type.members[0].type.type?.kind).toBe(TypeKind.StringLiteral);
    });

  }

});
