import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:compiler:entities";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";

import type { FunctionType } from "unwritten:compiler:type-definitions/types.d.js";


scope("Compiler", EntityKind.Function, () => {

  {

    const testFileContent = ts`
      export type FunctionType = () => boolean;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "FunctionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse a function type", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Function);
    });

  }

  {

    const testFileContent = ts`
      export type FunctionType = () => boolean;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "FunctionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Function);
    });

    it("should have one signature", () => {
      expect((exportedTypeAlias.type as FunctionType).signatures).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      export type ObjectType1 = {
        (): boolean;
      };
      export type ObjectType2 = {
        (): boolean;
        (param: string): boolean;
      };
      export type ObjectType3 = {
        new (): boolean;
        (param: string): boolean;
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const objectType1Symbol = exportedSymbols.find(s => s.name === "ObjectType1")!;
    const exportedTypeAlias1 = createTypeAliasEntity(ctx, objectType1Symbol);
    const objectType2Symbol = exportedSymbols.find(s => s.name === "ObjectType2")!;
    const exportedTypeAlias2 = createTypeAliasEntity(ctx, objectType2Symbol);
    const objectType3Symbol = exportedSymbols.find(s => s.name === "ObjectType3")!;
    const exportedTypeAlias3 = createTypeAliasEntity(ctx, objectType3Symbol);

    it("should parse object types with only call signatures as functions", () => {
      expect(exportedTypeAlias1.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias1.type.kind).to.equal(TypeKind.Function);
      expect(exportedTypeAlias2.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias2.type.kind).to.equal(TypeKind.Function);
    });

    it("should not parse object types with anything else as functions", () => {
      expect(exportedTypeAlias3.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias3.type.kind).to.not.equal(TypeKind.Function);
    });

    it("should have matching signatures", () => {
      assert(exportedTypeAlias1.type.kind === TypeKind.Function);
      expect(exportedTypeAlias1.type.signatures).to.have.lengthOf(1);

      assert(exportedTypeAlias2.type.kind === TypeKind.Function);
      expect(exportedTypeAlias2.type.signatures).to.have.lengthOf(2);
    });

    it("should have a matching return type", () => {
      assert(exportedTypeAlias1.type.kind === TypeKind.Function);
      expect(exportedTypeAlias1.type.signatures[0]!.returnType.kind).to.equal(TypeKind.Boolean);
    });

  }

});
