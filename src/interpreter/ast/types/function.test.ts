import { assert, expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";

import type { FunctionType } from "unwritten:interpreter:type-definitions/types";


scope("Interpreter", EntityKind.Function, () => {

  {

    const testFileContent = ts`
      export type FunctionType = () => boolean;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "FunctionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse a function type", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.Function);
    });

  }

  {

    const testFileContent = ts`
      export type FunctionType = () => boolean;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "FunctionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.Function);
    });

    it("should have one signature", () => {
      expect((exportedTypeAlias.type as FunctionType).signatures).toHaveLength(1);
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

    const { ctx, exportedSymbols } = compile(testFileContent);

    const objectType1Symbol = exportedSymbols.find(s => s.name === "ObjectType1")!;
    const exportedTypeAlias1 = createTypeAliasEntity(ctx, objectType1Symbol);
    const objectType2Symbol = exportedSymbols.find(s => s.name === "ObjectType2")!;
    const exportedTypeAlias2 = createTypeAliasEntity(ctx, objectType2Symbol);
    const objectType3Symbol = exportedSymbols.find(s => s.name === "ObjectType3")!;
    const exportedTypeAlias3 = createTypeAliasEntity(ctx, objectType3Symbol);

    it("should parse object types with only call signatures as functions", () => {
      expect(exportedTypeAlias1.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias1.type.kind).toBe(TypeKind.Function);
      expect(exportedTypeAlias2.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias2.type.kind).toBe(TypeKind.Function);
    });

    it("should not parse object types with anything else as functions", () => {
      expect(exportedTypeAlias3.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias3.type.kind).not.toBe(TypeKind.Function);
    });

    it("should have matching signatures", () => {
      assert(exportedTypeAlias1.type.kind === TypeKind.Function);
      expect(exportedTypeAlias1.type.signatures).toHaveLength(1);

      assert(exportedTypeAlias2.type.kind === TypeKind.Function);
      expect(exportedTypeAlias2.type.signatures).toHaveLength(2);
    });

    it("should have a matching return type", () => {
      assert(exportedTypeAlias1.type.kind === TypeKind.Function);
      expect(exportedTypeAlias1.type.signatures[0].returnType.kind).toBe(TypeKind.Boolean);
    });

  }

});
