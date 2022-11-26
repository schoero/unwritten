import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Kind, TypeReference } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", Kind.TypeReference, () => {

  {

    const testFileContent = ts`
      export type A = string;
      export type Reference = A;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "Reference")!;
    const exportedReferenceTypeAlias = createTypeAliasBySymbol(ctx, exportedTypeAliasSymbol);

    it("should be able to parse a type reference", () => {
      expect(exportedReferenceTypeAlias.kind).toBe(Kind.TypeAlias);
      expect(exportedReferenceTypeAlias.type.kind).toBe(Kind.TypeReference);
    });

    it("should have a matching name", () => {
      expect((exportedReferenceTypeAlias.type as TypeReference).name).to.equal("A");
    });

    it("should have a matching type", () => {
      expect((exportedReferenceTypeAlias.type as TypeReference).type).to.not.equal(undefined);
      expect((exportedReferenceTypeAlias.type as TypeReference).type!.kind).to.equal(Kind.String);
    });

  }

  {

    const testFileContent = ts`
      type ConditionalTypeAlias<T extends "string" | "number"> = T extends "string" ? string : number;
      export type TruthyConditionalTypeReference = ConditionalTypeAlias<"string">;
      export type FalsyConditionalTypeReference = ConditionalTypeAlias<"number">;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const truthyConditionalTypeReferenceSymbol = exportedSymbols.find(s => s.name === "TruthyConditionalTypeReference")!;
    const truthyConditionalTypeReference = createTypeAliasBySymbol(ctx, truthyConditionalTypeReferenceSymbol);
    const falsyConditionalTypeReferenceSymbol = exportedSymbols.find(s => s.name === "FalsyConditionalTypeReference")!;
    const falsyConditionalTypeReference = createTypeAliasBySymbol(ctx, falsyConditionalTypeReferenceSymbol);

    it("should be able to parse conditional type references", () => {
      expect(truthyConditionalTypeReference.type.kind).to.equal(Kind.TypeReference);
      expect((truthyConditionalTypeReference.type as TypeReference).type).to.not.equal(undefined);
      expect((truthyConditionalTypeReference.type as TypeReference).type?.kind).to.equal(Kind.String);
      expect(falsyConditionalTypeReference.type.kind).to.equal(Kind.TypeReference);
      expect((falsyConditionalTypeReference.type as TypeReference).type).to.not.equal(undefined);
      expect((falsyConditionalTypeReference.type as TypeReference).type?.kind).to.equal(Kind.Number);
    });

  }

});
