/* eslint-disable @typescript-eslint/array-type */

import { describe, expect, it } from "vitest";

import { getIdBySymbol } from "../src/compiler/compositions/id.js";
import { createTypeAliasBySymbol } from "../src/compiler/entities/alias.js";
import { Tuple, TypeKind } from "../src/types/types.js";
import { compile } from "./utils/compile.js";


describe("Tuple", () => {

  const testFileContent = `
    export type Tuple = [string, number];
    export type TupleWithRest = [string, ...number[]];
    export type TupleWithOptional = [string, number?];
    /** 
     * Description 
     * @example [prefix: "<div>", suffix: "</div>"]
     */
    export type NamedTuple = [prefix: string, suffix: string];;
  `;

  const { exportedSymbols, ctx } = compile(testFileContent.trim());

  const exportedTupleAlias = createTypeAliasBySymbol(ctx, exportedSymbols[0]!);
  const exportedTupleWithRestAlias = createTypeAliasBySymbol(ctx, exportedSymbols[1]!);
  const exportedTupleWithOptionalAlias = createTypeAliasBySymbol(ctx, exportedSymbols[2]!);
  const exportedNamedTupleAlias = createTypeAliasBySymbol(ctx, exportedSymbols[3]!);

  const exportedTuple = exportedTupleAlias.type as Tuple;
  const exportedTupleWithRest = exportedTupleWithRestAlias.type as Tuple;
  const exportedTupleWithOptional = exportedTupleWithOptionalAlias.type as Tuple;
  const exportedNamedTuple = exportedNamedTupleAlias.type as Tuple;

  it("should have exported tuple types alias", () => {
    expect(exportedTupleAlias.name).to.equal("Tuple");
    expect(exportedTupleWithRestAlias.name).to.equal("TupleWithRest");
    expect(exportedTupleWithOptionalAlias.name).to.equal("TupleWithOptional");
    expect(exportedNamedTupleAlias.name).to.equal("NamedTuple");
  });

  it("should have matching ids", () => {
    expect(exportedTuple.id).to.equal(getIdBySymbol(ctx, exportedSymbols[0]!));
    expect(exportedTupleWithRest.id).to.equal(getIdBySymbol(ctx, exportedSymbols[1]!));
    expect(exportedTupleWithOptional.id).to.equal(getIdBySymbol(ctx, exportedSymbols[2]!));
    expect(exportedNamedTuple.id).to.equal(getIdBySymbol(ctx, exportedSymbols[3]!));
  });

  it("should have matching positions", () => {
    expect(exportedTuple.position).to.deep.equal({
      column: 0,
      file: "/file.ts",
      line: 1
    });
    expect(exportedTupleWithRest.position).to.deep.equal({
      column: 4,
      file: "/file.ts",
      line: 2
    });
    expect(exportedTupleWithOptional.position).to.deep.equal({
      column: 4,
      file: "/file.ts",
      line: 3
    });
    expect(exportedNamedTuple.position).to.deep.equal({
      column: 4,
      file: "/file.ts",
      line: 8
    });
  });

  it("should have exactly two members", () => {
    expect(exportedTuple.members.length).to.equal(2);
    expect(exportedTupleWithRest.members.length).to.equal(2);
    expect(exportedTupleWithOptional.members.length).to.equal(2);
    expect(exportedNamedTuple.members.length).to.equal(2);
  });

  it("should have a matching member types", () => {
    expect(exportedTuple.members[0]!.type.kind).to.equal(TypeKind.String);
    expect(exportedTuple.members[1]!.type.kind).to.equal(TypeKind.Number);
    expect(exportedTupleWithRest.members[0]!.type.kind).to.equal(TypeKind.String);
    expect(exportedTupleWithRest.members[1]!.type.kind).to.equal(TypeKind.Number);
    expect(exportedTupleWithOptional.members[0]!.type.kind).to.equal(TypeKind.String);
    expect(exportedTupleWithOptional.members[1]!.type.kind).to.equal(TypeKind.Number);
    expect(exportedNamedTuple.members[0]!.type.kind).to.equal(TypeKind.String);
    expect(exportedNamedTuple.members[1]!.type.kind).to.equal(TypeKind.String);
  });

  it("should have a matching rest element indicators", () => {
    expect(exportedTupleWithRest.members[0]!.rest).to.not.equal(true);
    expect(exportedTupleWithRest.members[1]?.rest).to.equal(true);
  });

  it("should have a matching optional element indicators", () => {
    expect(exportedTupleWithOptional.members[0]!.optional).to.not.equal(true);
    expect(exportedTupleWithOptional.members[1]?.optional).to.equal(true);
  });

  it("should have matching labels", () => {
    expect(exportedNamedTuple.members[0]!.name).to.equal("prefix");
    expect(exportedNamedTuple.members[1]!.name).to.equal("suffix");
  });

  it("should have a matching description", () => {
    expect(exportedNamedTupleAlias.description).to.equal("Description");
  });

  it("should have a matching example", () => {
    expect(exportedNamedTupleAlias.example).to.equal(`[prefix: "<div>", suffix: "</div>"]`);
  });

});
