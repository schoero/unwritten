/* eslint-disable @typescript-eslint/array-type */

import { describe, expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { TypeReferenceType } from "quickdoks:compiler:type-definitions/types.d.js";


scope("Compiler", TypeKind.Array, () => {

  describe("Native Syntax", () => {

    {

      const testFileContent = ts`
        export type ArrayType = string[];
      `;

      const { exportedSymbols, ctx } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "ArrayType")!;
      const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

      it("should be able to parse an array type", () => {
        expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Array);
      });

    }

  });


  describe("Generic Syntax", () => {

    {

      const testFileContent = ts`
        export type ArrayType = Array<string>;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "ArrayType")!;
      const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

      it("should create a type reference for the generic syntax", () => {
        expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(TypeKind.TypeReference);
        expect((exportedTypeAlias.type as TypeReferenceType).typeArguments).to.have.lengthOf(1);
        expect((exportedTypeAlias.type as TypeReferenceType).typeArguments![0].kind).to.equal(TypeKind.String);
      });

    }

  });

});