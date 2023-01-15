import { expect, it } from "vitest";

import { createFunctionEntity, createTypeAliasEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { FunctionType } from "quickdoks:compiler:type-definitions/types.d.js";


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
      expect(exportedTypeAlias.type.kind).to.equal(EntityKind.Function);
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
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.FunctionType);
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
      expect(exportedTypeAlias1.type.kind).to.equal(TypeKind.FunctionType);
      expect(exportedTypeAlias2.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias2.type.kind).to.equal(TypeKind.FunctionType);
    });

    it("should not parse object types with anything else as functions", () => {
      expect(exportedTypeAlias3.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias3.type.kind).to.not.equal(TypeKind.FunctionType);
    });

    it("should have matching signatures", () => {
      expect((exportedTypeAlias1.type as FunctionType).signatures).to.have.lengthOf(1);
      expect((exportedTypeAlias2.type as FunctionType).signatures).to.have.lengthOf(2);
    });

    it("should have a matching return type", () => {
      expect((exportedTypeAlias1.type as FunctionType).signatures[0]!.returnType.kind).to.equal(TypeKind.Boolean);
    });

  }

  {

    const testFileContent = ts`
      export async function functionSymbol(): boolean {
        return true;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should be able to parse an async function", () => {
      expect(exportedFunction.kind).to.equal(EntityKind.Function);
    });

  }

});
