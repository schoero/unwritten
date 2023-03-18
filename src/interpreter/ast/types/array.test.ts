/* eslint-disable @typescript-eslint/array-type */

import { assert, describe, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Interpreter", TypeKind.Array, () => {

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
        assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
        expect(exportedTypeAlias.type.typeArguments).to.have.lengthOf(1);
        expect(exportedTypeAlias.type.typeArguments![0].kind).to.equal(TypeKind.String);
      });

    }

  });

});
