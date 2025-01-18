import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";
import { assert, expect, it } from "vitest";


scope("Interpreter", TypeKind.Union, () => {

  {

    const testFileContent = ts`
      export type UnionType = string | number;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "UnionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse an union type", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.Union);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Union type description
       * @example Union type example
       */
      export type UnionType = string | number;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "UnionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.Union);
    });

    it("should have the correct amount of types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Union);
      expect(exportedTypeAlias.type.types).toHaveLength(2);
    });

    it("should have the correct types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Union);
      expect(exportedTypeAlias.type.types[0].kind).toBe(TypeKind.String);
      expect(exportedTypeAlias.type.types[1].kind).toBe(TypeKind.Number);
    });

  }

});
