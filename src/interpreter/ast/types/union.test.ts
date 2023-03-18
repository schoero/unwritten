import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Interpreter", TypeKind.Union, () => {

  {

    const testFileContent = ts`
      export type UnionType = string | number;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "UnionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse an union type", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Union);
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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "UnionType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Union);
    });

    it("should have the correct amount of types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Union);
      expect(exportedTypeAlias.type.types).to.have.lengthOf(2);
    });

    it("should have the correct types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Union);
      expect(exportedTypeAlias.type.types[0]!.kind).to.equal(TypeKind.String);
      expect(exportedTypeAlias.type.types[1]!.kind).to.equal(TypeKind.Number);
    });

  }

});
