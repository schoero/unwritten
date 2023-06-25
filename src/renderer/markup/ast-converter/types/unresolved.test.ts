import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertUnresolvedTypeInline } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { isAnchorNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import type { UnresolvedType } from "unwritten:interpreter/type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Unresolved, () => {

  {

    const testFileContent = ts`
      export type StringType = string;
      export type Type = StringType;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);

    const ctx = createRenderContext();
    const convertedUnresolvedType = convertUnresolvedTypeInline(ctx, typeAliasEntity.type as UnresolvedType);

    it("should have the correct name", () => {
      assert(Array.isArray(convertedUnresolvedType));
      assert(isAnchorNode(convertedUnresolvedType[0]));
      expect(convertedUnresolvedType[0].name).toBe("StringType");
    });

    it("should link to the actual type", () => {
      const stringTypeSymbol = exportedSymbols.find(s => s.name === "StringType")!;
      const stringTypeAliasEntity = createTypeAliasEntity(compilerContext, stringTypeSymbol);
      assert(Array.isArray(convertedUnresolvedType));
      assert(isAnchorNode(convertedUnresolvedType[0]));
      expect(convertedUnresolvedType[0].id).toBe(stringTypeAliasEntity.symbolId);
    });

    it("should not have type arguments", () => {
      expect(convertedUnresolvedType).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      export type Type = Array<string>;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);

    const ctx = createRenderContext();
    const convertedUnresolvedType = convertUnresolvedTypeInline(ctx, typeAliasEntity.type as UnresolvedType);

    it("should have the correct name", () => {
      assert(Array.isArray(convertedUnresolvedType));
      assert(isAnchorNode(convertedUnresolvedType[0]));
      expect(convertedUnresolvedType[0].name).toBe("Array");
    });

    it("should have one type argument", () => {
      assert(Array.isArray(convertedUnresolvedType));
      expect(convertedUnresolvedType).toHaveLength(2 + 1);
    });

  }

});
