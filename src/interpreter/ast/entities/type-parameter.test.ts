import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.TypeParameter, () => {

  {

    const testFileContent = ts`
      export type GenericTypeAlias<T> = T;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "GenericTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse type parameters", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias.typeParameters).toBeDefined();
      expect(exportedTypeAlias.typeParameters).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      export type Generic<T extends string> = T;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Generic")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching constraint", () => {
      expect(exportedTypeAlias.typeParameters![0]!.constraint).toBeDefined();
      expect(exportedTypeAlias.typeParameters![0]!.constraint!.kind).toBe(TypeKind.String);
    });

  }

  {

    const testFileContent = ts`
      export type Generic<T extends string = "hello"> = T;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Generic")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching initializer", () => {
      expect(exportedTypeAlias.typeParameters![0]!.initializer!.kind).toBe(TypeKind.StringLiteral);
    });

  }

  {

    const testFileContent = ts`
      /**
       * @template T Generic type parameter description
       */
      export type Generic<T extends string> = T;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Generic")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a type parameter description", () => {
      expect(exportedTypeAlias.typeParameters![0]!.description).toBeDefined();
      expect(exportedTypeAlias.typeParameters![0]!.description).toBe("Generic type parameter description");
    });

  }

});
