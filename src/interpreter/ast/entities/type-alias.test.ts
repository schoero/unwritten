import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { getIdBySymbol } from "unwritten:interpreter/ast/shared/id.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", EntityKind.TypeAlias, () => {

  {

    const testFileContent = ts`
      export type TypeAlias = string;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse a type alias", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Type alias description 
       * @example Type alias example
       */
      export type TypeAlias = string;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
    });

    it("should have a matching name", () => {
      expect(exportedTypeAlias.name).to.equal("TypeAlias");
    });

    it("should have a matching id", () => {
      expect(exportedTypeAlias.id).to.equal(getIdBySymbol(ctx, symbol));
    });

    it("should have a matching description", () => {
      expect(exportedTypeAlias.description).to.equal("Type alias description");
    });

    it("should have a matching example", () => {
      expect(exportedTypeAlias.example).to.equal("Type alias example");
    });

    it("should have a matching position", () => {
      expect(exportedTypeAlias.position).to.deep.equal({
        column: 0,
        file: "/file.ts",
        line: 5
      });
    });

  }

  {

    const testFileContent = ts`
      export type GenericTypeAlias<T> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "GenericTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse generic types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.typeParameters).toHaveLength(1);
      expect(exportedTypeAlias.type.type).to.not.equal(undefined);
      expect(exportedTypeAlias.type.type!.kind).to.equal(TypeKind.TypeParameter);
    });

  }

  {

    const testFileContent = ts`
      export type Generic<T extends string> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Generic")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a type parameter", () => {
      expect(exportedTypeAlias.typeParameters).to.not.equal(undefined);
      expect(exportedTypeAlias.typeParameters).to.have.lengthOf(1);
    });

  }

});
