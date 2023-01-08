import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { TypeReferenceEntity } from "quickdoks:compiler:type-definitions/entities.d.js";


scope("Compiler", EntityKind.TypeReference, () => {

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
      expect(exportedReferenceTypeAlias.type.kind).toBe(EntityKind.TypeReference);
    });

    it("should have a matching name", () => {
      expect((exportedReferenceTypeAlias.type as TypeReferenceEntity).name).to.equal("A");
    });

    it("should have a matching type", () => {
      expect((exportedReferenceTypeAlias.type as TypeReferenceEntity).type).to.not.equal(undefined);
      expect((exportedReferenceTypeAlias.type as TypeReferenceEntity).type.kind).to.equal(TypeKind.String);
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
      expect(truthyConditionalTypeReference.type.kind).to.equal(EntityKind.TypeReference);
      expect((truthyConditionalTypeReference.type as TypeReferenceEntity).type).to.not.equal(undefined);
      expect((truthyConditionalTypeReference.type as TypeReferenceEntity).type?.kind).to.equal(TypeKind.String);
      expect(falsyConditionalTypeReference.type.kind).to.equal(EntityKind.TypeReference);
      expect((falsyConditionalTypeReference.type as TypeReferenceEntity).type).to.not.equal(undefined);
      expect((falsyConditionalTypeReference.type as TypeReferenceEntity).type?.kind).to.equal(TypeKind.Number);
    });

  }

});
