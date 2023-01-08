/* eslint-disable @typescript-eslint/array-type */

import { describe, expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { ArrayType } from "quickdoks:compiler:type-definitions/types.d.js";


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

    {

      const testFileContent = ts`
        /**
         * Array type description
         * @example Array type example
         */
        export type ArrayType = string[];
      `;

      const { exportedSymbols, ctx } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "ArrayType")!;
      const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

      it("should have a matching kind", () => {
        expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Array);
      });

      it("should have a matching name", () => {
        expect(exportedTypeAlias.name).to.equal("ArrayType");
      });

      it("should have a matching id", () => {
        expect(exportedTypeAlias.id).to.equal(getIdBySymbol(ctx, symbol));
      });

      it("should have a matching description", () => {
        expect(exportedTypeAlias.description).to.equal("Array type description");
      });

      it("should have a matching example", () => {
        expect(exportedTypeAlias.example).to.equal("Array type example");
      });

      it("should have a matching position", () => {
        expect(exportedTypeAlias.position).to.deep.equal({
          column: 8,
          file: "/file.ts",
          line: 5
        });
      });

      it("should generate a type alias > array with a string type as a type argument", () => {
        expect(exportedTypeAlias.name).to.equal("ArrayType");
        expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Array);
        expect((exportedTypeAlias.type as ArrayType).type.kind).to.equal(TypeKind.String);
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

      it("should be able to parse an array type", () => {
        expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Array);
      });

    }

    {

      const testFileContent = ts`
        /**
         * Array type description
         * @example Array type example
         */
        export type ArrayType = Array<string>;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "ArrayType")!;
      const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

      it("should have a matching kind", () => {
        expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Array);
      });

      it("should have a matching name", () => {
        expect(exportedTypeAlias.name).to.equal("ArrayType");
      });

      it("should have a matching id", () => {
        expect(exportedTypeAlias.id).to.equal(getIdBySymbol(ctx, symbol));
      });

      it("should have a matching description", () => {
        expect(exportedTypeAlias.description).to.equal("Array type description");
      });

      it("should have a matching example", () => {
        expect(exportedTypeAlias.example).to.equal("Array type example");
      });

      it("should have a matching position", () => {
        expect(exportedTypeAlias.position).to.deep.equal({
          column: 8,
          file: "/file.ts",
          line: 5
        });
      });

      it("should generate a type alias > array with a string type as a type argument", () => {
        expect(exportedTypeAlias.name).to.equal("ArrayType");
        expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Array);
        expect((exportedTypeAlias.type as ArrayType).type.kind).to.equal(TypeKind.String);
      });

    }

  });

});
