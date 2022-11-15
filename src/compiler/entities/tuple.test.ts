/* eslint-disable @typescript-eslint/array-type */

import { describe, expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { ts } from "../../../tests/utils/template.js";
import { Tuple, TypeKind } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./alias.js";


describe("Tuple", () => {

  const testFileContent = ts`
    export type Tuple = [string, number];
    export type TupleWithRest = [string, ...number[]];
    export type TupleWithOptional = [string, number?];
    export type NamedTuple = [prefix: string, suffix: string];
    /** 
     * Description 
     * @example [prefix: "<div>", suffix: "</div>"]
     */
    export type TupleWithDescriptionAndExample = [string, number];
  `;

  const { exportedSymbols, ctx } = compile(testFileContent.trim());

  const exportedTupleAlias = createTypeAliasBySymbol(ctx, exportedSymbols[0]!);
  const exportedTupleWithRestAlias = createTypeAliasBySymbol(ctx, exportedSymbols[1]!);
  const exportedTupleWithOptionalAlias = createTypeAliasBySymbol(ctx, exportedSymbols[2]!);
  const exportedNamedTupleAlias = createTypeAliasBySymbol(ctx, exportedSymbols[3]!);
  const exportedTupleWithDescriptionAndExampleAlias = createTypeAliasBySymbol(ctx, exportedSymbols[4]!);

  const exportedTuple = exportedTupleAlias.type as Tuple;
  const exportedTupleWithRest = exportedTupleWithRestAlias.type as Tuple;
  const exportedTupleWithOptional = exportedTupleWithOptionalAlias.type as Tuple;
  const exportedNamedTuple = exportedNamedTupleAlias.type as Tuple;
  const exportedTupleWithDescriptionAndExample = exportedTupleWithDescriptionAndExampleAlias.type as Tuple;

  it("should have exported tuple types alias", () => {
    expect(exportedTupleAlias.name).to.equal("Tuple");
    expect(exportedTupleWithRestAlias.name).to.equal("TupleWithRest");
    expect(exportedTupleWithOptionalAlias.name).to.equal("TupleWithOptional");
    expect(exportedNamedTupleAlias.name).to.equal("NamedTuple");
    expect(exportedTupleWithDescriptionAndExampleAlias.name).to.equal("TupleWithDescriptionAndExample");
  });

  it("should have matching positions", () => {
    expect(exportedTuple.position).to.deep.equal({
      column: 20,
      file: "/file.ts",
      line: 1
    });
    expect(exportedTupleWithRest.position).to.deep.equal({
      column: 32,
      file: "/file.ts",
      line: 2
    });
    expect(exportedTupleWithOptional.position).to.deep.equal({
      column: 36,
      file: "/file.ts",
      line: 3
    });
    expect(exportedNamedTuple.position).to.deep.equal({
      column: 29,
      file: "/file.ts",
      line: 4
    });
    expect(exportedTupleWithDescriptionAndExample.position).to.deep.equal({
      column: 49,
      file: "/file.ts",
      line: 9
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
    expect(exportedTupleWithDescriptionAndExampleAlias.description).to.equal("Description");
  });

  it("should have a matching example", () => {
    expect(exportedTupleWithDescriptionAndExampleAlias.example).to.equal(`[prefix: "<div>", suffix: "</div>"]`);
  });

});
