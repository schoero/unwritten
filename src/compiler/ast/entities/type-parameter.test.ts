import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";


scope("Compiler", EntityKind.TypeParameter, () => {

  {

    const testFileContent = ts`
      export type GenericTypeAlias<T> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "GenericTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse type parameters", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias.typeParameters).to.not.equal(undefined);
      expect(exportedTypeAlias.typeParameters).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      export type Generic<T extends string> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Generic")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching constraint", () => {
      expect(exportedTypeAlias.typeParameters![0]!.constraint).to.not.equal(undefined);
      expect(exportedTypeAlias.typeParameters![0]!.constraint.kind).to.equal(TypeKind.String);
    });

  }

  {

    const testFileContent = ts`
      export type Generic<T extends string = "hello"> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Generic")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching initializer", () => {
      expect(exportedTypeAlias.typeParameters![0]!.initializer.kind).to.equal(TypeKind.StringLiteral);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Generic type description
       * @template T - Generic type parameter description
       * @example Generic type example
       */
      export type Generic<T extends string> = T;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Generic")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a description", () => {
      expect(exportedTypeAlias.description).to.equal("Generic type description");
    });

    it("should have a example", () => {
      expect(exportedTypeAlias.example).to.equal("Generic type example");
    });

    it("should have a type parameter description", () => {
      expect(exportedTypeAlias.typeParameters![0]!.description).to.not.equal(undefined);
      expect(exportedTypeAlias.typeParameters![0]!.description).to.equal("- Generic type parameter description");
    });

  }

});