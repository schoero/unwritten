import { assert, expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.Intersection, () => {

  {

    const testFileContent = ts`
      export type IntersectionType = { a: string } & { b: number };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "IntersectionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse an intersection type", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.Intersection);
    });

  }

  {

    const testFileContent = ts`
      export type IntersectionType = { a: string } & { b: number };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "IntersectionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.Intersection);
    });

    it("should have the right amount of types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Intersection);
      expect(exportedTypeAlias.type.types).toHaveLength(2);
    });

  }

});
