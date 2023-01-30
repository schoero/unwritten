import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:compiler:entities";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", TypeKind.TypeReference, () => {

  {

    const testFileContent = ts`
      export type A = string;
      export type Reference = A;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "Reference")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should be able to parse a type reference", () => {
      expect(exportedReferenceTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedReferenceTypeAlias.type.kind).toBe(TypeKind.TypeReference);
    });

    it("should have a matching name", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedReferenceTypeAlias.type.name).to.equal("A");
    });

    it("should have a matching type", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedReferenceTypeAlias.type.type).to.not.equal(undefined);
      expect(exportedReferenceTypeAlias.type.type!.kind).to.equal(TypeKind.String);
    });

  }

  {

    const testFileContent = ts`
      type ConditionalTypeAlias<T extends "string" | "number"> = T extends "string" ? string : number;
      export type TruthyConditionalTypeReference = ConditionalTypeAlias<"string">;
      export type FalsyConditionalTypeReference = ConditionalTypeAlias<"number">;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const truthyConditionalTypeReferenceSymbol = exportedSymbols.find(s => s.name === "TruthyConditionalTypeReference")!;
    const truthyConditionalTypeReference = createTypeAliasEntity(ctx, truthyConditionalTypeReferenceSymbol);
    const falsyConditionalTypeReferenceSymbol = exportedSymbols.find(s => s.name === "FalsyConditionalTypeReference")!;
    const falsyConditionalTypeReference = createTypeAliasEntity(ctx, falsyConditionalTypeReferenceSymbol);

    it("should be able to parse conditional type references", () => {
      assert(truthyConditionalTypeReference.type.kind === TypeKind.TypeReference);
      expect(truthyConditionalTypeReference.type.kind).to.equal(TypeKind.TypeReference);
      expect(truthyConditionalTypeReference.type.type).to.not.equal(undefined);
      expect(truthyConditionalTypeReference.type.type?.kind).to.equal(TypeKind.String);

      assert(falsyConditionalTypeReference.type.kind === TypeKind.TypeReference);
      expect(falsyConditionalTypeReference.type.kind).to.equal(TypeKind.TypeReference);
      expect(falsyConditionalTypeReference.type.type).to.not.equal(undefined);
      expect(falsyConditionalTypeReference.type.type?.kind).to.equal(TypeKind.Number);
    });

  }

});
